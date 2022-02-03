const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const result = {
      sku: data.id,
      name: data.title,
      salePrice: data.price,
    };
    return result;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
