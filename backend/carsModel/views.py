from django.http import JsonResponse
from .models import CarModel


# def car_model_list(request):
#     car_models = CarModel.objects.all().values('id', 'name', 'make_name')
#     return JsonResponse(list(car_models), safe=False)


def car_model_list(request):
    make_id = request.GET.get('make_id')
    car_models = CarModel.objects.filter(make_id=make_id).values('id', 'name')
    return JsonResponse(list(car_models), safe=False)
