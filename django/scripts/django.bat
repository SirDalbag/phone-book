cd ..

python -m venv venv
call venv/scripts/activate

pip install -r requirements.txt

pip install django djangorestframework django-cors-headers pillow
pip freeze > requirements.txt

django-admin startproject django_settings .
django-admin startapp django_app

python manage.py makemigrations
python manage.py migrate

python manage.py runserver

cmd