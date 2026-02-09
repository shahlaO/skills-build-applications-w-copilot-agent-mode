import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto text-center">
          <img 
            src="/octofitapp-small.png" 
            alt="OctoFit Tracker" 
            className="mb-4"
            style={{ maxWidth: '200px' }}
          />
          <h1 className="display-4 mb-3">Welcome to OctoFit Tracker</h1>
          <p className="lead mb-4">
            Track your fitness journey, compete with friends, and achieve your goals!
          </p>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-person-circle fs-1 text-primary"></i>
              <h5 className="card-title mt-3">User Profiles</h5>
              <p className="card-text">
                Create and manage your fitness profile. Track your progress and stats.
              </p>
              <Link to="/profiles" className="btn btn-primary">View Profiles</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-activity fs-1 text-success"></i>
              <h5 className="card-title mt-3">Activity Tracking</h5>
              <p className="card-text">
                Log your workouts and monitor your fitness activities over time.
              </p>
              <Link to="/activities" className="btn btn-success">Track Activities</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-people-fill fs-1 text-info"></i>
              <h5 className="card-title mt-3">Teams</h5>
              <p className="card-text">
                Create teams, collaborate on goals, and achieve more together.
              </p>
              <Link to="/teams" className="btn btn-info">Manage Teams</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-3">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-trophy-fill fs-1 text-warning"></i>
              <h5 className="card-title mt-3">Leaderboard</h5>
              <p className="card-text">
                Compete with others and see where you rank in the community.
              </p>
              <Link to="/leaderboard" className="btn btn-warning">View Rankings</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-heart-pulse-fill fs-1 text-danger"></i>
              <h5 className="card-title mt-3">Workout Suggestions</h5>
              <p className="card-text">
                Get personalized workout recommendations based on your fitness level.
              </p>
              <Link to="/workouts" className="btn btn-danger">Get Suggestions</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
