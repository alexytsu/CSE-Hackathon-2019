# Generated by Django 2.2.3 on 2019-07-26 13:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restAPI', '0002_auto_20190726_1218'),
    ]

    operations = [
        migrations.CreateModel(
            name='Test2',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('input', models.CharField(max_length=50)),
            ],
        ),
    ]