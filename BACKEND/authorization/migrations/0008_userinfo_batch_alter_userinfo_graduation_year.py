# Generated by Django 5.1.3 on 2025-04-29 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0007_remove_userinfo_batch'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinfo',
            name='batch',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='graduation_year',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]
