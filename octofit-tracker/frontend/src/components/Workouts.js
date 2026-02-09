import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const data = await api.getWorkouts();
      setWorkouts(data.results || data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading workouts:', error);
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'danger';
      default: return 'secondary';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'cardio': return '🏃';
      case 'strength': return '💪';
      case 'flexibility': return '🧘';
      case 'balance': return '⚖️';
      case 'endurance': return '🔥';
      default: return '🏋️';
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Workout Suggestions</h2>
      
      {workouts.length === 0 ? (
        <div className="alert alert-info">
          No workout suggestions available yet. Please add workouts through the Django admin panel.
        </div>
      ) : (
        <div className="row">
          {workouts.map(workout => (
            <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title">
                      {getCategoryIcon(workout.category)} {workout.title}
                    </h5>
                    <span className={`badge bg-${getDifficultyColor(workout.difficulty)}`}>
                      {workout.difficulty}
                    </span>
                  </div>
                  <h6 className="card-subtitle mb-3 text-muted">
                    {workout.category} • {workout.duration} min
                  </h6>
                  <p className="card-text">{workout.description}</p>
                  
                  {workout.equipment_needed && (
                    <p className="card-text">
                      <small><strong>Equipment:</strong> {workout.equipment_needed}</small>
                    </p>
                  )}
                  
                  {workout.estimated_calories && (
                    <p className="card-text">
                      <small><strong>Est. Calories:</strong> {workout.estimated_calories}</small>
                    </p>
                  )}
                  
                  <div className="mt-3">
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      data-bs-toggle="collapse"
                      data-bs-target={`#instructions-${workout.id}`}
                    >
                      View Instructions
                    </button>
                  </div>
                  
                  <div className="collapse mt-3" id={`instructions-${workout.id}`}>
                    <div className="card card-body bg-light">
                      <small>{workout.instructions}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workouts;
