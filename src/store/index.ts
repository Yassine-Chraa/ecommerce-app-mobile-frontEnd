import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import CategoriesReducer from './api';
import api from './middleware/api';

const middlewareEnhancer = applyMiddleware(api,thunkMiddleware);
const store = createStore(CategoriesReducer, middlewareEnhancer);

export default store;
