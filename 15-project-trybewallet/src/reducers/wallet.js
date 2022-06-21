import {
  REQUEST_CURRENCY_API,
  REQUEST_CURRENCY_API_SUCESS,
  ADD_EXPENSES } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  id: 0,
  expenses: [],
  isLoading: false,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCY_API:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_CURRENCY_API_SUCESS:
    return {
      ...state,
      isLoading: false,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      id: state.id + 1,
      expenses: [...state.expenses,
        { id: action.id,
          ...action.expenses,
          exchangeRates: state.currencies,
        }],
    };
  default:
    return state;
  }
}

/**
 * Consultei o repositório da Gabriela Feijó para reslver o problema com o switch case add_expense
 * Link: https://github.com/tryber/sd-011-project-trybewallet/pull/90/commits/9dbc6234fbd7dcb9d4235c8eda338f06499ae18d
 */

export default wallet;
