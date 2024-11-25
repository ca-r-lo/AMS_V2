# API Documentation

This directory contains the API documentation for different endpoints:

1. [Sections](./sections.md) - Endpoints for managing sections
2. [Students](./students.md) - Endpoints for managing students
3. [Dashboard](./dashboard.md) - Dashboard related endpoints
4. [Attendance](./attendance.md) - Attendance management endpoints
5. [Reports](./reports.md) - Reporting endpoints

## Environment Configuration
Set the API base URL in your `.env` file:
```
VITE_API_URL=https://your-api-domain.com
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Error Response Format
```json
{
  "error": "Error message description"
}
```