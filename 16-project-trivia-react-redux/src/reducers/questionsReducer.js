import { GET_QUESTIONS, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILED } from '../actions';

const INITIAL_STATE = {
  questions: '',
};

export default function questionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, isLoading: true };
  case GET_QUESTIONS_SUCCESS:
    return { ...state, questions: action.payload.results, isLoading: false };
  case GET_QUESTIONS_FAILED:
    return { ...state, error: action.payload, isLoading: false };
  default:
    return state;
  }
}
