import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './DetailPage.css';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('crewmates')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (!data) {
          navigate('/gallery');
          return;
        }
        
        setCrewmate(data);
      } catch (error) {
        console.error('Error fetching crewmate details:', error);
        setError('Failed to load crewmate details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCrewmate();
    }
  }, [id, navigate]);

  if (loading) {
    return <div className="loading">Loading crewmate details...</div>;
  }

  if (error || !crewmate) {
    return (
      <div className="error-container">
        <p>{error || 'Crewmate not found'}</p>
        <Link to="/gallery" className="primary-button">Back to Gallery</Link>
      </div>
    );
  }

  // Format date for display
  const createdDate = new Date(crewmate.created_at).toLocaleDateString();
  const updatedDate = crewmate.updated_at 
    ? new Date(crewmate.updated_at).toLocaleDateString() 
    : null;

  return (
    <div className="detail-page">
      <div className="detail-header">
        <h2>{crewmate.name}</h2>
        <Link to="/gallery" className="back-link">Back to Gallery</Link>
      </div>
      
      <div className="crewmate-detail-card">
        <div className="detail-section">
          <h3>Basic Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Role:</span>
              <span className="detail-value">{crewmate.role}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Species:</span>
              <span className="detail-value">{crewmate.species}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Created:</span>
              <span className="detail-value">{createdDate}</span>
            </div>
            {updatedDate && (
              <div className="detail-item">
                <span className="detail-label">Last Updated:</span>
                <span className="detail-value">{updatedDate}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="detail-section">
          <h3>Attributes</h3>
          <div className="attributes-display">
            <div className="attribute-bar">
              <span className="attribute-name">Strength</span>
              <div className="attribute-progress">
                <div 
                  className="progress-fill strength" 
                  style={{ width: `${(crewmate.strength / 5) * 100}%` }}
                >
                  {crewmate.strength}/5
                </div>
              </div>
            </div>
            <div className="attribute-bar">
              <span className="attribute-name">Intelligence</span>
              <div className="attribute-progress">
                <div 
                  className="progress-fill intelligence" 
                  style={{ width: `${(crewmate.intelligence / 5) * 100}%` }}
                >
                  {crewmate.intelligence}/5
                </div>
              </div>
            </div>
            <div className="attribute-bar">
              <span className="attribute-name">Speed</span>
              <div className="attribute-progress">
                <div 
                  className="progress-fill speed" 
                  style={{ width: `${(crewmate.speed / 5) * 100}%` }}
                >
                  {crewmate.speed}/5
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="detail-actions">
          <Link to={`/edit/${crewmate.id}`} className="edit-button">Edit Crewmate</Link>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;