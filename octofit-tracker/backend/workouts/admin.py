from django.contrib import admin
from .models import WorkoutSuggestion, UserWorkoutSuggestion

# Register your models here.

@admin.register(WorkoutSuggestion)
class WorkoutSuggestionAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'difficulty', 'duration', 'created_at']
    list_filter = ['category', 'difficulty']
    search_fields = ['title', 'description']


@admin.register(UserWorkoutSuggestion)
class UserWorkoutSuggestionAdmin(admin.ModelAdmin):
    list_display = ['user', 'workout', 'suggested_date', 'completed', 'rating']
    list_filter = ['completed', 'suggested_date']
    search_fields = ['user__username', 'workout__title']

