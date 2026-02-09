import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('all_time');

  useEffect(() => {
    loadLeaderboard();
  }, [period]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await api.getLeaderboard(period);
      setLeaderboard(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      setLoading(false);
    }
  };

  const getMedalIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  const getRankClass = (rank) => {
    if (rank === 1) return 'table-warning';
    if (rank === 2) return 'table-secondary';
    if (rank === 3) return 'table-light';
    return '';
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
      <h2 className="mb-4">Leaderboard</h2>
      
      <div className="mb-4">
        <div className="btn-group" role="group">
          <button 
            className={`btn ${period === 'daily' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setPeriod('daily')}
          >
            Daily
          </button>
          <button 
            className={`btn ${period === 'weekly' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setPeriod('weekly')}
          >
            Weekly
          </button>
          <button 
            className={`btn ${period === 'monthly' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setPeriod('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`btn ${period === 'all_time' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setPeriod('all_time')}
          >
            All Time
          </button>
        </div>
      </div>

      {leaderboard.length === 0 ? (
        <div className="alert alert-info">
          No leaderboard data available for this period. Log some activities first!
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>User</th>
                    <th>Type</th>
                    <th>Points</th>
                    <th>Activities</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map(entry => (
                    <tr key={entry.user} className={getRankClass(entry.rank)}>
                      <td className="fw-bold">{getMedalIcon(entry.rank)}</td>
                      <td>{entry.username}</td>
                      <td>
                        <span className={`badge ${entry.user_type === 'teacher' ? 'bg-primary' : 'bg-success'}`}>
                          {entry.user_type}
                        </span>
                      </td>
                      <td className="fw-bold">{entry.points}</td>
                      <td>{entry.activities_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
