const items = document.querySelector('.items');
const container = document.querySelector('.container');
const cartItems = document.querySelector('.cart__items');
const cart = document.querySelector('.cart');
const span = document.createElement('span');
span.className = 'total-price';
cart.appendChild(span);

// Cria mensagem de carregamento enquanto está sendo feita a requisição à API.
const createLoadingMessage = () => {
  const message = document.createElement('div');
  message.className = 'loading';
  message.innerText = 'carregando...';
  container.appendChild(message);
}; 

// Deleta a mensagem de carregamento.
const deleteLoadingMessage = () => {
  message = container.lastChild;
  container.removeChild(message);
};

// Calcula o preço total dos produtos que estão no carrinho de compras.
const getTotalPrice = () => {
  span.innerHTML = '';
  const array = [];
  const p = document.createElement('p');
  p.className = 'price';
  const li = cartItems.childNodes;
  li.forEach((product) => {
    const text = product.innerText;
    const index = text.indexOf('$') + 1;
    const value = text.substr(index);
    const price = parseFloat(value);
    array.push(price);
  });
  const price = array.reduce((acc, curr) => acc + curr, 0);
  p.innerText = price;
  span.appendChild(p);
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// Retira o produto clicado do carrinho de compras atualiza o localStorage e o preço total.
function cartItemClickListener(event) {
  const product = event.target;
  product.remove();
  saveCartItems(cartItems);
  getTotalPrice(); 
}

// Adiciona o produto ao carinho de compras
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Adiciona os produtos ao catálogo.
const insertItems = async () => {
  createLoadingMessage();
  const products = await fetchProducts('computador');
  deleteLoadingMessage();
  const { results } = products;
  const values = results.map((product) => {
    const result = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    return result;
  });
  values.forEach((product) => {
    const item = createProductItemElement(product);
    items.appendChild(item);
  });
};

// Atualiza o cariinho de compras através do localStorage.
const getSaveItems = () => {
  cartItems.innerHTML = getSavedCartItems();
  const li = cartItems.childNodes;
  li.forEach((product) => {
    product.addEventListener('click', cartItemClickListener);
  });
  getTotalPrice();
};

// Retorna as informações necessárias dos produtos.
const necessity = (data) => {
    const result = {
      sku: data.id,
      name: data.title,
      salePrice: data.price,
    };
    return result;
};

// Adiciona os produtos clicados ao carrinho de compras e atualiza o localStorage e o preço total.
const addInClick = (buttons) => {
  buttons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const father = event.target.parentElement;
      const div = father.firstElementChild;
      const id = div.innerText;
      createLoadingMessage();
      const objeto = await fetchItem(id);
      deleteLoadingMessage();
      const need = necessity(objeto);
      const item = createCartItemElement(need);
      cartItems.appendChild(item);
      saveCartItems(cartItems);
      getTotalPrice(); 
    });
  });
};

// Limpa o carrinho de compra e atualiza o localStorage e o preço total.
const clearCart = () => {
  const vanish = document.querySelector('.empty-cart');
  vanish.addEventListener('click', () => {
    cartItems.innerHTML = '';
    getTotalPrice();
    saveCartItems(cartItems);
  });
};

// Faz toda a lógica do site acontecer.
const addToCart = async () => {
  await insertItems();
  getSaveItems();
  clearCart();
  const buttons = document.querySelectorAll('.item__add');
  addInClick(buttons);
};

window.onload = async () => {
  await addToCart();
};
