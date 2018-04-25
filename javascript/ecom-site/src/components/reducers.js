import categories from '../json/categories';
import products from '../json/products';
import users from '../json/users';

let initialState = {
  categories,
  products,
  users
};

let reducers = [

];

let fallbackReducer = (state) => state;

export let reducer = (oldState = initialState, action) => {
  let subreducer = reducers[action.type] || fallbackReducer;
  let newState = subreducer(oldState, action);
  return newState;
};