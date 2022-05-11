import Product from './Product'

const Products = (props) => {
  return (
    <div className="products">
      {props.products.map((product) => (
        <Product
          key={product.sku}
          product={product}
          onDelete={props.onDelete}
          onToggle={props.onToggle}
          checkboxChanged={props.checkboxChanged}
        />
      ))}
    </div>
  )
}

export default Products
