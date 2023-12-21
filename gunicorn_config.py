workers = 4
bind = "0.0.0.0:8000"
chdir = "/app/" # working directory - root directory
module = "breed_classifier.wsgi:application"