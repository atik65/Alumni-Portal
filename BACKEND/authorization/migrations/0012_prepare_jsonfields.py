from django.db import migrations


def fix_empty_strings_to_json(apps, schema_editor):
    UserInfo = apps.get_model('authorization', 'UserInfo')
    # Update empty strings to [] for both fields
    UserInfo.objects.filter(skills='').update(skills=[])
    UserInfo.objects.filter(interests='').update(interests=[])

class Migration(migrations.Migration):
    dependencies = [
        ('authorization', '0011_alter_userinfo_interests_alter_userinfo_skills'),
    ]
    operations = [
        migrations.RunPython(fix_empty_strings_to_json),
    ]
