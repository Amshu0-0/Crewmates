import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './CrewmateForm.css';

const CrewmateForm = ({ crewmate, onSubmit, isEditing = false }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [species, setSpecies] = useState('');
  const [strength, setStrength] = useState(1);
  const [intelligence, setIntelligence] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (crewmate) {
      setName(crewmate.name || '');
      setRole(crewmate.role || '');
      setSpecies(crewmate.species || '');
      setStrength(crewmate.strength || 1);
      setIntelligence(crewmate.intelligence || 1);
      setSpeed(crewmate.speed || 1);
    }
  }, [crewmate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const crewmateData = {
        name,
        role,
        species,
        strength,
        intelligence,
        speed,
      };

      if (isEditing) {
        crewmateData.updated_at = new Date();
      } else {
        crewmateData.created_at = new Date();
      }

      await onSubmit(crewmateData);
      
      if (!isEditing) {
        navigate('/gallery');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to save crewmate. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!crewmate || !crewmate.id) return;
    
    if (window.confirm('Are you sure you want to delete this crewmate?')) {
      try {
        const { error } = await supabase
          .from('crewmates')
          .delete()
          .eq('id', crewmate.id);

        if (error) throw error;
        navigate('/gallery');
      } catch (error) {
        console.error('Error deleting crewmate:', error);
        setError('Failed to delete crewmate. Please try again.');
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Crewmate Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="species">Species</label>
          <select
            id="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
          >
            <option value="">Select Species</option>
            <option value="Human">Human</option>
            <option value="Android">Android</option>
            <option value="Alien">Alien</option>
            <option value="Robot">Robot</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="Captain">Captain</option>
            <option value="Engineer">Engineer</option>
            <option value="Pilot">Pilot</option>
            <option value="Science Officer">Science Officer</option>
            <option value="Security">Security</option>
            <option value="Medic">Medic</option>
          </select>
        </div>

        <div className="form-group">
          <label>Strength</label>
          <div className="attribute-buttons">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={`strength-${value}`}
                type="button"
                className={strength === value ? 'selected' : ''}
                onClick={() => setStrength(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Intelligence</label>
          <div className="attribute-buttons">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={`intelligence-${value}`}
                type="button"
                className={intelligence === value ? 'selected' : ''}
                onClick={() => setIntelligence(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Speed</label>
          <div className="attribute-buttons">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={`speed-${value}`}
                type="button"
                className={speed === value ? 'selected' : ''}
                onClick={() => setSpeed(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="form-actions">
          <button 
            className="primary-button" 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Crewmate' : 'Create Crewmate'}
          </button>
          
          {isEditing && (
            <button
              className="delete-button"
              type="button"
              onClick={handleDelete}
            >
              Delete Crewmate
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CrewmateForm;