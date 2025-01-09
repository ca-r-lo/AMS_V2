# Sections API Documentation

## Get Sections
- **Endpoint**: `GET /api/sections`
- **Response**:
```json
{
  "sections": [
    {
      "id": "number",
      "name": "string",
      "gradeLevel": "string",
      "shift": "morning" | "afternoon"
    }
  ]
}
```

## Create Section
- **Endpoint**: `POST /api/sections`
- **Request Body**:
```json
{
  "name": "string",
  "gradeLevel": "string",
  "shift": "morning" | "afternoon"
}
```
- **Response**:
```json
{
  "id": "number",
  "name": "string",
  "gradeLevel": "string",
  "shift": "morning" | "afternoon",
  "message": "Section registered successfully"
}
```