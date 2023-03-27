from django.http import JsonResponse
from .models import CarModel


def car_model_list(request):
    car_models = CarModel.objects.all().values('id', 'name', 'make__name')
    return JsonResponse(list(car_models), safe=False)
