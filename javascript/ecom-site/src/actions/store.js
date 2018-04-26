const STORE_PRODUCTS = 'STORE_PRODUCTS';
export let storeProducts = (products) => ({ type: STORE_PRODUCTS, payload: products });
storeProducts.toString = () => STORE_PRODUCTS;

export let storeProductsReducer = (state, action) =>
  ({
    ...state,
    products: action.payload
  });

const STORE_CATEGORIES = 'STORE_CATEGORIES';
export let storeCategories = (categories) => ({ type: STORE_CATEGORIES, payload: categories });
storeCategories.toString = () => STORE_CATEGORIES;

export let storeCategoriesReducer = (state, action) =>
  ({
    ...state,
    categories: action.payload
  });

const STORE_USER = 'STORE_USER';
export let storeUser = (user) => ({ type: STORE_USER, payload: user });
storeUser.toString = () => STORE_USER;

export let storeUserReducer = (state, action) =>
  ({
    ...state,
    user: action.payload
  });

const STORE_CART = 'STORE_CART';
export let storeCart = (cart) => ({ type: STORE_CART, payload: cart });
storeCart.toString = () => STORE_CART;

export let storeCartReducer = (state, action) =>
  ({
    ...state,
    cart: action.payload
  });