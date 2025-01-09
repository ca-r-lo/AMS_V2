# API Documentation

## Authentication Endpoints

### POST /api/auth/login
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

## Home Page Endpoints

### GET /api/home/sections
Returns sections data for the home page view.

Response:
```json
{
  "sections": [
    {
      "id": number,
      "name": "string",
      "gradeLevel": "string"
    }
  ]
}
```

### GET /api/home/students
Returns students data for the home page view.

Query parameters:
- section (optional): Filter by section name

Response:
```json
{
  "students": [
    {
      "id": number,
      "firstName": "string",
      "middleName": "string",
      "lastName": "string",
      "age": number,
      "lrn": "string",
      "section": {
        "id": number,
        "name": "string"
      }
    }
  ]
}
```

## Dashboard Endpoint

### GET /api/dashboard
Returns dashboard overview including stats and recent activity.

Response:
```json
{
  "stats": [
    {
      "label": "string",
      "value": "string",
      "id": number
    }
  ],
  "recent_activity": [
    {
      "time": "string",
      "log": "string",
      "lrn": "string",
      "name": "string",
      "section": "string"
    }
  ]
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error
```

<lov-write file_path="src/docs/API_DOCUMENTATION.md">
# Frontend API Documentation

## Authentication

### Login
- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticates user and returns JWT token
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

## Dashboard

### Get Dashboard Data
- **Endpoint**: `GET /api/dashboard`
- **Description**: Fetches overview statistics and recent activity
- **Response**:
```json
{
  "stats": [
    {
      "label": "string",
      "value": "string",
      "id": number
    }
  ],
  "recent_activity": [
    {
      "time": "string",
      "log": "string",
      "lrn": "string",
      "name": "string",
      "section": "string"
    }
  ]
}
```

## Students

### Get Students List
- **Endpoint**: `GET /api/students`
- **Query Parameters**:
  - `section` (optional): Filter by section name
- **Response**:
```json
{
  "students": [
    {
      "id": number,
      "firstName": "string",
      "middleName": "string",
      "lastName": "string",
      "age": number,
      "lrn": "string",
      "section": {
        "id": number,
        "name": "string"
      }
    }
  ]
}
```

## Attendance

### Get Attendance Records
- **Endpoint**: `GET /api/attendance`
- **Query Parameters**:
  - `month`: Month in MM format
  - `year`: Year in YYYY format
  - `section` (optional): Filter by section name
- **Response**:
```json
[
  {
    "id": number,
    "name": "string",
    "status": "string",
    "time": "string"
  }
]
```

## Reports

### Get Reports Data
- **Endpoint**: `GET /api/reports`
- **Query Parameters**:
  - `month`: Month in MM format
  - `year`: Year in YYYY format
- **Response**:
```json
[
  {
    "id": number,
    "date": "string",
    "present": number,
    "absent": number,
    "late": number,
    "total": number,
    "status": "string"
  }
]
```

### Get Statistics
- **Endpoint**: `GET /api/stats`
- **Query Parameters**:
  - `month`: Month in MM format
  - `year`: Year in YYYY format
- **Response**:
```json
{
  "average_attendance": number,
  "daily_average": number,
  "chronic_absences": number
}
```
```