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