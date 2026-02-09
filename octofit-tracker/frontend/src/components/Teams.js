import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    created_by: '',
    team_goal: ''
  });

  useEffect(() => {
    loadTeams();
    loadUsers();
  }, []);

  const loadTeams = async () => {
    try {
      const data = await api.getTeams();
      setTeams(data.results || data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading teams:', error);
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data.results || data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createTeam(formData);
      setShowForm(false);
      setFormData({
        name: '',
        description: '',
        created_by: '',
        team_goal: ''
      });
      loadTeams();
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Failed to create team');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Teams</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create Team'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Create New Team</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Team Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-control" 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Team Captain</label>
                <select 
                  className="form-select" 
                  name="created_by" 
                  value={formData.created_by}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Captain</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Team Goal</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="team_goal"
                  value={formData.team_goal}
                  onChange={handleChange}
                  placeholder="e.g., Complete 1000 km as a team"
                />
              </div>
              <button type="submit" className="btn btn-success">Create Team</button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {teams.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">
              No teams created yet. Create the first team!
            </div>
          </div>
        ) : (
          teams.map(team => (
            <div key={team.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Captain: {team.created_by_username}
                  </h6>
                  {team.description && (
                    <p className="card-text">{team.description}</p>
                  )}
                  <ul className="list-unstyled">
                    <li><strong>Members:</strong> {team.member_count}</li>
                    <li><strong>Total Points:</strong> {team.total_points}</li>
                    {team.team_goal && <li><strong>Goal:</strong> {team.team_goal}</li>}
                  </ul>
                  {team.members_list && team.members_list.length > 0 && (
                    <div className="mt-3">
                      <small className="text-muted">Members:</small>
                      <div className="mt-1">
                        {team.members_list.map(member => (
                          <span key={member.id} className="badge bg-secondary me-1">
                            {member.username}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Teams;
