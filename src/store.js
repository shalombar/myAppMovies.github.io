import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import middleware from './middleware/general.mid'
import rootReducer from './reducers/rootReducer';
export default function configureStore(initialState = {}) {
    return createStore(
        rootReducer,
        applyMiddleware(middleware)
    );
}