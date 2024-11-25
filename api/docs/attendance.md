# Attendance API Documentation

## GET /api/attendance
Returns attendance records.

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

## POST /api/attendance
Marks attendance for a student.

Request body:
```json
{
  "student_id": number,
  "status": "string",
  "time": "string"
}
```

Response:
```json
{
  "message": "string"
}
```