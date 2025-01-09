# Sections API Documentation

## GET /api/sections
Returns list of registered sections.

Response structure:
```json
{
  "sections": [
    {
      "id": number,
      "name": "string",
      "gradeLevel": "string",
      "shift": "morning" | "afternoon"
    }
  ]
}
```

## POST /api/sections
Register a new section.

Request body:
```json
{
  "name": "string",
  "gradeLevel": "string",
  "shift": "morning" | "afternoon"
}
```

Response structure:
```json
{
  "id": number,
  "name": "string",
  "gradeLevel": "string",
  "shift": "morning" | "afternoon",
  "message": "Section registered successfully"
}
```