const fetchProducts = async (value) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${value}`;

  try {
    const response = await fetch(url);
    const lista = await response.json();
    return lista;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
