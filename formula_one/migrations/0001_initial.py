# Generated by Django 3.2.6 on 2021-08-18 05:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Circuit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('circuit_ref', models.CharField(max_length=255)),
                ('circuit_name', models.CharField(max_length=255)),
                ('alt', models.IntegerField()),
                ('url', models.CharField(max_length=255)),
                ('lat', models.FloatField()),
                ('lng', models.FloatField()),
                ('locality', models.CharField(max_length=255)),
                ('country', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Constructor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('constructor_ref', models.CharField(max_length=255)),
                ('constructor_name', models.CharField(max_length=255)),
                ('nationality', models.CharField(max_length=255)),
                ('url', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('driver_ref', models.CharField(max_length=255)),
                ('number', models.CharField(max_length=255)),
                ('code', models.CharField(max_length=3)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('dob', models.CharField(max_length=255)),
                ('nationality', models.CharField(max_length=255)),
                ('url', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='League',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('is_public', models.BooleanField(default=True)),
                ('duration', models.IntegerField()),
                ('administrator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='league', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Race',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('round', models.IntegerField()),
                ('race_name', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('time', models.DateTimeField()),
                ('url', models.CharField(max_length=255)),
                ('circuit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='races', to='formula_one.circuit')),
            ],
        ),
        migrations.CreateModel(
            name='Season',
            fields=[
                ('year', models.IntegerField(primary_key=True, serialize=False)),
                ('url', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('league', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teams', to='formula_one.league')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owner_teams', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserLeague',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('league', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users', to='formula_one.league')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='leagues', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TeamDriver',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teams', to='formula_one.driver')),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='all_drivers', to='formula_one.team')),
            ],
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('race', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='events', to='formula_one.race')),
                ('season', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='events', to='formula_one.season')),
            ],
        ),
        migrations.CreateModel(
            name='Result',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('position', models.IntegerField()),
                ('position_text', models.CharField(max_length=255)),
                ('points', models.FloatField()),
                ('grid', models.IntegerField()),
                ('laps', models.IntegerField()),
                ('time', models.CharField(max_length=255)),
                ('millseconds', models.IntegerField()),
                ('fastest_lap', models.IntegerField()),
                ('rank', models.IntegerField()),
                ('fastest_lap_time', models.CharField(max_length=255)),
                ('fastest_lap_speed', models.CharField(max_length=255)),
                ('constructor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='results', to='formula_one.constructor')),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='results', to='formula_one.driver')),
                ('race', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='results', to='formula_one.race')),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='results', to='formula_one.status')),
            ],
        ),
        migrations.CreateModel(
            name='Qualifying',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('position', models.IntegerField()),
                ('q1', models.CharField(max_length=255)),
                ('q2', models.CharField(max_length=255)),
                ('q3', models.CharField(max_length=255)),
                ('constructor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='qualifyings', to='formula_one.constructor')),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='qualifyings', to='formula_one.driver')),
                ('race', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='qualifyings', to='formula_one.race')),
            ],
        ),
        migrations.CreateModel(
            name='PitStop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stop', models.IntegerField()),
                ('lap', models.IntegerField()),
                ('time', models.TimeField()),
                ('duration', models.CharField(max_length=255)),
                ('milliseconds', models.IntegerField()),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pit_times', to='formula_one.driver')),
                ('race', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pit_times', to='formula_one.race')),
            ],
        ),
        migrations.AddField(
            model_name='league',
            name='members',
            field=models.ManyToManyField(related_name='all_members', through='formula_one.UserLeague', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='LapTime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lap', models.IntegerField()),
                ('position', models.IntegerField()),
                ('time', models.TimeField()),
                ('milliseconds', models.IntegerField()),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lap_times', to='formula_one.driver')),
                ('race', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lap_times', to='formula_one.race')),
            ],
        ),
        migrations.CreateModel(
            name='DriverStanding',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('points', models.FloatField()),
                ('position', models.IntegerField()),
                ('position_text', models.CharField(max_length=255)),
                ('wins', models.IntegerField()),
                ('constructor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='driver_standings', to='formula_one.constructor')),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='driver_standings', to='formula_one.driver')),
            ],
        ),
        migrations.AddField(
            model_name='driver',
            name='team',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='drivers', to='formula_one.team'),
        ),
        migrations.CreateModel(
            name='ConstructorStanding',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('points', models.FloatField()),
                ('position', models.IntegerField()),
                ('position_text', models.CharField(max_length=255)),
                ('wins', models.IntegerField()),
                ('constructor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='constructor_standings', to='formula_one.constructor')),
            ],
        ),
        migrations.CreateModel(
            name='ConstructorResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('points', models.FloatField()),
                ('status', models.CharField(max_length=255)),
                ('constructor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='constructor_results', to='formula_one.constructor')),
                ('race', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='constructor_results', to='formula_one.race')),
            ],
        ),
    ]
