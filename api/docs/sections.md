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
Register a new section. Requires admin role.

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

## DELETE /api/sections/:id
Delete a section. Requires admin role.

Response structure:
```json
{
  "message": "Section deleted successfully"
}
```

Error responses:
- 400: Cannot delete section with enrolled students
- 404: Section not found