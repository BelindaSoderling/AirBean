import { createNav } from '../components/nav.js';
import { getLoginStatus, getUser, createLoginField } from '../components/login.js'
import { goToPage } from '../components/redirect.js';

const orders = document.querySelector('.orders');
const usernameField = document.querySelector('.username');
const emailField = document.querySelector('.email');

const getOrders = async () => {
  const user = getUser();
  const name = user.name;
  const email = user.email;

  usernameField.innerText = name;
  emailField.innerText = email;

  const response = await fetch(`../api/user?name=${name}&email=${email}`); 
  const data = await response.json();

  if (data === null) { throw new Error()}

  const orders = data.orders;
  return orders;
};

const createOrderCard = (id, date, total) => {
  const div = document.createElement('div');
  div.classList.add('order-div');
  const header = document.createElement('div');
  header.classList.add('header-div');
  const footer = document.createElement('div');
  footer.classList.add('footer-div');

  const idText = document.createElement('p');
  idText.classList.add('id');
  idText.innerText = id;

  const dateText = document.createElement('p');
  const dateOfOrder = new Date(date);
  const year = dateOfOrder.getFullYear().toString().slice(-2);
  let month = dateOfOrder.getMonth() + 1;
  let day = dateOfOrder.getDate();
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  const fullDate = `${year}/${month}/${day}`;
  dateText.innerText = fullDate;
  dateText.classList.add('.date');

  const info = document.createElement('p');
  info.classList.add('info');
  info.innerText = 'total ordersumma';

  const price = document.createElement('p');
  price.classList.add('price');
  price.innerText = total + ' kr';

  const hr = document.createElement('hr');

  header.append(idText, dateText);
  footer.append(info, price);
  div.append(header, footer, hr);
  
  return div;
};

createNav();

const isLoggedIn = getLoginStatus();

if (!isLoggedIn) {
  createLoginField(goToPage, 'profile');
} else {
  getOrders()
  .then(data => {
    let total = 0;

    data.forEach(order => {
      orders.prepend(createOrderCard(order.id, order.date, order.total));
      total += order.total;
    });

    const hr = document.createElement('hr');
    hr.classList.add('fat-line');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    const text = document.createElement('p');
    text.classList.add('spent-text');
    text.innerText = 'Totalt spenderat';
    const totalSpent = document.createElement('p');
    totalSpent.classList.add('spent');
    totalSpent.innerText = total + ' kr';
    wrapper.append(text, totalSpent);
    orders.append(hr, wrapper);
  }).catch(err => {
    // Don't show anything if no orders can be found.
  })
};