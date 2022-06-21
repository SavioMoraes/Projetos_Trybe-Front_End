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

function createTotal() {
  const liPrice = document.querySelectorAll('.cart__item');
  let sumTotal = 0;
    for (let counter = 0; counter < liPrice.length; counter += 1) {
      const valor = liPrice[counter].innerHTML.split('$')[1];
      sumTotal += Number(valor);
    }
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerHTML = sumTotal;
}

function clearCart() {
  const li = document.querySelectorAll('.cart__item');
  const ol = document.querySelector('ol');
  console.log(li);
  for (let index = 0; index < li.length; index += 1) {
    ol.removeChild(li[index]);
  }
  createTotal();
}

function cartItemClickListener(event, counter) {
  const removesTheItemFromTheList = event.target;
  removesTheItemFromTheList.parentNode.removeChild(removesTheItemFromTheList);
  localStorage.removeItem(`item${counter}`);
  createTotal();
}
function createCartItemElement({ sku, name, price }) {
  const li = document.createElement('li');
  const ol = document.querySelector('.cart__items');
  const counter = ol.childElementCount;
  localStorage.setItem(`item${counter}`, `${sku}|${name}|${price}`);
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${price}`;
  li.addEventListener('click', (event) => cartItemClickListener(event, counter));
  ol.appendChild(li);
  createTotal();
  return li;
}

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', () => createCartItemElement({ sku, name, price }));

  return section;
}

function getMercadoLibre() {
  const loading = document.createElement('span');
  loading.className = 'loading';
  loading.innerText = 'Loading...';
  const container = document.querySelector('.container');
  container.appendChild(loading);
  const promise = 'https://api.mercadolibre.com/sites/MLB/search?q=$computador';
  const sectionItems = document.querySelector('.items');
  fetch(promise).then((response) => response.json())
  .then((data) => data.results.forEach(({ id, title, thumbnail, price }) => sectionItems
  .appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail, price }))))
  .then(() => {
    for (let index = 0; index < localStorage.length; index += 1) {
      const [sku, name, price] = localStorage.getItem(`item${index}`).split('|');
      const saveInLocalStorage = { sku, name, price };
      createCartItemElement(saveInLocalStorage);
    }
    container.removeChild(loading);
  });
}

window.onload = () => {
  getMercadoLibre();
  const buttonClearCart = document.querySelector('.empty-cart');
  buttonClearCart.addEventListener('click', clearCart);
};
