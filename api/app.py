from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Mock data for reports
attendance_data = [
    {"id": 1, "date": "2024-03-01", "present": 25, "absent": 5, "late": 2, "total": 32, "status": "complete"},
    {"id": 2, "date": "2024-03-02", "present": 28, "absent": 3, "late": 1, "total": 32, "status": "complete"},
    {"id": 3, "date": "2024-03-03", "present": 30, "absent": 1, "late": 1, "total": 32, "status": "pending"},
]

@app.route('/api/reports', methods=['GET'])
def get_reports():
    return jsonify(attendance_data)

@app.route('/api/stats', methods=['GET'])
def get_stats():
    stats = {
        "average_attendance": 92,
        "daily_average": 28,
        "chronic_absences": 4
    }
    return jsonify(stats)

if __name__ == '__main__':
    app.run(debug=True, port=5000)