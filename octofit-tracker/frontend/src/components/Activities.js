import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    user: '',
    activity_type: 'running',
    duration: '',
    distance: '',
    calories_burned: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadActivities();
    loadUsers();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await api.getActivities();
      setActivities(data.results || data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading activities:', error);
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
      await api.createActivity(formData);
      setShowForm(false);
      setFormData({
        user: '',
        activity_type: 'running',
        duration: '',
        distance: '',
        calories_burned: '',
        notes: '',
        date: new Date().toISOString().split('T')[0]
      });
      loadActivities();
    } catch (error) {
      console.error('Error creating activity:', error);
      alert('Failed to create activity');
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
        <h2>Activity Tracking</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Log Activity'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Log New Activity</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">User</label>
                <select 
                  className="form-select" 
                  name="user" 
                  value={formData.user}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Activity Type</label>
                <select 
                  className="form-select" 
                  name="activity_type" 
                  value={formData.activity_type}
                  onChange={handleChange}
                >
                  <option value="running">Running</option>
                  <option value="walking">Walking</option>
                  <option value="cycling">Cycling</option>
                  <option value="swimming">Swimming</option>
                  <option value="strength">Strength Training</option>
                  <option value="yoga">Yoga</option>
                  <option value="sports">Sports</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Duration (minutes)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Distance (km)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    className="form-control" 
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Calories Burned</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="calories_burned"
                    value={formData.calories_burned}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea 
                  className="form-control" 
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success">Submit Activity</button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {activities.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">
              No activities logged yet. Start by logging your first activity!
            </div>
          </div>
        ) : (
          activities.map(activity => (
            <div key={activity.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{activity.activity_type}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {activity.username} - {activity.date}
                  </h6>
                  <ul className="list-unstyled">
                    <li><strong>Duration:</strong> {activity.duration} min</li>
                    {activity.distance && <li><strong>Distance:</strong> {activity.distance} km</li>}
                    {activity.calories_burned && <li><strong>Calories:</strong> {activity.calories_burned}</li>}
                    <li><strong>Points:</strong> {activity.points_earned}</li>
                  </ul>
                  {activity.notes && (
                    <p className="card-text"><small>{activity.notes}</small></p>
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

export default Activities;
