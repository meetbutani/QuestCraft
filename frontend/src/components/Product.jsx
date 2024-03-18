import 'react'
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <>
    <div>This is a Product Page</div>
    <Link to="/layout/dashboard" className='underline'>Go to dashboard Page</Link>
    </>
  )
}

export default Product