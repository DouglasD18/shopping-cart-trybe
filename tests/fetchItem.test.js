require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Se fetchItem é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  })

  it('Se fetch é chamado ao executar fetchItem', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  it('Se fetch é chamado com a url correta', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith(url);
  })

  it('Se fetch é chamdo ao executar fetchItem', async () => {
    const fetchMB = await fetchItem('MLB1615760527');
    expect(fetchMB).toEqual(item);
  })

  it('Se fetch é chamdo ao executar fetchItem', async () => {
    const fetchMB = await fetchItem();
    expect(fetchMB).toEqual(new Error('You must provide an url'));
  })
});
