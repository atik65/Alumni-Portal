# Generated by Django 5.1.3 on 2025-05-04 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0007_alter_registrationrequest_interests_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registrationrequest',
            name='email',
            field=models.EmailField(max_length=254),
        ),
    ]
