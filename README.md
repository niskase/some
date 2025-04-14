# Some

## Description

Practice work for Web server programming 

## Techniques

- Angular
- Django
- Python

## Setup

1.  Create Python environment 

```
python3 -m venv env		        # Creates environment
.\env\Scripts\activate	        # Runs environment
```

2. Install migrations
```
python manage.py makemigrations
python manage.py migrate
```

Or just (on Windows machines) run .\migrate.ps1

3. Create admin user
```
python manage.py createsuperuser
```

4. Run server
```
python manage.py runserver
```

# Documentation of work

[See here](documentation.md)