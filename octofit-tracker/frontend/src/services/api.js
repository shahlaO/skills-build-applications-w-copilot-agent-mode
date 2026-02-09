const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = {
  // Users
  getUsers: () => fetch(`${API_BASE_URL}/users/`).then(res => res.json()),
  getUser: (id) => fetch(`${API_BASE_URL}/users/${id}/`).then(res => res.json()),
  
  // User Profiles
  getProfiles: () => fetch(`${API_BASE_URL}/profiles/`).then(res => res.json()),
  getProfile: (id) => fetch(`${API_BASE_URL}/profiles/${id}/`).then(res => res.json()),
  createProfile: (data) => fetch(`${API_BASE_URL}/profiles/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  updateProfile: (id, data) => fetch(`${API_BASE_URL}/profiles/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  
  // Activities
  getActivities: () => fetch(`${API_BASE_URL}/activities/`).then(res => res.json()),
  getActivity: (id) => fetch(`${API_BASE_URL}/activities/${id}/`).then(res => res.json()),
  createActivity: (data) => fetch(`${API_BASE_URL}/activities/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  getUserActivities: (userId) => fetch(`${API_BASE_URL}/activities/my_activities/?user_id=${userId}`).then(res => res.json()),
  
  // Teams
  getTeams: () => fetch(`${API_BASE_URL}/teams/`).then(res => res.json()),
  getTeam: (id) => fetch(`${API_BASE_URL}/teams/${id}/`).then(res => res.json()),
  createTeam: (data) => fetch(`${API_BASE_URL}/teams/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  addTeamMember: (teamId, userId) => fetch(`${API_BASE_URL}/teams/${teamId}/add_member/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId })
  }).then(res => res.json()),
  removeTeamMember: (teamId, userId) => fetch(`${API_BASE_URL}/teams/${teamId}/remove_member/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId })
  }).then(res => res.json()),
  
  // Leaderboard
  getLeaderboard: (period = 'all_time') => fetch(`${API_BASE_URL}/leaderboard/current/?period=${period}`).then(res => res.json()),
  
  // Workouts
  getWorkouts: () => fetch(`${API_BASE_URL}/workouts/`).then(res => res.json()),
  getPersonalizedWorkouts: (userId) => fetch(`${API_BASE_URL}/workouts/personalized/?user_id=${userId}`).then(res => res.json()),
  getUserWorkouts: (userId) => fetch(`${API_BASE_URL}/user-workouts/my_suggestions/?user_id=${userId}`).then(res => res.json()),
  createUserWorkout: (data) => fetch(`${API_BASE_URL}/user-workouts/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
};

export default api;
