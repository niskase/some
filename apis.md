| URL                                 | Description                  | Available methods |
| ----------------------------------- | ---------------------------- | ----------------- |
| /api/posts/                         | Shows all posts              | GET, POST         |
| /api/posts/:id/                     | Shows post by ID             | GET               |
| /api/posts/:id/like/                | Like someone's post          | POST              |
| /api/register/                      | User registration            | POST              |
| /api/token/                         | Get user token               | POST              |
| /api/token/refresh/                 | Refresh user token           | POST              |
| /api/friend-request/                | Send friend request          | POST              |
| /api/friend-request/list            | List friend requests         | GET               |
| /api/friend-request/:id/accept/     | Accept friend request        | PUT               |
| /api/friend-request/:id/decline/    | Decline friend request       | PUT               |
| /api/friend-request/:id/cancel/     | Cancel friend request        | DELETE            |

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

In friend requests, use ```:id``` to accept/decline/cancel requests