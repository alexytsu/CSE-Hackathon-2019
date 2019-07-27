from django.db import models
from django.conf import settings

class Recipe(models.Model):
    id = models.AutoField(primary_key=True)
    Meal = models.CharField(max_length=50)
    Category = models.CharField(max_length=50)
    Cuisine = models.CharField(max_length=50)  
    Instructions = models.TextField()
    Ingredients = models.TextField()
    Perishable = models.TextField()