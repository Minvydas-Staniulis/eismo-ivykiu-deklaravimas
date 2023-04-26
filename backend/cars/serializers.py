from rest_framework import serializers
from .models import Car


class CarSerializer(serializers.ModelSerializer):
    license_plate = serializers.RegexField(
        regex=r'^(?=.*[0-9]|EV[0-9]{4})[A-Z0-9]{1,6}$',
        max_length=6,
        min_length=1,
        error_messages={
            'invalid': 'License plate must be in format XXX000'
        }
    )

    class Meta:
        model = Car
        fields = ['id', 'make', 'model', 'year', 'license_plate']
