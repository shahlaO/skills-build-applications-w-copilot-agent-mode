# OctoFit Tracker - Complete Implementation

A comprehensive fitness tracking application for students and gym teachers at Mergington High School.

## Overview

OctoFit Tracker is a full-stack web application that enables fitness tracking, team collaboration, competitive leaderboards, and personalized workout suggestions.

## Features Implemented

### 1. User Profiles
- **Student profiles** with fitness levels (beginner, intermediate, advanced)
- **Teacher profiles** for gym instructors
- Profile information including age, height, weight, and total points
- Points accumulation system based on activity completion

### 2. Activity Tracking
- Log various activity types: running, walking, cycling, swimming, strength training, yoga, sports
- Track duration, distance, calories burned
- Automatic points calculation (1 point per minute of activity)
- Activity history with detailed information
- Easy-to-use form for logging new activities

### 3. Team Creation and Management
- Create teams with captains and team goals
- Add/remove team members
- Track team total points (aggregate of all member activities)
- View team member lists
- Multiple teams with different fitness focuses

### 4. Competitive Leaderboard
- Multiple time periods: Daily, Weekly, Monthly, All-Time
- Medal system (🥇🥈🥉) for top 3 performers
- Displays rank, username, user type, points, and activity count
- Automatic calculation and ranking updates
- Color-coded rankings for visual distinction

### 5. Personalized Workout Suggestions
- Multiple workout categories: cardio, strength, flexibility, balance, endurance
- Difficulty levels: beginner, intermediate, advanced
- Detailed workout information including:
  - Duration estimates
  - Equipment requirements
  - Calorie burn estimates
  - Step-by-step instructions
- Personalized recommendations based on user fitness level

## Technology Stack

### Backend
- **Framework**: Django 4.1.7 with Django REST Framework 3.14.0
- **Database**: SQLite (easily replaceable with MongoDB using djongo)
- **API**: RESTful API with comprehensive endpoints
- **Authentication**: Django built-in with django-allauth
- **CORS**: Configured for React frontend

### Frontend
- **Framework**: React.js (Create React App)
- **Styling**: Bootstrap 5 with Bootstrap Icons
- **Routing**: React Router v6
- **API Integration**: Fetch API with custom service layer

## Project Structure

```
octofit-tracker/
├── backend/
│   ├── venv/                      # Python virtual environment
│   ├── octofit_tracker/           # Django project settings
│   ├── users/                     # User profile app
│   ├── activities/                # Activity tracking app
│   ├── teams/                     # Team management app
│   ├── leaderboard/              # Leaderboard app
│   ├── workouts/                 # Workout suggestions app
│   ├── db.sqlite3                # SQLite database
│   ├── manage.py                 # Django management script
│   ├── populate_db.py            # Sample data population script
│   └── requirements.txt          # Python dependencies
└── frontend/
    ├── public/                    # Static assets
    ├── src/
    │   ├── components/           # React components
    │   │   ├── Home.js
    │   │   ├── Navigation.js
    │   │   ├── UserProfiles.js
    │   │   ├── Activities.js
    │   │   ├── Teams.js
    │   │   ├── Leaderboard.js
    │   │   └── Workouts.js
    │   ├── services/
    │   │   └── api.js            # API service layer
    │   ├── App.js                # Main application component
    │   └── index.js              # Application entry point
    └── package.json              # Node dependencies
```

## API Endpoints

### Users & Profiles
- `GET /api/users/` - List all users
- `GET /api/profiles/` - List all user profiles
- `GET /api/profiles/{id}/` - Get specific profile
- `POST /api/profiles/{id}/update_points/` - Update user points

### Activities
- `GET /api/activities/` - List all activities
- `POST /api/activities/` - Create new activity
- `GET /api/activities/my_activities/?user_id={id}` - Get user's activities

### Teams
- `GET /api/teams/` - List all teams
- `POST /api/teams/` - Create new team
- `POST /api/teams/{id}/add_member/` - Add team member
- `POST /api/teams/{id}/remove_member/` - Remove team member
- `POST /api/teams/{id}/refresh_points/` - Refresh team points

### Leaderboard
- `GET /api/leaderboard/current/?period={period}` - Get leaderboard (daily, weekly, monthly, all_time)

### Workouts
- `GET /api/workouts/` - List all workout suggestions
- `GET /api/workouts/personalized/?user_id={id}` - Get personalized workouts
- `GET /api/user-workouts/my_suggestions/?user_id={id}` - Get user's workout assignments

## Setup and Installation

### Prerequisites
- Python 3.12+
- Node.js 24+
- npm 11+

### Backend Setup

1. Navigate to the backend directory:
```bash
cd octofit-tracker/backend
```

2. Create and activate virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create superuser (for admin access):
```bash
python manage.py createsuperuser
```

6. Populate database with sample data:
```bash
python populate_db.py
```

7. Start the development server:
```bash
python manage.py runserver 0.0.0.0:8000
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd octofit-tracker/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Sample Data

The `populate_db.py` script creates sample data including:

### Users
- **Students**: alice, bob, charlie, diana, ethan (password: student123)
- **Teacher**: paul (password: teacher123)
- **Admin**: admin (password: admin123)

### Activities
- 6-10 random activities per student with various types
- Activities spread across the last 30 days

### Teams
- Cardio Champions - Focus on cardio activities
- Strength Squad - Building strength together
- Yoga Warriors - Mind and body balance

### Workouts
- 6 pre-configured workout suggestions across all difficulty levels

## Testing

### Backend API Testing
Use curl to test API endpoints:
```bash
# Get all profiles
curl http://localhost:8000/api/profiles/

# Get leaderboard
curl http://localhost:8000/api/leaderboard/current/?period=all_time

# Get activities
curl http://localhost:8000/api/activities/
```

### Frontend Testing
1. Open `http://localhost:3000` in your browser
2. Navigate through all sections using the navigation bar
3. Test creating new activities, viewing profiles, checking leaderboards

## Configuration

### Backend (Django)
- Settings are in `octofit_tracker/settings.py`
- CORS is configured to allow frontend at port 3000
- Codespace support is built-in (auto-detects CODESPACE_NAME environment variable)

### Frontend (React)
- API base URL can be configured via `REACT_APP_API_URL` environment variable
- Defaults to `http://localhost:8000/api`

## Security Features
- CSRF protection enabled
- CORS properly configured
- Password validators in place
- Input sanitization in forms

## Future Enhancements
- User authentication and session management
- MongoDB integration for better scalability
- Real-time notifications for team activities
- Workout scheduling and reminders
- Advanced analytics and progress charts
- Mobile responsive improvements
- Achievement badges system
- Social features (comments, likes on activities)

## License
MIT License

## Contributors
Built with GitHub Copilot Agent Mode
