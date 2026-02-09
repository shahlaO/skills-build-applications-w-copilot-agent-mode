from django.contrib import admin
from .models import Activity

# Register your models here.

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['user', 'activity_type', 'duration', 'points_earned', 'date', 'created_at']
    list_filter = ['activity_type', 'date']
    search_fields = ['user__username']
    date_hierarchy = 'date'

