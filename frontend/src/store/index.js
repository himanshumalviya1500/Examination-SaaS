import { createStore, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import reducer from "./Reducers/index";
import logger from "redux-logger";

const allEnhancers = compose(applyMiddleware(thunk, logger));

const store = createStore(reducer, allEnhancers);
export default store;
