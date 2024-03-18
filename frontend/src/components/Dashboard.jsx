import 'react'
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <>
    <div>this is a Dashboard Page</div>
    <Link to="/layout/product" className='underline'>Go to Product Page</Link>
    </>
    
  )
}

export default Dashboard