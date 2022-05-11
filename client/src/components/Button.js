import { Link } from 'react-router-dom'
const Button = (props) => {
  return (
    <Link to={props.to}>
      <button
        className="btn"
        style={{ backgroundColor: props.color }}
        onClick={props.onClick}
      >
        {props.title}
      </button>
    </Link>
  )
}

export default Button
