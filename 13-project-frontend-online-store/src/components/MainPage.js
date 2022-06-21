import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import Card from './Card';
import * as fetchApi from '../services/api';

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      products: [],
      loading: true,
      categories: [],
      category: '',
    };

    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleChangeCategories = this.handleChangeCategories.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);

    this.getCategoryAndQuery = this.getCategoryAndQuery.bind(this);
  }

  /* \_(ツ)_/ */
  /* Função para chamar a requisição da função getCategories no carregamento da página */
  componentDidMount() {
    this.requestCart();
  }

  /* Função para capturar o valor digitado no input de busca */
  handleChangeSearch({ target }) {
    const { value } = target;
    this.setState({
      searchText: value,
    });
  }

  /* Função para fazer requisição da função getProductFromCategoryAndQuery pelo atributo onClick no botão */
  handleClickButton() {
    this.getCategoryAndQuery();
  }

  /* Função para capturar e renderizar os produtos por categoria  */
  async handleChangeCategories({ target }) {
    const { searchText } = this.state;
    const { name, value } = target;
    this.setState({
      [name]: value,
      loading: true,
    });
    const response = await fetchApi.getProductsFromCategoryAndQuery(value, searchText);
    this.setState({
      products: response.results,
      loading: false,
    });
  }

  /* Função para fazer requisição da função getProducsFromCategoryAndQuery */
  async getCategoryAndQuery() {
    const { searchText, category } = this.state;
    this.setState({
      loading: true,
    });
    const getApi = await fetchApi.getProductsFromCategoryAndQuery(category, searchText);
    this.setState({
      products: getApi.results,
      loading: false,
    });
  }

  /* Função para fazer requisição da função getCategories que é chamada na componentDidMount */
  async requestCart() {
    const toRender = await fetchApi.getCategories();
    this.setState({
      categories: toRender,
    });
  }

  render() {
    const { searchText, products, loading, categories } = this.state;
    return (
      <div>
        <header>
          <h3 className="title">Project Frontend Online Store - Grupo 36</h3>
          <label htmlFor="input-search">
            <input
              className="input-text"
              name="input-search"
              type="text"
              data-testid="query-input"
              onChange={ this.handleChangeSearch }
              value={ searchText }
              placeholder="Digite algum termo de pesquisa ou escolha uma categoria."
            />
          </label>
          <Button
            handleClick={ this.handleClickButton }
            value={ searchText }
          />
          <div>
            <Link
              className="link-cart"
              data-testid="shopping-cart-button"
              to="/components/Cart"
            >
              &#x1F6D2;
            </Link>
          </div>
        </header>
        <div data-testid="home-initial-message">
          {/* <p className="title-page"> </p> */}
          <div className="categories">
            <h4 className="categorias">Categorias</h4>
            {categories
              .map((e, index) => (
                <label key={ index } htmlFor="category" className="label-categories">
                  <input
                    className="category-input"
                    data-testid="category"
                    name="category"
                    type="radio"
                    value={ e.id }
                    onClick={ this.handleChangeCategories }
                  />
                  { e.name }
                  <br />
                </label>
              ))}
          </div>
          <div className="main-page-products">
            {!loading && products
              .map((e, index) => <Card product={ e } key={ index } />)}
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
