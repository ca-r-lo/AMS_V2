# Frontend API Documentation

## Environment Configuration
Set the API base URL in your `.env` file:
```
VITE_API_URL=https://your-api-domain.com
```

## Home Page (`/`)

### Get Sections Overview
- **Endpoint**: `GET /api/sections`
- **Description**: Fetches sections data and recent activity
- **Response**:
```json
{
  "sections": [
    {
      "id": 1,
      "name": "Section 1",
      "grade": "11",
      "strand": "STEM",
      "totalStudents": 30,
      "present": 25,
      "absent": 5
    }
  ],
  "recent_activity": [
    {
      "id": 1,
      "time": "08:30 AM",
      "action": "Time In",
      "student": "John Doe",
      "section": "CYGNUS"
    }
  ]
}
```

## Dashboard Page (`/dashboard`)

### Get Dashboard Data
- **Endpoint**: `GET /api/dashboard`
- **Description**: Fetches overview statistics and recent activity
- **Response**:
```json
{
  "stats": [
    {
      "label": "Total Students",
      "value": "265",
      "id": 1
    },
    {
      "label": "Today's Attendance",
      "value": "95",
      "id": 2
    },
    {
      "label": "Absent Students",
      "value": "170",
      "id": 3
    },
    {
      "label": "Attendance Rate",
      "value": "36%",
      "id": 4
    }
  ],
  "recent_activity": [
    {
      "time": "17:54:40",
      "log": "TIME OUT",
      "lrn": "129437110011",
      "name": "IMPAS, LADY JASMINE RANOLAS",
      "section": "TDM"
    }
  ]
}
```

## Students Page (`/students`)

### Get Students List
- **Endpoint**: `GET /api/students`
- **Query Parameters**:
  - `section` (optional): Filter by section name
- **Response**:
```json
[
  {
    "id": 1,
    "name": "Student Name",
    "section": "CYGNUS",
    "status": "in_school",
    "timeIn": "7:25 AM",
    "timeOut": "3:30 PM"
  }
]
```

## Attendance Page (`/attendance`)

### Get Attendance Records
- **Endpoint**: `GET /api/attendance`
- **Query Parameters**:
  - `date`: Date in YYYY-MM-DD format
  - `section` (optional): Filter by section name
- **Response**:
```json
[
  {
    "id": 1,
    "name": "Student Name",
    "status": "present",
    "time": "8:00 AM"
  }
]
```

### Mark Attendance
- **Endpoint**: `POST /api/attendance`
- **Request Body**:
```json
{
  "student_id": 1,
  "status": "present",
  "time": "8:00 AM"
}
```
- **Response**:
```json
{
  "message": "Attendance marked successfully"
}
```

## Reports Page (`/reports`)

### Get Reports Data
- **Endpoint**: `GET /api/reports`
- **Response**:
```json
[
  {
    "id": 1,
    "date": "2024-03-01",
    "present": 25,
    "absent": 5,
    "late": 2,
    "total": 32,
    "status": "complete"
  }
]
```

### Get Statistics
- **Endpoint**: `GET /api/stats`
- **Response**:
```json
{
  "average_attendance": 92,
  "daily_average": 28,
  "chronic_absences": 4
}
```

## Status Codes

- 200: Success
- 201: Created (For POST requests)
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Data Types

### Student Status
- `in_school`: Student is currently in school
- `left_school`: Student has left for the day
- `absent`: Student is absent

### Attendance Status
- `present`: Student is present
- `absent`: Student is absent
- `late`: Student arrived late

### Report Status
- `complete`: Report is finalized
- `pending`: Report is still being processed

## Sections
Available sections in the system:
- "All"
- "CYGNUS"
- "EIM FARADS"
- "ARTS AND DESIGN"

## Error Handling
All endpoints may return error responses in the following format:
```json
{
  "error": "Error message description"
}
```
