const saveCartItems = (ul) => {
  localStorage.setItem('cartItems', JSON.stringify(ul.innerHTML));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
