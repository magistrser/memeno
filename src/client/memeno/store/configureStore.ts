import {
    applyMiddleware,
    compose,
    createStore,
    StoreEnhancerStoreCreator,
} from 'redux';
import rootReducer from './rootReducer';
import thunkMiddleware from 'redux-thunk';
import initialState from './initialState';

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = compose<StoreEnhancerStoreCreator<unknown>>(
        ...enhancers
    );
    const store = createStore(rootReducer, initialState, composedEnhancers);

    return store;
}
