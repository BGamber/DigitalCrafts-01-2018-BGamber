let store = {
  products: [
    { id: 3, item: 'DC T-Shirt' }
  ]
};

let thing =
  <HashRouter>
    <Route path="products/:productId" component={ProductScreenSmart} />
  </HashRouter>

let ProductScreen = ({ product }) =>
  product === undefined ? <p>Sorry, product not found...</p> :
    <p>{product.title} ({product.id})</p>

export default connect(
  (state, props) => {
    let { productId } = props.match.params;
    let product = state.products.find(product =>
      product.id === productId);
    return { product };
  }
)(ProductScreen);