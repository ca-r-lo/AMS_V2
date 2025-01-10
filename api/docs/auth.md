# Authentication API Documentation

## Role-Based Access Control

The API implements role-based access control with two main roles:
- **Admin**: Full access to all endpoints, including creation and deletion of sections and students
- **User**: Read-only access to sections and students data

### Protected Endpoints
The following endpoints require admin role:
- POST /api/sections
- DELETE /api/sections/:id
- POST /api/students
- DELETE /api/students/:id

Error response for unauthorized access:
```json
{
  "error": "Unauthorized: Admin role required"
}
```

## Login
Authenticate a user and receive their role.

Request:
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
    "role": "admin" | "user"
  }
}
```