import Body from './components/Body'
import Header from './components/Header'
import AddProduct from './components/AddProduct'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [deleteList, setDeleteList] = useState([])

  // fetching the data from the API
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost/scandiweb-task/')

      console.log(result.data)
      setProducts(result.data)
    }
    fetchData()
  }, [deleteList, showAddProduct])

  // delete item checkbox
  function checkboxChanged(event) {
    if (!event.currentTarget.checked) {
      setDeleteList(
        deleteList.filter((product) => product != event.target.name),
      )
    } else {
      setDeleteList([...deleteList, event.target.name])
    }
  }

  // Mass Delete button clicked
  function onDelete() {
    async function makeDeleteRequest() {
      console.log(JSON.stringify({ product_list: deleteList }))
      let payload = JSON.stringify({ product_list: deleteList })
      let result = await axios.post(`http://localhost/scandiweb-task/`, payload)
    }
    makeDeleteRequest()
    setDeleteList([])
  }

  // Add Product button clicked
  function showAddForm() {
    setShowAddProduct(true)
    // TODO: add logic
  }

  // Cancel button clicked
  function hideAddProduct() {
    setShowAddProduct(false)
  }
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  onDelete={onDelete}
                  showAddForm={showAddForm}
                  showAddProduct={false}
                  hideAddProduct={hideAddProduct}
                />
                <Body
                  products={products}
                  checkboxChanged={checkboxChanged}
                  showAddProduct={showAddProduct}
                  hideAddProduct={hideAddProduct}
                />
              </>
            }
          />
          <Route
            path="/add-product"
            element={
              <>
                <Header
                  onDelete={onDelete}
                  showAddForm={showAddForm}
                  showAddProduct={true}
                  hideAddProduct={hideAddProduct}
                />
                <AddProduct hideAddProduct={hideAddProduct} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App

// deploying react apps on heroku without node modules
