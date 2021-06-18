import {combineReducers, createStore} from 'redux';
import charts from './reducers/charts';
import data from './reducers/data';


const initialState = {};
export const rootReducers = combineReducers({
    charts,
    data
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