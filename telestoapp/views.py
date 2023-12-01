from django.shortcuts import render
# Create your views here.

# def my_view(request):
#     csv_file_url = settings.MEDIA_URL + 'well_level_history_matching_and_prediction.csv'
#     return render(request, 'my_template.html', {'csv_file_url': csv_file_url})

def index(request):
    return render(request, 'telestoapp/index.html')

def pages_profile(request):
    return render(request, 'telestoapp/pages-profile.html')

def Hi_Analysis(request):
    return render(request,'telestoapp/Hi_Analysis.html')

def Adca(request):
    return render(request,'telestoapp/ADCA.html')

def Mat_Balance(request):
    return render(request,'telestoapp/Mat_Balance.html')

def flowUnit(request):
    return render(request,'telestoapp/flowUnit.html')

def FractionalFlow(request):
    return render(request, 'telestoapp/FractionalFlow.html')

def plots(request):
    return render(request,'telestoapp/plots.html')

def plotshistory(request):
    return render(request,'telestoapp/HistroySimulateVal.html')

def contact(request):
    return render(request,'telestoapp/contact.html')

def SatMap(request):
    return render(request,'telestoapp/SatMap.html')

def mL_model(request):
    return render(request,'telestoapp/ML_model.html')

def pages_profile(request):
    return render(request,'telestoapp/pages-profile.html')

def pages_faq(request):
    return render(request,'telestoapp/pages-faq.html')

def auth_lock_screen(request):
    return render(request,'telestoapp/auth-lock-screen.html')

def auth_logout_2(request):
    return render(request,'telestoapp/auth-logout-2.html')

def auth_login(request):
    return render(request,'telestoapp/auth-login-2.html')

def auth_register_2(request):
    return render(request,'telestoapp/auth-register-2.html')

def indexGas(request):
    return render(request,'telestoapp/index_gas.html')

def indexWater(request):
    return render(request,'telestoapp/index_water.html')

def indexOil(request):
    return render(request,'telestoapp/oil_plotly.html')