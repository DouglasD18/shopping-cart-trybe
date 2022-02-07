require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  })

  it('Se fetch é chamado ao executar fetchProducts', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  it('Se fetch é chamado com a url correta', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(url);
  })

  it('Se fetchProducts dá o resultado correto', async () => {
    const metodo = await fetchProducts('computador')
    expect(metodo).toEqual(computadorSearch);
  })

// Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error('mensagem esperada aqui') para comparar com o objeto retornado da API.
  it('Se fetch é chamado com a url correta', async () => {
    expect.assertions(1);
    const metodo = await fetchProducts();
    expect(metodo).toEqual(new Error('You must provide an url'));
  })
});
