import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import CrewmateForm from '../components/CrewmateForm';
import './EditPage.css';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

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
        console.error('Error fetching crewmate for editing:', error);
        setError('Failed to load crewmate. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCrewmate();
    }
  }, [id, navigate]);

  const handleUpdateCrewmate = async (updatedData) => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .update(updatedData)
        .eq('id', id)
        .select();
        
      if (error) throw error;
      
      setCrewmate(data[0]);
      navigate(`/crewmate/${id}`);
      
      return data;
    } catch (error) {
      console.error('Error updating crewmate:', error);
      setSubmitError('Failed to update crewmate. Please try again.');
      throw error;
    }
  };

  if (loading) {
    return <div className="loading">Loading crewmate data...</div>;
  }

  if (error || !crewmate) {
    return (
      <div className="error-container">
        <p>{error || 'Crewmate not found'}</p>
        <Link to="/gallery" className="primary-button">Back to Gallery</Link>
      </div>
    );
  }

  return (
    <div className="edit-page">
      <div className="edit-header">
        <h2>Edit Crewmate: {crewmate.name}</h2>
        <Link to={`/crewmate/${id}`} className="back-link">Back to Details</Link>
      </div>
      
      {submitError && <div className="error-message">{submitError}</div>}
      
      <CrewmateForm 
        crewmate={crewmate} 
        onSubmit={handleUpdateCrewmate} 
        isEditing={true} 
      />
    </div>
  );
};

export default EditPage;