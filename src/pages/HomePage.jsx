import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Spaceship Crew Builder</h1>
        <p>Build your dream spaceship crew with customizable crewmates!</p>
        <div className="hero-actions">
          <Link to="/create" className="primary-button">Create New Crewmate</Link>
          <Link to="/gallery" className="secondary-button">View Your Crew</Link>
        </div>
      </div>
      
      <div className="features">
        <div className="feature">
          <h3>Create Crewmates</h3>
          <p>Design your own crewmates with unique attributes and roles.</p>
        </div>
        <div className="feature">
          <h3>Manage Your Crew</h3>
          <p>View, edit, and organize your crew members in one place.</p>
        </div>
        <div className="feature">
          <h3>Detailed Profiles</h3>
          <p>Each crewmate has their own detailed profile page.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;