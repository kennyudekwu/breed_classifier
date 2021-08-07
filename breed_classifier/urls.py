from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from api import views
urlpatterns = [
    # path('predict', views.result, name="inferece"),
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('api/', include('api.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
