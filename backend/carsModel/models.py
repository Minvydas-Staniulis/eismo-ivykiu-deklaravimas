from django.db import models


class CarModel(models.Model):
    name = models.CharField(max_length=100)
    make = models.ForeignKey(
        'carsMake.CarMake', on_delete=models.CASCADE, related_name='models')

    def __str__(self):
        return self.name
