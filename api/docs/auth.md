# Authentication API

## POST /api/auth/login
Authenticates a user and returns a JWT token.

Request body:
```json
{
  "username": "string",
  "password": "string"
}
```

Response:
```json
{
  "token": "string",
  "user": {
    "id": "number",
    "username": "string",
    "role": "string"
  }
}
```

## POST /api/auth/register
Creates a new user account.

Request body:
```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

Response:
```json
{
  "message": "string",
  "user": {
    "id": "number",
    "username": "string",
    "email": "string"
  }
}
```