# API Documentation

## Home Page Endpoints

### GET /api/home/sections
Returns sections data specifically for the home page view.

Response structure:
```json
{
  "sections": [
    {
      "id": number,
      "name": "string",
      "gradeLevel": "string"
    }
  ]
}
```

### GET /api/home/students
Returns students data specifically for the home page view. Can be filtered by section.

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

## Dashboard Endpoints

### GET /api/dashboard
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

## Main Sections Endpoints

### GET /api/sections
Returns complete list of sections.

### POST /api/sections
Creates a new section.

Request body:
```json
{
  "name": "string",
  "gradeLevel": "string"
}
```

## Main Students Endpoints

### GET /api/students
Returns complete list of students. Can be filtered by section.

Query parameters:
- section (optional): Filter by section name

### POST /api/students
Registers a new student.

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

## Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Running the API

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the Flask server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`.