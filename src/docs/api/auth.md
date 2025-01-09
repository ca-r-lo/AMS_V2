# Authentication API Documentation

## Login
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
```json
{
  "username": "string",
  "password": "string"
}
```
- **Response**:
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

## Sign Up
- **Endpoint**: `POST /api/auth/signup`
- **Request Body**:
```json
{
  "username": "string",
  "password": "string",
  "role": "string"
}
```
- **Response**:
```json
{
  "message": "User created successfully",
  "user": {
    "id": "number",
    "username": "string",
    "role": "string"
  }
}
```