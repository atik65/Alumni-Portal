# Generated by Django 5.1.3 on 2025-05-03 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0009_alter_userinfo_facebook'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinfo',
            name='experience',
            field=models.TextField(blank=True, default='', null=True),
        ),
    ]
