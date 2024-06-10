import dnaImage from '../assets/dna.png';
import './HomePage.css'
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
    <div>
      <div>
        <img src={dnaImage} className="logo" alt="DNA image"/>
      </div>
      <div className="buttonBox">
        <Link to="global">
          <button className="homeButton">Global Alignment</button>
        </Link>
        <Link to="local">
          <button className="homeButton">Local Alignment</button>
        </Link>
      </div>
    </div>
    </>
  )
}

export default HomePage;