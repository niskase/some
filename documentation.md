# Documentation 

## Django server initializing

```
pip install django                      # Installed Django server
django-admin startproject socialmedia   # Started "socialmedia" named project
python manage.py startapp posts         # Started "posts" named app under project (for posts)
```

## Creating Post -model

Then I open settings.py and added "posts" to installed apps

```python
INSTALLED_APPS = [
    ...,
    'posts',
]
```

which enables this posts app to main project

Also created [Post](socialmedia/posts/models.py) -model!

Then I just added the model to admin panel by registering the model in [admin.py](socialmedia/posts/admin.py)

Now post model is done and it works:

![Post in Django Admin](screenshots/1_post_works.png)

## Installing REST framework

First step: ```pip install djangorestframework```

Then added that to installed apps in settings.py:

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
]
```

- Then I created [serializers.py](socialmedia/posts/serializers.py) for posts
- And API views to [views.py](socialmedia/posts/views.py)
- And of course [urls.py](socialmedia/posts/urls.py) where are the Post API urls
- Then I also needed to include these post urls to [main urls.py file](socialmedia/socialmedia/urls.py)

Now I am able to get posts with Postman:
![Postman](screenshots/2_postman_get_posts.png)