from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('pages-profile/', views.pages_profile, name='pages-profile'),
    path('Hi_Analysis/',views.Hi_Analysis,name='Hi_Analysis'),
    path('ADCA/',views.Adca,name='ADCA'),
    path('Mat_Balance/',views.Mat_Balance,name='Mat_Balance'),
    path('flowUnit/',views.flowUnit,name='flowUnit'),
    path('FractionalFlow/',views.FractionalFlow,name='FractionalFlow'),
    path('plots/',views.plots,name='plots'),
    path('plotshistory/',views.plotshistory,name='plotshistory'),
    path('contact/',views.contact,name='contact'),
    path('SatMap/',views.SatMap,name='SatMap'),
    path('ML_model/',views.mL_model,name='mL_model'),
    path('pages_profile/',views.pages_profile,name='pages_profile'),
    path('pages_faq/',views.pages_faq,name='pages_faq'),
    path('auth_lock_screen/',views.auth_lock_screen,name='auth_lock_screen'),
    path('auth_logout_2',views.auth_logout_2,name='auth_logout_2'),
    path('auth_login_2/',views.auth_login,name='auth_login'),
    path("auth_register_2/",views.auth_register_2,name="auth_register"),
    path('indexGas/',views.indexGas,name="indexGas"),
    path('indexWater/',views.indexWater,name="indexWater"),
    path('indexOil/',views.indexOil,name='indexOil'),
]