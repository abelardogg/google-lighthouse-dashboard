import {combineReducers, createStore} from 'redux';
import charts from './reducers/charts';

const initialState = {};
export const rootReducers = combineReducers({
    charts
});

export function configureStore(initialState = {}){
    const store = createStore(rootReducers, initialState);
    return store;
}

export const store = configureStore(initialState); 

console.log('Initial State', store.getState())
// eslint-disable-next-line
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
// eslint-disable-next-line
//unsubscribe()