# API Documentation

## Dashboard Endpoints

### GET /api/dashboard
Returns dashboard overview data including stats and recent activity.

Response structure:
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

## Students Endpoints

### GET /api/students
Returns list of students, can be filtered by section.

Query parameters:
- section (optional): Filter by section name

Response structure:
```json
[
  {
    "id": number,
    "name": "string",
    "section": "string",
    "status": "string",
    "timeIn": "string",
    "timeOut": "string"
  }
]
```

### GET /api/students/{student_id}
Returns details for a specific student.

Response structure:
```json
{
  "id": number,
  "name": "string",
  "section": "string",
  "status": "string",
  "timeIn": "string",
  "timeOut": "string"
}
```

## Attendance Endpoints

### GET /api/attendance
Returns attendance records for a specific date and section.

Query parameters:
- date (optional): Filter by date (YYYY-MM-DD)
- section (optional): Filter by section name

Response structure:
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

### POST /api/attendance
Marks attendance for a student.

Request body:
```json
{
  "student_id": number,
  "status": "string",
  "time": "string"
}
```

Response structure:
```json
{
  "message": "string"
}
```

## Reports Endpoints

### GET /api/reports
Returns attendance reports data.

Response structure:
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

### GET /api/stats
Returns attendance statistics.

Response structure:
```json
{
  "average_attendance": number,
  "daily_average": number,
  "chronic_absences": number
}
```

## Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Running the API

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the Flask server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`.