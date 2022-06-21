import { combineReducers } from 'redux';
import user from './user';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({ user, questionsReducer });

export default rootReducer;
