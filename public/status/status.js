import { getUser } from '../components/login.js'
import { goToPage } from '../components/redirect.js';

const orderNumber = document.querySelector('.order-number');
const minutes = document.querySelector('.minutes-number');
const button = document.querySelector('.btn');

const getLatestOrder = async () => {
  const user = getUser();
  const name = user.name;
  const email = user.email;

  const response = await fetch(`../api/user?name=${name}&email=${email}`); 
  const data = await response.json();
  const orders = data.orders;
  const latestOrder = orders[orders.length - 1];
  return latestOrder;
};

const getMinutesSinceLastOrder = (date) => {
  const currentDate = new Date();
  const orderDate = new Date(date);
  const diff = currentDate - orderDate; // ms
  const minutesPassed = Math.floor((diff / 1000) / 60);
  return minutesPassed;
}

button.addEventListener('click', e => {
  goToPage('menu');
})

getLatestOrder()
  .then(order => {
    const orderTime = 15;
    orderNumber.innerText += ' ' + order.id;
    const minutesPassed = getMinutesSinceLastOrder(order.date);
    const timeLeft = orderTime - minutesPassed;
    if (timeLeft < 0) {
      return minutes.innerText = 0;
    } else {
      minutes.innerText = timeLeft;
    }

    let interval = setInterval(() => {
      minutes.innerText--;
      if (minutes.innerText <= 0) {
        clearInterval(interval);
      }
    }, 60000);
  }).catch(err => {
    minutes.innerText = 0;
    console.error(err);
  });