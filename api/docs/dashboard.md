# Dashboard API Documentation

## GET /api/dashboard
Returns dashboard overview data including stats.

Response structure:
```json
{
  "stats": [
    {
      "label": "string",
      "value": "string",
      "id": number
    }
  ]
}
```