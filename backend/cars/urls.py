from django.urls import path
from . import views

urlpatterns = [
    path('cars/', views.login_api),
    path('cars/<int:pk>/', views.get_user_data),
    path('register/', views.register_api),
]
