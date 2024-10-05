from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/data', methods=['POST'])
def receive_data():
    # Get JSON data from the request
    try:
        data = request.get_json(force=True)  # This will decode the JSON data
    except Exception as e:
        return jsonify({"error": "Invalid JSON", "message": str(e)}), 400

    # You can now work with the `data` dictionary
    print(data)  # For debugging purposes

    # Example response
    return jsonify({"received": data}), 200

if __name__ == '__main__':
    app.run(debug=True)
