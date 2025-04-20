import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import CrewmateCard from '../components/CrewmateCard';
import './GalleryPage.css';

const GalleryPage = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrewmates = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('crewmates')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setCrewmates(data || []);
      } catch (error) {
        console.error('Error fetching crewmates:', error);
        setError('Failed to load crewmates. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCrewmates();
  }, []);

  if (loading) {
    return <div className="loading">Loading crewmates...</div>;
  }

  return (
    <div className="gallery-page">
      <h2>Your Crew Gallery</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {crewmates.length === 0 ? (
        <div className="empty-state">
          <p>You haven't created any crewmates yet.</p>
          <Link to="/create" className="primary-button">Create Your First Crewmate</Link>
        </div>
      ) : (
        <div className="crewmates-grid">
          {crewmates.map(crewmate => (
            <CrewmateCard key={crewmate.id} crewmate={crewmate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;