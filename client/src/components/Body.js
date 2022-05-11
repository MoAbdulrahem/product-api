import Products from './Products'
import AddProduct from './AddProduct'
const Body = (props) => {
  return (
    <div>
      {props.products.length > 0 ? (
        <Products
          products={props.products}
          checkboxChanged={props.checkboxChanged}
        />
      ) : (
        <h2>No Products Found.</h2>
      )}
    </div>
  )
}

export default Body
