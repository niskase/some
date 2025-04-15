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

### Implementing POST request

I added this to views:
```python
elif request.method == 'POST':
    serializer = PostSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

And tried this in Postman:
![Postman POST request](screenshots/3_post_request.png)

### Implementing Users

I stopped the server and wrote command: ```python manage.py startapp users```. Now I have users-app.

I created Profile model:

```python
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField(User, blank=True, related_name="friend_profiles")
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username
```

The fields:
| Name       | Description                     |
| ---------- | ------------------------------- |
| user       | Relation to User class          |
| friends    | Related to many User classes    |
| first_name | User's first name               |
| last_name  | User's last name                |

I also created [serializers](socialmedia/users/serializers.py) for users. I put the model to users' admin.py with ```admin.site.register(Profile)```

Then I just put this users to INSTALLED_APPS

Then I ran migrations and tada, they're in Django Admin:
![Users](screenshots/4_users.png)

But I don't want to create profiles manually, I want them work automatically. So, there is a solution called Signals.

### Implementing signals to users

1. I created a file [signals.py](socialmedia/users/signals.py) under users directory. 
2. I added signals to [apps.py](socialmedia/users/apps.py)

It's simple as that:
```python
def ready(self):
    import users.signals  # Load signals.py
```

Then test run: I created a user called "uusi":

![It just works](screenshots/5_automatic_user_profile_creation.png)

Looks like it works.

The next step will be user registration using API.

### Implementing registration

I created a [RegisterView](socialmedia/users/views.py):

```python
User = get_user_model()
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
```

Then url to [urls](socialmedia/users/urls.py):

```python
urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
]
```

- Also created [RegisterSerializer](socialmedia/users/serializers.py)

Also imported users's urls.py to main urls.py.

It might be simple as that. Let's test it:

![API urls](screenshots/6_latest_api_urls.png)

Django shows the ```api/register``` path so it might work. Let's test it in Postman:

![Registration OK](screenshots/7_registering_works.png)

Also tested with email exists:

![Email exists](screenshots/8_email_exists.png)

### Implementing login

First, I installed ```pip install djangorestframework-simplejwt```

Then I added code below to [settings.py](socialmedia/socialmedia/settings.py):

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}
```

Then I added URL routes to [urls.py](socialmedia/socialmedia/urls.py) for getting and refreshing tokens:

```python
urlpatterns = [
    ...,
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
```

I also protected [Post views](socialmedia/posts/views.py) with ```@permission_classes``` so now user must be logged in before fetching posts:

![Authentication credentials missing](screenshots/9_authentication_failed.png)

So, now I made a request with Postman and got access and refresh tokens:

![Tokens got](screenshots/10_got_tokens.png)

```json
{"refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NDgxMTcxMywiaWF0IjoxNzQ0NzI1MzEzLCJqdGkiOiJiOGJlNDg4NzY2N2Q0MjA4YjU2ZDMwOWVlODdiYTdkYiIsInVzZXJfaWQiOjN9.hSL16Hc-oyUvHiblP4XhtzwgPlG63oDZLb9u-SxgfUI","access":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0NzI1NjEzLCJpYXQiOjE3NDQ3MjUzMTMsImp0aSI6IjI5M2U4M2JjOGM2NDQzMzk4NzFmNjg4NzBkMzEzZjlhIiwidXNlcl9pZCI6M30.DabXO6PFBMBQOopIORJctiWIw_dgTc0adaGNchfwZcY"}
```

I also tested refresh token:

![New access token](screenshots/11_got_new_access_token.png)

```json
{"access":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0NzI1NzU4LCJpYXQiOjE3NDQ3MjUzMTMsImp0aSI6Ijc4MmExZTAzNmE0MzQxNmM4Mjk3YTFiMmE3ZDE0ZmQ4IiwidXNlcl9pZCI6M30.vj3qp_0zdo7ZOszrDgKcREquYIiygYUo1PX7tQNwqhs"}
```







