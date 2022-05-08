import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import tournoisMiddleware from "../middlewres/tournois";
import rootReducer from "../reducers";

const middlewares = [
    tournoisMiddleware
];

const store = createStore({ reducer: rootReducer, middleware: composeWithDevTools(applyMiddleware(...middlewares)) });

export default store;