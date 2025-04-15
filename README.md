# Some

## Description

Practice work for Web server programming 

## Techniques

### Frontend

- React / Next.js

### Bakcned

- Angular
- Django
+ Django REST Framework

## Setup

1.  Create Python environment 

```
python3 -m venv env		        # Creates environment
.\env\Scripts\activate	        # Runs environment
```

2. Install dependecies

```pip install -r requirements.txt``` (generated with pip freeze)

3. Install migrations
```
python manage.py makemigrations
python manage.py migrate
```

Or just (on Windows machines) run .\migrate.ps1

4. Create admin user
```
python manage.py createsuperuser
```

5. Run server
```
python manage.py runserver
```

# Documentation of work

[How it's made](documentation.md)  
[API routes](apis.md)