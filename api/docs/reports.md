# Reports API Documentation

## GET /api/reports
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

## GET /api/stats
Returns attendance statistics.

Response structure:
```json
{
  "average_attendance": number,
  "daily_average": number,
  "chronic_absences": number
}
```