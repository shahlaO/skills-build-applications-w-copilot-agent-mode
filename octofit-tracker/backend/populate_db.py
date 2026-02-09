#!/usr/bin/env python
"""Script to populate the OctoFit Tracker database with sample data"""
import os
import sys
import django
from datetime import datetime, timedelta
import random

# Set up Django
sys.path.insert(0, '/home/runner/work/skills-build-applications-w-copilot-agent-mode/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'octofit_tracker.settings')
django.setup()

from django.contrib.auth.models import User
from users.models import UserProfile
from activities.models import Activity
from teams.models import Team
from workouts.models import WorkoutSuggestion

def create_users():
    """Create sample users and profiles"""
    print("Creating users and profiles...")
    
    # Create students
    students = [
        ('alice', 'Alice', 'Johnson', 'alice@school.com', 16, 165, 55, 'beginner'),
        ('bob', 'Bob', 'Smith', 'bob@school.com', 17, 175, 70, 'intermediate'),
        ('charlie', 'Charlie', 'Brown', 'charlie@school.com', 16, 170, 65, 'beginner'),
        ('diana', 'Diana', 'Prince', 'diana@school.com', 18, 168, 60, 'advanced'),
        ('ethan', 'Ethan', 'Hunt', 'ethan@school.com', 17, 180, 75, 'intermediate'),
    ]
    
    for username, first, last, email, age, height, weight, fitness in students:
        if not User.objects.filter(username=username).exists():
            user = User.objects.create_user(
                username=username,
                email=email,
                password='student123',
                first_name=first,
                last_name=last
            )
            UserProfile.objects.create(
                user=user,
                user_type='student',
                age=age,
                height=height,
                weight=weight,
                fitness_level=fitness,
                total_points=0
            )
            print(f"  Created student: {username}")
    
    # Create teacher
    if not User.objects.filter(username='paul').exists():
        teacher = User.objects.create_user(
            username='paul',
            email='paul@school.com',
            password='teacher123',
            first_name='Paul',
            last_name='Octo'
        )
        UserProfile.objects.create(
            user=teacher,
            user_type='teacher',
            age=35,
            fitness_level='advanced',
            total_points=0
        )
        print(f"  Created teacher: paul")

def create_activities():
    """Create sample activities"""
    print("Creating activities...")
    
    students = User.objects.filter(profile__user_type='student')
    activity_types = ['running', 'walking', 'cycling', 'swimming', 'strength', 'yoga']
    
    for student in students:
        # Create 5-10 random activities for each student
        num_activities = random.randint(5, 10)
        for i in range(num_activities):
            days_ago = random.randint(0, 30)
            activity_date = datetime.now().date() - timedelta(days=days_ago)
            
            activity_type = random.choice(activity_types)
            duration = random.randint(20, 90)
            
            distance = None
            if activity_type in ['running', 'walking', 'cycling']:
                distance = round(random.uniform(2, 15), 2)
            
            calories = random.randint(100, 500)
            
            Activity.objects.create(
                user=student,
                activity_type=activity_type,
                duration=duration,
                distance=distance,
                calories_burned=calories,
                date=activity_date,
                notes=f"Great workout! Feeling good."
            )
        
        # Update user profile points
        profile = student.profile
        total_points = Activity.objects.filter(user=student).count() * 50
        profile.total_points = total_points
        profile.save()
        
        print(f"  Created {num_activities} activities for {student.username}")

def create_teams():
    """Create sample teams"""
    print("Creating teams...")
    
    students = list(User.objects.filter(profile__user_type='student'))
    teacher = User.objects.get(username='paul')
    
    teams_data = [
        ('Cardio Champions', 'Focus on cardio activities', 'Complete 500km as a team'),
        ('Strength Squad', 'Building strength together', 'Complete 100 strength sessions'),
        ('Yoga Warriors', 'Mind and body balance', 'Practice yoga 3 times per week'),
    ]
    
    for name, desc, goal in teams_data:
        if not Team.objects.filter(name=name).exists():
            team = Team.objects.create(
                name=name,
                description=desc,
                created_by=teacher,
                team_goal=goal
            )
            
            # Add random students to team
            team_members = random.sample(students, random.randint(2, 4))
            for member in team_members:
                team.members.add(member)
            
            team.update_total_points()
            print(f"  Created team: {name} with {len(team_members)} members")

def create_workouts():
    """Create sample workout suggestions"""
    print("Creating workout suggestions...")
    
    workouts = [
        {
            'title': 'Morning Jog',
            'description': 'Start your day with an energizing 30-minute jog',
            'category': 'cardio',
            'difficulty': 'beginner',
            'duration': 30,
            'instructions': '1. Warm up for 5 minutes\n2. Jog at a comfortable pace for 20 minutes\n3. Cool down with 5 minutes of walking',
            'estimated_calories': 250,
            'equipment_needed': 'Running shoes'
        },
        {
            'title': 'Full Body Strength',
            'description': 'Build strength with this comprehensive workout',
            'category': 'strength',
            'difficulty': 'intermediate',
            'duration': 45,
            'instructions': '1. Push-ups: 3 sets of 15\n2. Squats: 3 sets of 20\n3. Planks: 3 sets of 60 seconds\n4. Lunges: 3 sets of 12 per leg',
            'estimated_calories': 350,
            'equipment_needed': 'None'
        },
        {
            'title': 'Beginner Yoga Flow',
            'description': 'Gentle yoga sequence for flexibility and relaxation',
            'category': 'flexibility',
            'difficulty': 'beginner',
            'duration': 20,
            'instructions': '1. Mountain pose\n2. Forward fold\n3. Downward dog\n4. Child\'s pose\n5. Cat-cow stretches',
            'estimated_calories': 100,
            'equipment_needed': 'Yoga mat'
        },
        {
            'title': 'HIIT Blast',
            'description': 'High-intensity interval training for maximum results',
            'category': 'cardio',
            'difficulty': 'advanced',
            'duration': 25,
            'instructions': '1. Jumping jacks: 45 seconds\n2. Rest: 15 seconds\n3. Burpees: 45 seconds\n4. Rest: 15 seconds\n5. Mountain climbers: 45 seconds\nRepeat 4 times',
            'estimated_calories': 400,
            'equipment_needed': 'None'
        },
        {
            'title': 'Balance & Core',
            'description': 'Improve balance and strengthen your core',
            'category': 'balance',
            'difficulty': 'intermediate',
            'duration': 30,
            'instructions': '1. Single-leg stands: 30 seconds each\n2. Plank variations: 45 seconds each\n3. Side planks: 30 seconds each side\n4. Bird dogs: 15 reps each side',
            'estimated_calories': 200,
            'equipment_needed': 'Exercise mat'
        },
        {
            'title': 'Endurance Run',
            'description': 'Build stamina with this longer run',
            'category': 'endurance',
            'difficulty': 'advanced',
            'duration': 60,
            'instructions': '1. Warm up: 10 minutes easy jog\n2. Maintain steady pace for 45 minutes\n3. Cool down: 5 minutes walking',
            'estimated_calories': 500,
            'equipment_needed': 'Running shoes, water bottle'
        }
    ]
    
    for workout_data in workouts:
        if not WorkoutSuggestion.objects.filter(title=workout_data['title']).exists():
            WorkoutSuggestion.objects.create(**workout_data)
            print(f"  Created workout: {workout_data['title']}")

if __name__ == '__main__':
    print("Populating OctoFit Tracker database...")
    create_users()
    create_activities()
    create_teams()
    create_workouts()
    print("\nDatabase populated successfully!")
    print("\nTest credentials:")
    print("  Admin: username=admin, password=admin123")
    print("  Teacher: username=paul, password=teacher123")
    print("  Students: username=alice/bob/charlie/diana/ethan, password=student123")
