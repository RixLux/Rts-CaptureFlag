#API Reference

## Authentication

### Register
**POST** `/auth/register`

```
{
  "username": "player1",
  "email": "player@mail.com",
  "password": "secret"
}
```

Login

POST /auth/login
```
{
  "email": "player@mail.com",
  "password": "secret"
}
```

Verify Email

GET /auth/verify/:token
