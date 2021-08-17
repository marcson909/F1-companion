from django.contrib import admin
from .models import League, LeagueAdmin,Team, UserAdmin, UserLeague
from django.contrib.auth.models import User

# Register your models here.
# admin.site.register(User, UserAdmin)
admin.site.register(League, LeagueAdmin)
admin.site.register(Team)
admin.site.register(UserLeague)
