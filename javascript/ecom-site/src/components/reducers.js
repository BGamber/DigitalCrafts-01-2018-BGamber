import {
  storeProducts,
  storeProductsReducer,
  storeCategories,
  storeCategoriesReducer,
  storeUser,
  storeUserReducer,
  storeCart,
  storeCartReducer
} from '../actions/store';

let initialState = {
  categories: [],
  products: [],
  user: {},
  cart: []
};

let reducers = {
  [storeProducts]: storeProductsReducer,
  [storeCategories]: storeCategoriesReducer,
  [storeUser]: storeUserReducer,
  [storeCart]: storeCartReducer
};

let fallbackReducer = (state) => state;

export let reducer = (oldState = initialState, action) => {
  let subreducer = reducers[action.type] || fallbackReducer;
  let newState = subreducer(oldState, action);
  return newState;
};