# Generated by Django 3.1.7 on 2021-05-02 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0021_sduty_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sduty',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]
