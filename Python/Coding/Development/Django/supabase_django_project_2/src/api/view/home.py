from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the API! Visit /api/ or /admin/")

__all__ = ['home']