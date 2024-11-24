from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Mock data for dashboard
dashboard_data = {
    "stats": [
        {"label": "Total Students", "value": "265", "id": 1},
        {"label": "Today's Attendance", "value": "95", "id": 2},
        {"label": "Absent Students", "value": "170", "id": 3},
        {"label": "Attendance Rate", "value": "36%", "id": 4},
    ],
    "recent_activity": [
        {"time": "17:54:40", "log": "TIME OUT", "lrn": "129437110011", "name": "IMPAS, LADY JASMINE RANOLAS", "section": "TDM"},
        {"time": "17:54:35", "log": "TIME OUT", "lrn": "129817130174", "name": "GUINITA, MERRY JOY CENTINO", "section": "TDM"},
        {"time": "17:51:14", "log": "TIME OUT", "lrn": "129665120062", "name": "GUERRA, MARIA ODEZA BOQUIA", "section": "BNC"},
    ]
}

# Mock data for students
students_data = [
    {
        "id": 1,
        "name": "Student 1",
        "section": "CYGNUS",
        "status": "in_school",
        "timeIn": "7:25 AM",
        "timeOut": "3:30 PM"
    },
    # ... Add more student records as needed
]

# Mock data for attendance
attendance_data = [
    {
        "id": 1,
        "name": "Student 1",
        "status": "present",
        "time": "8:00 AM"
    },
    # ... Add more attendance records as needed
]

# Mock data for reports
reports_data = {
    "attendance_records": [
        {"id": 1, "date": "2024-03-01", "present": 25, "absent": 5, "late": 2, "total": 32, "status": "complete"},
        {"id": 2, "date": "2024-03-02", "present": 28, "absent": 3, "late": 1, "total": 32, "status": "complete"},
        {"id": 3, "date": "2024-03-03", "present": 30, "absent": 1, "late": 1, "total": 32, "status": "pending"},
    ],
    "stats": {
        "average_attendance": 92,
        "daily_average": 28,
        "chronic_absences": 4
    }
}

# Dashboard endpoints
@app.route('/api/dashboard', methods=['GET'])
def get_dashboard():
    return jsonify(dashboard_data)

# Students endpoints
@app.route('/api/students', methods=['GET'])
def get_students():
    section = request.args.get('section', 'All')
    if section == 'All':
        return jsonify(students_data)
    filtered_students = [s for s in students_data if s['section'] == section]
    return jsonify(filtered_students)

@app.route('/api/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    student = next((s for s in students_data if s['id'] == student_id), None)
    if student:
        return jsonify(student)
    return jsonify({"error": "Student not found"}), 404

# Attendance endpoints
@app.route('/api/attendance', methods=['GET'])
def get_attendance():
    date = request.args.get('date', datetime.now().strftime('%Y-%m-%d'))
    section = request.args.get('section', 'All')
    
    filtered_attendance = attendance_data
    if section != 'All':
        filtered_attendance = [a for a in attendance_data if a.get('section') == section]
    
    return jsonify(filtered_attendance)

@app.route('/api/attendance', methods=['POST'])
def mark_attendance():
    data = request.json
    # In a real application, you would save this to a database
    return jsonify({"message": "Attendance marked successfully"}), 201

# Reports endpoints
@app.route('/api/reports', methods=['GET'])
def get_reports():
    return jsonify(reports_data['attendance_records'])

@app.route('/api/stats', methods=['GET'])
def get_stats():
    return jsonify(reports_data['stats'])

if __name__ == '__main__':
    app.run(debug=True, port=5000)