from django.db import models
from django.contrib.auth.models import User


class Car(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    license_plate = models.CharField(
        max_length=7, unique=True, help_text="Format: XXX000")

    def __str__(self):
        return f"{self.make} {self.model} ({self.license_plate})"
