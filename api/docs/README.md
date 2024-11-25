# API Documentation

This documentation provides details about the School Management System API endpoints.

## Getting Started

1. Set up environment variables in `.env`:
```bash
VITE_API_URL=https://your-api-domain.com
```

2. Authentication
All endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## Available Endpoints

- [Authentication](./auth.md)
- [Dashboard](./dashboard.md)
- [Students](./students.md)
- [Sections](./sections.md)
- [Attendance](./attendance.md)
- [Reports](./reports.md)

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