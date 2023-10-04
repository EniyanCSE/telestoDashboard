from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('pages-profile/', views.pages_profile, name='pages-profile'),
]