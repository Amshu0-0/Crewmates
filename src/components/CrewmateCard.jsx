import { Link } from 'react-router-dom';
import './CrewmateCard.css';

const CrewmateCard = ({ crewmate }) => {
  return (
    <div className="crewmate-card">
      <h3>{crewmate.name}</h3>
      <div className="crewmate-info">
        <p><strong>Role:</strong> {crewmate.role}</p>
        <p><strong>Species:</strong> {crewmate.species}</p>
      </div>
      <div className="crewmate-stats">
        <div className="stat">
          <span className="stat-label">STR</span>
          <span className="stat-value">{crewmate.strength}</span>
        </div>
        <div className="stat">
          <span className="stat-label">INT</span>
          <span className="stat-value">{crewmate.intelligence}</span>
        </div>
        <div className="stat">
          <span className="stat-label">SPD</span>
          <span className="stat-value">{crewmate.speed}</span>
        </div>
      </div>
      <div className="crewmate-actions">
        <Link to={`/crewmate/${crewmate.id}`} className="view-link">View Details</Link>
        <Link to={`/edit/${crewmate.id}`} className="edit-link">Edit</Link>
      </div>
    </div>
  );
};

export default CrewmateCard;