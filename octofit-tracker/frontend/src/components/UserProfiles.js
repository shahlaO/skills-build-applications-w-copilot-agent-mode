import React, { useState, useEffect } from 'react';
import api from '../services/api';

const UserProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const data = await api.getProfiles();
      setProfiles(data.results || data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading profiles:', error);
      setLoading(false);
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
      <h2 className="mb-4">User Profiles</h2>
      
      {profiles.length === 0 ? (
        <div className="alert alert-info">
          No profiles found. Create users in the Django admin panel first.
        </div>
      ) : (
        <div className="row">
          {profiles.map(profile => (
            <div key={profile.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{profile.username}</h5>
                  <p className="card-text">
                    <span className={`badge ${profile.user_type === 'teacher' ? 'bg-primary' : 'bg-success'}`}>
                      {profile.user_type}
                    </span>
                  </p>
                  <ul className="list-unstyled">
                    <li><strong>Fitness Level:</strong> {profile.fitness_level}</li>
                    <li><strong>Total Points:</strong> {profile.total_points}</li>
                    {profile.age && <li><strong>Age:</strong> {profile.age}</li>}
                    {profile.height && <li><strong>Height:</strong> {profile.height} cm</li>}
                    {profile.weight && <li><strong>Weight:</strong> {profile.weight} kg</li>}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfiles;
