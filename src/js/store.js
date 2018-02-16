import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import * as reducers from './reducers';


const reducer = combineReducers({ ...reducers });

export default createStore(reducer, {} ,applyMiddleware( promiseMiddleware() ) );