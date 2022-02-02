const fetchProducts = async () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

  const response = await fetch(url);
  const lista = await response.json();
  const data = lista.results;
  const products = data.map((product) => {
    const result = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    return result;
  });
  return products;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
