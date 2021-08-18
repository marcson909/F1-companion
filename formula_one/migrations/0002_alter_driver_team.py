# Generated by Django 3.2.6 on 2021-08-18 05:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('formula_one', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='driver',
            name='team',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='drivers', to='formula_one.team'),
        ),
    ]