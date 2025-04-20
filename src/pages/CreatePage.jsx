import { useState } from 'react';
import { supabase } from '../supabaseClient';
import CrewmateForm from '../components/CrewmateForm';
import './CreatePage.css';

const CreatePage = () => {
  const [submitError, setSubmitError] = useState(null);
  
  const handleCreateCrewmate = async (crewmateData) => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .insert([crewmateData])
        .select();
        
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error creating crewmate:', error);
      setSubmitError('Failed to create crewmate. Please try again.');
      throw error;
    }
  };

  return (
    <div className="create-page">
      <h2>Create New Crewmate</h2>
      <p>Fill out the form below to add a new member to your crew.</p>
      
      {submitError && <div className="error-message">{submitError}</div>}
      
      <CrewmateForm onSubmit={handleCreateCrewmate} />
    </div>
  );
};

export default CreatePage;