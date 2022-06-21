import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as rootActions from '../actions';
import Table from './Table';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { setAPI } = this.props;
    setAPI();
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({
      [name]: event.target.value,
    });
  }

  handleClick(event) {
    event.preventDefault();
    const { setAPI } = this.props;
    setAPI();
    const { expenses, id } = this.props;
    expenses(this.state, id);
  }

  handleForm() {
    return (
      <div>
        <label htmlFor="payment">
          Método de pagamento:
          <select id="payment" name="method" onChange={ this.handleChange }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select id="tag" name="tag" onChange={ this.handleChange }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            name="description"
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }

  render() {
    const { currencyAcronym } = this.props;
    console.log(currencyAcronym);
    return (
      <form>
        <label htmlFor="valor">
          Valor
          <input type="number" name="valor" id="valor" onChange={ this.handleChange } />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select name="moeda" id="moeda" onChange={ this.handleChange }>
            { currencyAcronym && Object.values(currencyAcronym)
              .filter((item) => item.codein !== 'BRLT')
              .map((initials, index) => <option key={ index }>{initials.code}</option>) }
          </select>
        </label>
        { this.handleForm() }
        <button
          type="submit"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
        <Table />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyAcronym: state.wallet.currencies,
  id: state.wallet.id,
});

const mapDispatchToProps = (dispatch) => ({
  setAPI: () => dispatch(rootActions.fetchCurrencyAPI()),
  expenses: (expenses, id) => dispatch(rootActions.addExpenses(expenses, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  setAPI: PropTypes.func,
}.isRequired;
