FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE=1

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED=1 

# create root directory for our project in the container
RUN mkdir /app

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app/

# upgrade pip
RUN pip install --upgrade pip

# Allows docker to cache installed dependencies between builds
RUN pip install --no-cache-dir -r requirements.txt

# NOTE: run python manage.py makemigrations && python manage.py migrate && python manage.py collectstatic when code repo is modified