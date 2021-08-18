from django.contrib import admin
from .models import Constructor, DriverAdmin, League, LeagueAdmin,Team, TeamAdmin, TeamDriver, UserAdmin, UserLeague, Driver
from django.contrib.auth.models import User

# Register your models here.
# admin.site.register(User, UserAdmin)
admin.site.register(League, LeagueAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Driver, DriverAdmin)
admin.site.register(Constructor)
admin.site.register(UserLeague)
admin.site.register(TeamDriver)
