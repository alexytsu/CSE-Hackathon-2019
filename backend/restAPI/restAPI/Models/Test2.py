from django.db import models
from django.conf import settings

class Test2(models.Model):
    id = models.AutoField(primary_key=True)
    input = models.CharField(max_length=50)