const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const cart = document.querySelector('.cart');
const span = document.createElement('span');
span.className = 'total-price';
cart.appendChild(span);

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

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}  */

function cartItemClickListener(event) {
  const product = event.target;
  product.remove();
  saveCartItems(cartItems);
  if (cartItems.childNodes.length > 0) {
    getTotalPrice(); 
  } else {
    const erro = span.firstElementChild;
    span.removeChild(erro);
  }
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const insertItems = async () => {
  const products = await fetchProducts();
  products.forEach((product) => {
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
      const objeto = await fetchItem(id);
      const item = createCartItemElement(objeto);
      cartItems.appendChild(item);
      saveCartItems(cartItems);
      if (cartItems.childNodes.length > 0) {
        getTotalPrice(); 
      }
    });
  });
};

window.onload = () => {
  addToCart();
};
