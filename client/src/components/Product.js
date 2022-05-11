import Products from './Products'

const Product = (props) => {
  return (
    <div className="product">
      <div style={{ alignItems: 'center', textAlign: 'center' }}>
        <input
          type="checkbox"
          className="delete-checkbox"
          name={props.product.sku}
          onChange={(e) => props.checkboxChanged(e)}
        />
        <h3>{props.product.sku}</h3>
        <h3>{props.product.name}</h3>
        <h3>{props.product.price} $</h3>
        <h3>{props.product.size && 'Size ' + props.product.size}</h3>
        <h3>{props.product.weight && 'Weight ' + props.product.weight}</h3>
        <h3>
          {props.product.height &&
            props.product.width &&
            props.product.length &&
            'Dimensions ' +
              props.product.length +
              'x' +
              props.product.width +
              'x' +
              props.product.height}
        </h3>
      </div>
    </div>
  )
}

export default Product
