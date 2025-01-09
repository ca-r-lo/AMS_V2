# Students API Documentation

## Get Students
- **Endpoint**: `GET /api/students`
- **Query Parameters**:
  - `section` (optional): Filter by section name
- **Response**:
```json
{
  "students": [
    {
      "id": "number",
      "firstName": "string",
      "middleName": "string",
      "lastName": "string",
      "age": "number",
      "lrn": "string",
      "section": {
        "id": "number",
        "name": "string"
      }
    }
  ]
}
```

## Create Student
- **Endpoint**: `POST /api/students`
- **Request Body**:
```json
{
  "firstName": "string",
  "middleName": "string",
  "lastName": "string",
  "age": "number",
  "lrn": "string",
  "sectionId": "number"
}
```
- **Response**:
```json
{
  "id": "number",
  "firstName": "string",
  "middleName": "string",
  "lastName": "string",
  "age": "number",
  "lrn": "string",
  "section": {
    "id": "number",
    "name": "string"
  },
  "message": "Student registered successfully"
}
```