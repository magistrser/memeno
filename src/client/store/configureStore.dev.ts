import {applyMiddleware, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "./rootReducer";
import thunkMiddleware from "redux-thunk";
import initialState from "./initialState";

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);
    const store = createStore(rootReducer, initialState, composedEnhancers);

    return store;
}