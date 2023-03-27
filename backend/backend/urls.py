from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter

from cars.views import car_list, car_detail, car_create, car_update, car_delete
from carsMake.views import car_make_list
from carsModel.views import car_model_list

router = DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),

    path('api/cars/', car_list, name='car_list'),
    path('api/cars/<int:pk>/', car_detail, name='car_detail'),
    path('api/cars/create/', car_create, name='car_create'),
    path('api/cars/<int:pk>/update/', car_update, name='car_update'),
    path('api/cars/<int:pk>/delete/', car_delete, name='car_delete'),

    # cars make/model API
    path('api/car-makes/', car_make_list, name='car_make_list'),
    path('api/car-model/<int:make_id>/', car_model_list, name='car_model_list')
]
