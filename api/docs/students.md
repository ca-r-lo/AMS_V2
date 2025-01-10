# Students API Documentation

## GET /api/students
Returns list of registered students.

Query parameters:
- section (optional): Filter by section name

Response structure:
```json
{
  "students": [
    {
      "id": number,
      "firstName": "string",
      "middleName": "string",
      "lastName": "string",
      "age": number,
      "lrn": "string",
      "section": {
        "id": number,
        "name": "string"
      }
    }
  ]
}
```

## POST /api/students
Register a new student. Requires admin role.

Request body:
```json
{
  "firstName": "string",
  "middleName": "string",
  "lastName": "string",
  "age": number,
  "lrn": "string",
  "sectionId": number
}
```

Response structure:
```json
{
  "id": number,
  "firstName": "string",
  "middleName": "string",
  "lastName": "string",
  "age": number,
  "lrn": "string",
  "section": {
    "id": number,
    "name": "string"
  },
  "message": "Student registered successfully"
}
```

## DELETE /api/students/:id
Delete a student. Requires admin role.

Response structure:
```json
{
  "message": "Student deleted successfully"
}
```

Error responses:
- 404: Student not found