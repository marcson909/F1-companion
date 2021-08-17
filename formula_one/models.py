from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin


class Driver(models.Model):
    driver_ref = models.CharField(max_length=255)
    number = models.IntegerField()
    code = models.CharField(max_length=3)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    dob = models.DateField()
    nationality = models.CharField(max_length=255)
    url = models.CharField(max_length=255)

class League(models.Model):
    name = models.CharField(max_length=50, unique=True)
    administrator = models.ForeignKey(User,on_delete=models.CASCADE, related_name="league")
    members = models.ManyToManyField(User, through='UserLeague', related_name='all_members')
    date_created = models.DateField(auto_now_add=True)
    is_public = models.BooleanField(default=True)
    duration = models.IntegerField()
    

    def __str__(self):
        return self.name

class Team(models.Model):
    name = models.CharField(max_length=30, unique=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner_teams")
    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name='teams')
    date_created = models.DateField(auto_now_add=True)
    drivers = models.ManyToManyField(Driver, blank=True)

    def __str__(self):
        return self.name

class UserLeague(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="leagues")
  league = models.ForeignKey(League, on_delete=models.CASCADE, related_name="users")

  def __str__(self):
        return self.league.name

class UserLeagueInline(admin.TabularInline):
    model = UserLeague
    extra = 1

class UserAdmin(admin.ModelAdmin):
    inlines = (UserLeagueInline,)

class LeagueAdmin(admin.ModelAdmin):
    inlines = (UserLeagueInline,)


# class Round(models.Model):
#     num = models.IntegerField()
#     start_date = models.DateTimeField()

class Circuit(models.Model):
    circuit_ref = models.CharField(max_length=255)
    circuit_name = models.CharField(max_length=255)
    alt = models.IntegerField()
    url = models.CharField(max_length=255)
    lat = models.FloatField()
    lng = models.FloatField()
    locality = models.CharField(max_length=255)
    country = models.CharField(max_length=255)

class Constructor(models.Model):
    constructor_ref = models.CharField(max_length=255)
    constructor_name = models.CharField(max_length=255)
    nationality = models.CharField(max_length=255)
    url = models.CharField(max_length=255)

class Race(models.Model):
    year = models.IntegerField()
    round = models.IntegerField()
    race_name = models.CharField(max_length=255)
    date = models.DateField()
    time = models.DateTimeField()
    url = models.CharField(max_length=255)
    circuit = models.ForeignKey(Circuit, on_delete=models.CASCADE, related_name='races')

class Season(models.Model):
    year = models.IntegerField(primary_key=True)
    url = models.CharField(max_length=255)

class Schedule(models.Model):
    season = models.ForeignKey(Season, on_delete=models.CASCADE, related_name="events")
    race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name="events")
    

class Status(models.Model):
    status = models.CharField(max_length=255)

class Qualifying(models.Model):
    race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='qualifyings')
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name='qualifyings')
    constructor = models.ForeignKey(Constructor, on_delete=models.CASCADE, related_name='qualifyings')
    number = models.IntegerField()
    position = models.IntegerField()
    q1 = models.CharField(max_length=255)
    q2 = models.CharField(max_length=255)
    q3 = models.CharField(max_length=255)

class Result(models.Model):
    race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='results')
    number = models.IntegerField()
    position = models.IntegerField()
    position_text = models.CharField(max_length=255)
    points = models.FloatField()
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name='results')
    constructor = models.ForeignKey(Constructor, on_delete=models.CASCADE, related_name='results')
    grid = models.IntegerField()
    laps = models.IntegerField()
    status = models.ForeignKey(Status, on_delete=models.CASCADE, related_name='results')
    time = models.CharField(max_length=255)
    millseconds = models.IntegerField()
    fastest_lap = models.IntegerField()
    rank = models.IntegerField()
    fastest_lap_time = models.CharField(max_length=255)
    fastest_lap_speed = models.CharField(max_length=255)
    

class ConstructorResult(models.Model):
    race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name="constructor_results")
    constructor = models.ForeignKey(Constructor, on_delete=models.CASCADE, related_name="constructor_results")
    points = models.FloatField()
    status = models.CharField(max_length=255)

class ConstructorStanding(models.Model):
    constructor = models.ForeignKey(Constructor, on_delete=models.CASCADE, related_name="constructor_standings")
    points = models.FloatField()
    position = models.IntegerField()
    position_text = models.CharField(max_length=255)
    wins = models.IntegerField()

class DriverStanding(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name="driver_standings")
    points = models.FloatField()
    position = models.IntegerField()
    position_text = models.CharField(max_length=255)
    wins = models.IntegerField()
    constructor = models.ForeignKey(Constructor, on_delete=models.CASCADE, related_name="driver_standings")
    

class LapTime(models.Model):
    race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name="lap_times")
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name="lap_times", )
    lap = models.IntegerField()
    position = models.IntegerField()
    time = models.TimeField()
    milliseconds = models.IntegerField()

class PitStop(models.Model):
    race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name="pit_times")
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name="pit_times", )
    stop = models.IntegerField()
    lap = models.IntegerField()
    time = models.TimeField()
    duration = models.CharField(max_length=255)
    milliseconds = models.IntegerField()








