export const SET_EMAIL = 'SET_EMAIL';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REQUEST_CURRENCY_API = 'REQUEST_CURRENCY_API';
export const REQUEST_CURRENCY_API_SUCESS = 'REQUEST_CURRENCY_API_SUCESS';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const setEmail = (payload) => ({
  type: SET_EMAIL,
  payload,
});

export const addExpenses = (expenses, id) => ({
  type: ADD_EXPENSES,
  expenses,
  id,
});

export const requestCurrencyAPI = () => ({
  type: REQUEST_CURRENCY_API,
});

export const requestCurrencyAPISucess = (payload) => ({
  type: REQUEST_CURRENCY_API_SUCESS,
  payload,
});

export function fetchCurrencyAPI() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();

    dispatch(requestCurrencyAPISucess(currencies));
  };
}

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});
