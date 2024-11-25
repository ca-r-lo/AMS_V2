# Common API Guidelines

## Request Headers
All requests should include:
```
Content-Type: application/json
Authorization: Bearer <token>
```

## Pagination
Endpoints that return lists support pagination:

Query parameters:
- page (optional): Page number (default: 1)
- limit (optional): Items per page (default: 10)

Response format:
```json
{
  "data": [],
  "meta": {
    "currentPage": "number",
    "totalPages": "number",
    "totalItems": "number"
  }
}
```

## Error Handling
All endpoints may return error responses in this format:
```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```