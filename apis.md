| URL                 | Description                  | Available methods |
| ------------------- | ---------------------------- | ----------------- |
| /api/posts/         | Shows all posts              | GET, POST         |
| /api/posts/:id/     | Shows post by ID             | GET               |
| /api/register/      | User registration            | POST              |
| /api/token/         | Get user token               | POST              |
| /api/token/refresh/ | Refresh user token           | POST              |

Example POST request to ```/api/posts/```:
```json
{
    "content": "Stuff"
}
```

Example POST request to ```/api/register/```:
```json
{
    "username": "Username",
    "email": "User email",
    "password": "Password123",
    "password": "Password123"
}
```

Example POST request to ```/api/token/```:
```json
{
    "username": "Username",
    "password": "Password123"
}
```

Example POST request to ```/api/token/refresh/```
```json
{
    "refresh": "refresh_token"
}
```