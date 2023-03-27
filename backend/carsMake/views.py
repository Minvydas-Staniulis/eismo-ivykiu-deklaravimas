from django.shortcuts import render
from django.http import JsonResponse
from .models import CarMake


def car_make_list(request):
    car_makes = CarMake.objects.all().prefetch_related('models')
    results = []
    for car_make in car_makes:
        make_data = {
            'id': car_make.id,
            'name': car_make.name,
            'models': [{'id': model.id, 'name': model.name} for model in car_make.models.all()]
        }
        results.append(make_data)
    return JsonResponse(results, safe=False)
