import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img 
            src="/octofitapp-small.png" 
            alt="OctoFit" 
            height="30" 
            className="d-inline-block align-text-top me-2"
          />
          OctoFit Tracker
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">Profiles</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/activities">Activities</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/teams">Teams</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/workouts">Workouts</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
