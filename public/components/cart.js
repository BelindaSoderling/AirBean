/* EXAMPLE

cart : {
  cappuccino: 1,
  bryggkaffe: 3
}

*/


export const addItemToCart = (nameOfCoffee) => {
  let cart = getCart();
  if (cart == null) {
    return sessionStorage.setItem('cart', JSON.stringify({ [nameOfCoffee] : 1}));
  };

  let currentAmount = cart[nameOfCoffee];

  if (currentAmount == undefined) {
    cart[nameOfCoffee] = 1;
  } else {
    cart[nameOfCoffee] = ++currentAmount;
  }
  
  sessionStorage.setItem('cart', JSON.stringify(cart));
};

export const removeItemFromCart = (nameOfCoffee) => {
  let cart = getCart();
  if (cart == null) return false;

  let currentAmount = cart[nameOfCoffee];

  if (currentAmount >= 1) {
    cart[nameOfCoffee] = --currentAmount;
    sessionStorage.setItem('cart', JSON.stringify(cart));
    return true;
  } 

  return false;
}

export const getNumberOfItems = () => {
  let cart = getCart();
  if (cart == null) { return 0; }

  const sum = Object.values(cart).reduce((a, b) => a + b);
  return sum;
};


export const getCart = () => {
  let cart = sessionStorage.getItem('cart');
  return JSON.parse(cart);
}


export const clearCart = () => {
  sessionStorage.removeItem('cart');
}