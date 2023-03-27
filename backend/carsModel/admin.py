from django.contrib import admin
from .models import CarModel


class CarModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'make')


admin.site.register(CarModel, CarModelAdmin)
