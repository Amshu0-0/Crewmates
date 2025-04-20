import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Spaceship Crew Builder</h1>
        <nav>
          <ul className="navigation">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Create Crewmate</Link></li>
            <li><Link to="/gallery">Crew Gallery</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;