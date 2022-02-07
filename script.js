const items = document.querySelector('.items');
const container = document.querySelector('.container');
const cartItems = document.querySelector('.cart__items');
const cart = document.querySelector('.cart');
const span = document.createElement('span');
span.className = 'total-price';
cart.appendChild(span);

const createLoadingMessage = () => {
  const message = document.createElement('div');
  message.className = 'loading';
  message.innerText = 'carregando...';
  container.appendChild(message);
}; 

const deleteLoadingMessage = () => {
  message = container.lastChild;
  container.removeChild(message);
};

const getTotalPrice = () => {
  if (span.childNodes.length > 0) {
    const erro = span.firstElementChild;
    span.removeChild(erro);
  }
  const array = [];
  const p = document.createElement('p');
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

function cartItemClickListener(event) {
  const product = event.target;
  product.remove();
  saveCartItems(cartItems);
  getTotalPrice(); 
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

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

const getSaveItems = () => {
  cartItems.innerHTML = getSavedCartItems();
  const li = cartItems.childNodes;
  li.forEach((product) => {
    product.addEventListener('click', cartItemClickListener);
  });
  getTotalPrice();
};

const necessity = (data) => {
    const result = {
      sku: data.id,
      name: data.title,
      salePrice: data.price,
    };
    return result;
};

const addToCart = async () => {
  await insertItems();
  getSaveItems();
  const buttons = document.querySelectorAll('.item__add');
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

window.onload = async () => {
  await addToCart();
};
