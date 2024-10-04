from flask import Blueprint, jsonify, request

views = Blueprint('views', __name__)

#api link '/getinfo' is just a placeholder
@views.route('/get-info', methods=["GET"])
def get_info():
    data = {
        'message': 'This is some information',
        'data': [1, 2, 3, 4, 5]
        }
    return jsonify(data)

@views.route('/send-info', methods=['POST'])
def send_info():
    input_data = request.get_json()

