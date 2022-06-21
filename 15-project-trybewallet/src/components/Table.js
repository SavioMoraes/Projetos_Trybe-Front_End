import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as rootActions from '../actions';

class Table extends React.Component {
  delEspense(id) {
    const { expenseRemove } = this.props;
    expenseRemove(id);
  }

  render() {
    const { expenseStatement } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenseStatement.map((e) => {
              const { id, currency, description, tag, method, value, exchangeRates } = e;
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ value }</td>
                  <td>{ (exchangeRates[currency].name).split('/')[0] }</td>
                  <td>{ (Number(exchangeRates[currency].ask)).toFixed(2) }</td>
                  <td>{ (Number(exchangeRates[currency].ask * value)).toFixed(2) }</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>Real</td>
                  {/* <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                    >
                      Editar/Excuir
                    </button>
                  </td> */}
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

/**
 * Consultei o repsitório do Ivaldo Souza para resolver o map dentro do tbody
* Link: https://github.com/tryber/sd-011-project-trybewallet/pull/11/commits/124b9e05e7580b379786ff50caef4ba95687421d
 */

const mapStateToprops = (state) => ({
  expenseStatement: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expenseRemove: (id) => dispatch(rootActions.removeExpense(id)),
});

export default connect(mapStateToprops, mapDispatchToProps)(Table);

Table.propTypes = {
  expenseStatement: PropTypes.func,
}.isRequired;
