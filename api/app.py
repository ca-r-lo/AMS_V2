from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Mock data for sections and students
sections_data = [
    {"id": 1, "name": "CYGNUS", "gradeLevel": "11"},
    {"id": 2, "name": "EIM FARADS", "gradeLevel": "12"},
    {"id": 3, "name": "ARTS AND DESIGN", "gradeLevel": "11"},
]

students_data = [
    {
        "id": 1,
        "firstName": "John",
        "middleName": "Doe",
        "lastName": "Smith",
        "age": 16,
        "lrn": "123456789012",
        "section": {"id": 1, "name": "CYGNUS"}
    }
]

# Mock data for dashboard
dashboard_data = {
    "stats": [
        {"label": "Total Students", "value": str(len(students_data)), "id": 1},
        {"label": "Total Sections", "value": str(len(sections_data)), "id": 2},
        {"label": "Today's Attendance", "value": "95", "id": 3},
        {"label": "Attendance Rate", "value": "36%", "id": 4},
    ]
}

# Home page specific endpoints
@app.route('/api/home/sections', methods=['GET'])
def get_home_sections():
    return jsonify({"sections": sections_data})

@app.route('/api/home/students', methods=['GET'])
def get_home_students():
    section = request.args.get('section', None)
    if section:
        filtered_students = [s for s in students_data if s['section']['name'] == section]
        return jsonify({"students": filtered_students})
    return jsonify({"students": students_data})

# Main sections endpoints
@app.route('/api/sections', methods=['GET'])
def get_sections():
    return jsonify({"sections": sections_data})

@app.route('/api/sections', methods=['POST'])
def create_section():
    data = request.json
    new_section = {
        "id": len(sections_data) + 1,
        "name": data["name"],
        "gradeLevel": data["gradeLevel"]
    }
    sections_data.append(new_section)
    return jsonify({**new_section, "message": "Section registered successfully"}), 201

# Main students endpoints
@app.route('/api/students', methods=['GET'])
def get_students():
    section = request.args.get('section', None)
    if section:
        filtered_students = [s for s in students_data if s['section']['name'] == section]
        return jsonify({"students": filtered_students})
    return jsonify({"students": students_data})

@app.route('/api/students', methods=['POST'])
def create_student():
    data = request.json
    section = next((s for s in sections_data if s['id'] == data['sectionId']), None)
    if not section:
        return jsonify({"error": "Section not found"}), 404
    
    new_student = {
        "id": len(students_data) + 1,
        "firstName": data["firstName"],
        "middleName": data["middleName"],
        "lastName": data["lastName"],
        "age": data["age"],
        "lrn": data["lrn"],
        "section": {"id": section["id"], "name": section["name"]}
    }
    students_data.append(new_student)
    return jsonify({**new_student, "message": "Student registered successfully"}), 201

# Dashboard endpoints
@app.route('/api/dashboard', methods=['GET'])
def get_dashboard():
    return jsonify(dashboard_data)

# ... keep existing code (attendance and reports endpoints)

if __name__ == '__main__':
    app.run(debug=True, port=5000)