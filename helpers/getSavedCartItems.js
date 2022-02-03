const getSavedCartItems = () => {
  const array = JSON.parse(localStorage.getItem('cartItems'));
  return array;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
