const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');

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
      const span = father.firstElementChild;
      const id = span.innerText;
      const objeto = await fetchItem(id);
      const item = createCartItemElement(objeto);
      cartItems.appendChild(item);
      saveCartItems(cartItems);
    });
  });
};

window.onload = () => {
  addToCart();
};
