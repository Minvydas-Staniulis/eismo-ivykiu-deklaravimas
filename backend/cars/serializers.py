from rest_framework import serializers
from .models import Car


class CarSerializer(serializers.ModelSerializer):
    license_plate = serializers.RegexField(
        regex=r'^[A-Z]{3}\d{3}$',
        max_length=6,
        min_length=6,
        error_messages={
            'invalid': 'License plate must be in format XXX000'
        }
    )

    class Meta:
        model = Car
        fields = ['id', 'make', 'model', 'year', 'license_plate']
