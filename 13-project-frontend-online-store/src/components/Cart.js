import React from 'react';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      itens: [],
    };
    this.sumLocalStorage = this.sumLocalStorage.bind(this);
    this.subLocalStorage = this.subLocalStorage.bind(this);
    this.renderCart = this.renderCart.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.renderCart();
  }

  sumLocalStorage(param) {
    const { itens } = this.state;
    const checkId = itens.map((valor) => valor.id);
    const verifyId = checkId.indexOf(param);
    itens[verifyId].qtdItems += 1;
    localStorage.setItem('cart', JSON.stringify([...itens]));
  }

  subLocalStorage(param) {
    const { itens } = this.state;
    const checkId = itens.map((valor) => valor.id);
    const verifyId = checkId.indexOf(param);
    itens[verifyId].qtdItems -= 1;
    localStorage.setItem('cart', JSON.stringify([...itens]));
  }

  removeItem(id) {
    const { itens } = this.state;
    const Arr = itens.filter((item) => item.id !== id);
    this.setState({
      itens: Arr,
    });
    localStorage.setItem('cart', JSON.stringify(Arr));
  }

  renderCart() {
    const produtoDoCarrinho = JSON.parse(localStorage.getItem('cart'));
    this.setState({
      itens: produtoDoCarrinho,
    });
  }

  render() {
    const { itens } = this.state;
    const mensagem = (
      <p data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </p>);
    const valorProducts = !itens ? mensagem : itens
      .map(({ price, qtdItems }) => price * qtdItems)
      .reduce((acc, curr) => (acc + curr), 0).toFixed(2);
    return (
      <div className="cart-container">
        <header>
          <h3 className="title">Project Frontend Online Store - Grupo 36</h3>
        </header>
        <Link to="/" className="house">&#x1F3E0;</Link>
        <div className="selectioned-products">
          {!localStorage.cart ? (mensagem) : itens
            .map(({ title, thumbnail, price, qtdItems, id }, index) => (
              <div key={ index } className="cart">
                <p
                  className="title-product-cart"
                  data-testid="shopping-cart-product-name"
                >
                  { title }
                </p>
                <img src={ thumbnail } alt={ title } />
                <p className="price">{ `R$ ${price}` }</p>
                <Link to="/components/Cart">
                  <button
                    className="btn-subtract"
                    data-testid="product-decrease-quantity"
                    type="submit"
                    onClick={ () => this.subLocalStorage(id) }
                    disabled={ qtdItems === 1 }
                  >
                    -
                  </button>
                </Link>
                <span data-testid="shopping-cart-product-quantity" className="qtd-item">
                  { `Quantidade: ${qtdItems}` }
                </span>
                <Link to="/components/Cart">
                  <button
                    className="btn-sum"
                    data-testid="product-increase-quantity"
                    type="submit"
                    onClick={ () => this.sumLocalStorage(id) }
                  >
                    +
                  </button>
                </Link>
                <Link to="/components/Cart">
                  <button
                    className="btn-delete-product-cart"
                    onClick={ () => this.removeItem(id) }
                    type="button"
                  >
                    x
                  </button>
                </Link>
              </div>
            ))}
        </div>
        <div className="total-links">
          <span className="total">
            { `Total: R$ ${valorProducts}` }
          </span>
          <br />
          <button type="button">
            <Link
              to="/components/Checkout"
              data-testid="checkout-products"
              className="finalizar-compra"
            >
              FINALIZAR COMPRA
            </Link>
          </button>
          <br />
        </div>
      </div>
    );
  }
}

export default Cart;
