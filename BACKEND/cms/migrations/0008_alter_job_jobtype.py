# Generated by Django 5.1.3 on 2024-11-24 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0007_alter_job_jobtype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='jobType',
            field=models.CharField(choices=[('Full-Time', 'Full-Time'), ('Part-Time', 'Part-Time'), ('Remote', 'Remote'), ('Intern', 'Intern')], default='Full-Time', max_length=50),
        ),
    ]
