import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="header">
      <nav className="navbar">
        <div className="logo">
        </div>
        <ul className="navList">
          <li>
            <Link to="/" className="link">Home</Link>
          </li>
          <li>
            <Link to="/global" className="link">Global Alignment</Link>
          </li>
          <li>
            <Link to="/local" className="link">Local Alignment</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar