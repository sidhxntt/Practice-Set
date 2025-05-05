# main/views.py
from django.shortcuts import render

def home(request):
    context = {
        'title': 'Welcome to My Django App',
        'features': [
            'Modern Django Architecture',
            'REST API Support',
            'User Authentication',
            'Responsive Design'
        ]
    }
    return render(request, 'home/index.html', context)