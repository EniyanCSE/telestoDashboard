from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'telestoapp/index.html')

def pages_profile(request):
    return render(request, 'telestoapp/pages-profile.html')