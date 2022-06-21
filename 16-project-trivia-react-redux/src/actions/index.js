export const USER_EMAIL = 'USER_EMAIL';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_FAILED = 'GET_QUESTIONS_FAILED';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCESS = 'REQUEST_TOKEN_SUCESS';
export const REQUEST_TOKEN_FAIL = 'REQUEST_TOKEN_FAIL';
export const SET_SCORE = 'SET_SCORE';

export const userEmail = (name) => ({
  type: USER_EMAIL,
  name,
});

export const setScore = (score) => ({
  type: SET_SCORE,
  score,
});

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const requestTokenSucess = (payload) => ({
  type: REQUEST_TOKEN_SUCESS,
  payload,
});

const requestTokenFail = (payload) => ({
  type: REQUEST_TOKEN_FAIL,
  payload,
});

const getQuestions = () => ({
  type: GET_QUESTIONS,
});

const getQuestionsSuccess = (payload) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload,
});

const getQuestionsFailed = (payload) => ({
  type: GET_QUESTIONS_FAILED,
  payload,
});

export const getQuestionsThunk = (token) => async (dispatch) => {
  try {
    dispatch(getQuestions());
    // lembrar de mudar o endpoint, tem que ser o token que vai estar no local storage
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const results = await response.json();
    // console.log(results);
    dispatch(getQuestionsSuccess(results));
  } catch (error) {
    // console.log(error);
    dispatch(getQuestionsFailed(error));
  }
};

export const getApi = () => async (dispatch) => {
  try {
    dispatch(requestToken());
    const fetchApiToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await fetchApiToken.json();
    dispatch(getQuestionsThunk(result.token));
    dispatch(requestTokenSucess(result));
    // return result.token;
  } catch (error) {
    dispatch(requestTokenFail(error));
  }
};
