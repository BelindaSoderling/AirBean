import { createNav } from '../components/nav.js';
import { addItemToCart, getNumberOfItems, getCart, removeItemFromCart } from '../components/cart.js';
import { getLoginStatus, createLoginField, getUser } from '../components/login.js';
import { goToPage } from '../components/redirect.js';


const menu = document.querySelector('.menu-items');
const bagButton = document.querySelector('.bag-btn');
const bagNumber = document.querySelector('.bag-number');
const orderWindow = document.querySelector('.bag-items');
const order = document.querySelector('.order');
const placeOrderButton = document.querySelector('.put-order-btn');

const getItems = async () => {
  const response = await fetch('../api/coffee');
  const data = await response.json();
  return data;
}

const createEntry = (name, description, price) => {
  const menuItem = document.createElement('div');
  menuItem.classList.add('menu-item');
  menuItem.id = name;

  const button = document.createElement('button');
  button.classList.add('add-btn');
  button.type = 'button';
  button.innerText = '+';

  button.addEventListener('click', e => {
    bagNumber.classList.remove('hidden');
    bagNumber.textContent++;
    const itemName = e.currentTarget.parentNode.id;
    console.log(itemName);
    addItemToCart(itemName);
  })

  const itemInfo = document.createElement('div');
  itemInfo.classList.add('item-info');

  const itemHeader = document.createElement('div');
  itemHeader.classList.add('item-header');

  const itemName = document.createElement('h2');
  itemName.innerText = name;
  itemName.classList.add('item-name');

  const dots = document.createElement('span');
  dots.classList.add('dots');

  const itemPrice = document.createElement('h2');
  itemPrice.innerText = price + ' kr';
  itemPrice.classList.add('item-price');

  const itemDescription = document.createElement('p');
  itemDescription.innerText = description;
  itemDescription.classList.add('item-description');

  itemHeader.append(itemName, dots, itemPrice);
  itemInfo.append(itemHeader, itemDescription);
  menuItem.append(button, itemInfo);

  return menuItem;
};

const displayItems = (data) => {
  data.forEach(item => {
    menu.appendChild(createEntry(item.name, item.description, item.price));
  })
};

const updateOrder =  () => {
  const cart = getCart(); // Object
  if (cart == null) return;

  const orders = document.createElement('div');
  orders.classList.add('orders');

  let total = 0;

  getItems().then(menu => { // Array
    for (let coffee in cart) {
      let price = 0;
      for (let i = 0; i < menu.length; i++) {
        if (menu[i].name === coffee) {
          price = menu[i].price;
          break;
        }
      }
      const amount = cart[coffee];
      total += amount * price;

      orders.appendChild(createOrderEntry(coffee, price, amount));
    }
  }).then(() => {
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total-div');
    const totalHeader = document.createElement('div')
    totalHeader.classList.add('total-header');
    const totalText = document.createElement('h3');
    totalText.classList.add('total-text');
    totalText.innerText = 'Total';
    const dots = document.createElement('span');
    dots.classList.add('dots');
    const totalPrice = document.createElement('h3');
    totalPrice.innerText = total + ' kr';
    totalPrice.classList.add('total-price');
    const totalInfo = document.createElement('p');
    totalInfo.innerText = 'inkl moms + drönarleverans';

    totalHeader.append(totalText, dots, totalPrice);
    totalDiv.append(totalHeader, totalInfo);

    order.append(orders, totalDiv);
  });  
};

const createOrderEntry = (coffee, price, amount) => {
  const div = document.createElement('div');
  div.classList.add('order-div');

  const info = document.createElement('div');
  info.classList.add('info-div');
  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('btn-wrapper');

  const header = document.createElement('div');
  header.classList.add('header-div');

  const name = document.createElement('h3');
  name.classList.add('order-title');
  name.innerText = coffee;

  const dots = document.createElement('span');
  dots.classList.add('dots');

  const itemPrice = document.createElement('p');
  itemPrice.innerText = price * amount + ' kr';
  itemPrice.classList.add('order-price');

  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.classList.add('order-add-btn', 'order-btn');

  const number = document.createElement('p');
  number.innerText = amount;
  number.classList.add('order-amount');

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.classList.add('order-remove-btn', 'order-btn');

  // Event listeners

  addButton.addEventListener('click', e => {
    addItemToCart(coffee);
    number.innerText++;
    bagNumber.textContent++;
    itemPrice.innerText = price * number.innerText + ' kr';
    let totalPriceStringElement = e.currentTarget.parentNode.parentNode.parentNode.parentNode.querySelector('.total-price');
    let totalPrice = parseInt(totalPriceStringElement.innerText.slice(0, -3));
    totalPrice += price;
    totalPriceStringElement.innerText = totalPrice + ' kr';
  });

  removeButton.addEventListener('click', e => {
    const success = removeItemFromCart(coffee);
    if (success) {
      number.innerText--;
      bagNumber.innerText--;
      itemPrice.innerText = price * number.innerText + ' kr';
      let totalPriceStringElement = e.currentTarget.parentNode.parentNode.parentNode.parentNode.querySelector('.total-price');
      let totalPrice = parseInt(totalPriceStringElement.innerText.slice(0, -3));
      totalPrice -= price;
      totalPriceStringElement.innerText = totalPrice + ' kr';
    }
  });

  buttonWrapper.append(addButton, number, removeButton);
  header.append(name, dots);
  info.append(header, itemPrice);
  div.append(info, buttonWrapper);

  return div;
}

const placeOrder = (name, email) => {
  const total = document.querySelector('.total-price').innerText.slice(0, -3);
  const date = new Date();
  const id = 'ABC123';

  const order = {
    id,
    date,
    total
  };

  // ID, DATE, TOTAL

  fetch("/", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({
      name,
      email,
      order
    })
  });

  goToPage('status');
};

const showNumberOfBagItems = () => {
  const amountOfItems = getNumberOfItems();
  if (amountOfItems !== 0) {
    bagNumber.classList.remove('hidden');
    bagNumber.textContent = amountOfItems;
  }
};

bagButton.addEventListener('click', e => {
  orderWindow.classList.toggle('hidden');
  if (orderWindow.classList.contains('hidden')) { // Just was closed
    order.innerHTML = '';
  } else {
    updateOrder();
  }
});

placeOrderButton.addEventListener('click', e => {
  const numberOfIems = getNumberOfItems();
  if (numberOfIems === 0) return;
  const isLoggedIn = getLoginStatus();
  if (isLoggedIn) {
    const user = getUser();
    placeOrder(user.name, user.email);
  } else {
    createLoginField(placeOrder);
  }
});


createNav();

showNumberOfBagItems();

getItems()
  .then(data => displayItems(data));