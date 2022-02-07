const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    const metodo = saveCartItems('<ol><li>Item</li></ol>');
    expect(metodo).toEqual(localStorage.setItem());
  });

  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros correts', () => {
    const metodo = saveCartItems('<ol><li>Item</li></ol>');
    expect(metodo).toEqual(localStorage.setItem('cartItems', '<ol><li>Item</li></ol>'));
  });
});
