import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { useState } from 'react'

const AddProduct = ({ hideAddProduct }) => {
  const [inputError, setInputError] = useState([])
  // formik for form handling
  const formik = useFormik({
    initialValues: {
      sku: '',
      name: '',
      price: '',
      type: 'dvd',
      size: '',
      weight: '',
      height: '',
      length: '',
      width: '',
    },
    // Valdiation
    validationSchema: Yup.object({
      sku: Yup.string()
        .max(50, "SKU mustn't exceed 50 characters.")
        .required('SKU is required.'),
      name: Yup.string()
        .max(50, "Name mustn't exceed 50 characters.")
        .required('Name is required.'),
      price: Yup.number('Please enter a valid number.')
        .positive('Please enter a positive number.')
        .required('Price is required.'),
      size: Yup.number('Please enter a valid number.').positive(
        'Please enter a positive number.',
      ),
      weight: Yup.number('Please enter a valid number.').positive(
        'Please enter a positive number.',
      ),
      Height: Yup.number('Please enter a valid number.').positive(
        'Please enter a positive number.',
      ),
      length: Yup.number('Please enter a valid number.').positive(
        'Please enter a positive number.',
      ),
      width: Yup.number('Please enter a valid number.').positive(
        'Please enter a positive number.',
      ),
    }),
    // Submission
    onSubmit: async (values, props) => {
      // checking if no type specific inputs are added
      if (
        !formik.values.size &&
        !formik.values.weight &&
        !(formik.values.height && formik.values.length && formik.values.width)
      ) {
        setInputError('You must provide the attributes of the product type')
        return
      }
      let result = await axios
        .post(`http://localhost/scandiweb-task/`, JSON.stringify(values))
        .then()
        .catch(
          setInputError(
            'A product with this SKU already exists in the dabase.',
          ),
        )
      window.location.href = '/'
    },
  })

  return (
    <div>
      <form
        id="product_form"
        className="product_form"
        onSubmit={formik.handleSubmit}
      >
        {inputError ? (
          <div className="alert">
            <h3>{inputError}</h3>
          </div>
        ) : null}
        <div className="form-control">
          <label>SKU</label>
          <input
            id="sku"
            type="text"
            placeholder="Add sku"
            name="sku"
            value={formik.values.sku}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {/* SKU Validation */}
        {formik.errors.sku && formik.touched.sku && (
          <div className="alert">
            <h3>{formik.errors.sku}</h3>
          </div>
        )}

        <div className="form-control">
          <label>Name</label>
          <input
            id="name"
            type="text"
            placeholder="Add Name"
            name="name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        {/* Name Validation */}
        {formik.errors.name && formik.touched.name && (
          <div className="alert">
            <h3>{formik.errors.name}</h3>
          </div>
        )}

        <div className="form-control">
          <label>Price ($)</label>
          <input
            id="price"
            type="text"
            placeholder="Add Price in Dollars"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {/* Price Validation */}
        {formik.errors.price && formik.touched.price && (
          <div className="alert">
            <h3>{formik.errors.price}</h3>
          </div>
        )}

        {/* Select Product type */}
        <div className="rendered-form">
          <div className="form-control">
            <label className="">Type Switcher</label>
            <select
              className="form-control-switcher"
              id="productType"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <option value="dvd" id="DVD">
                DVD
              </option>
              <option value="book" id="Book">
                Book
              </option>
              <option value="furniture" id="Furniture">
                Furniture
              </option>
            </select>
          </div>

          {/* Type-Specific Inputs */}
          {/* DVD */}
          {formik.values.type === 'dvd' && (
            <div className="form-control">
              <label>Please provide size in MBs</label>
              <input
                id="size"
                type="text"
                placeholder="DVD size in MBs"
                name="size"
                value={formik.values.size}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          )}
          {/* Size Validation */}
          {formik.errors.size && formik.touched.size && (
            <div className="alert">
              <h3>{formik.errors.size}</h3>
            </div>
          )}

          {/* Book */}
          {formik.values.type === 'book' && (
            <div className="form-control">
              <label>Please, provide weight in Kg</label>
              <input
                id="weight"
                type="text"
                placeholder="Book Weight in Kg"
                name="weight"
                value={formik.values.weight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          )}
          {/* Weight Validation */}
          {formik.errors.weight && formik.touched.weight && (
            <div className="alert">
              <h3>{formik.errors.weight}</h3>
            </div>
          )}

          {/* Furniture */}
          {formik.values.type === 'furniture' && (
            <>
              <div className="form-control">
                <label>Please, provide dimensions in cm:</label>
                <label>Height</label>
                <input
                  id="height"
                  type="text"
                  placeholder="Height in cm."
                  name="height"
                  value={formik.values.height}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {/* Height Validation */}
              {formik.errors.height && formik.touched.height && (
                <div className="alert">
                  <h3>{formik.errors.height}</h3>
                </div>
              )}

              <div className="form-control">
                <label>Length</label>
                <input
                  type="text"
                  placeholder="Length in cm"
                  name="length"
                  value={formik.values.length}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {/* Length Validation */}
              {formik.errors.length && formik.touched.length && (
                <div className="alert">
                  <h3>{formik.errors.length}</h3>
                </div>
              )}

              <div className="form-control">
                <label>Width</label>
                <input
                  type="text"
                  placeholder="Width in cm."
                  name="width"
                  value={formik.values.width}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {/* Width Validation */}
              {formik.errors.width && formik.touched.width && (
                <div className="alert">
                  <h3>{formik.errors.width}</h3>
                </div>
              )}
            </>
          )}
        </div>
        <input className="btn btn-block" type="submit" value="Save" />
      </form>
    </div>
  )
}

export default AddProduct
