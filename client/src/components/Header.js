import Button from './Button'

const Header = (props) => {
  return (
    <header className="header">
      <h1>Product List</h1>
      <div>
        {props.showAddProduct ? (
          <>
            <Button
              color="gray"
              title="Cancel"
              onClick={props.hideAddProduct}
              to="/"
            />
          </>
        ) : (
          <>
            <Button
              color="red"
              title="MASS DELETE"
              onClick={props.onDelete}
              to="/"
            />
            <Button
              color="green"
              title="ADD"
              to="add-product"
              onClick={props.showAddForm}
            />
          </>
        )}
      </div>
    </header>
  )
}

export default Header
