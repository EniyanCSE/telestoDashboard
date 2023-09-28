from django.shortcuts import render
# from django.shortcuts import render
import plotly.graph_objects as go

def index(request):
    return render(request, 'telestoLiveServer/index.html')
