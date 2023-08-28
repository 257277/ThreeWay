import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import certifi
import mutagen
from mutagen import File
from werkzeug.utils import secure_filename
import mysql.connector
import base64

app = Flask(__name__)
CORS(app)

mysql_config = {
    "user": "root",
    "password": "Mysql@0410",
    "host": "localhost",
    "database": "ThreeStudio"
}

conn = mysql.connector.connect(**mysql_config)
cursor = conn.cursor()

@app.route("/uploadfile", methods=["POST"])
def uploadAudioFile():
    try:
        email = request.form.get('email')
        files = request.files.getlist('file')
        fileInfo = []
        totalDuration = 0
        for file in files:
            y = File(file)
            title = os.path.splitext(file.filename)[0]
            length = y.info.length
            extension = os.path.splitext(file.filename)[1]
            totalDuration += length

            fileInfo.append({"title": title, "length": length, "extension": extension, "audio": file.read(), "email": email})

        if totalDuration > 600:
            return jsonify({"msg": "Total length of uploaded files is more than 10 minutes"})
        else:
            print(fileInfo)
            for item in fileInfo:
                title = item["title"]
                length = item["length"]
                extension = item["extension"]
                audio_data = item["audio"]

                # Perform MySQL database operations here
                insert_query = "INSERT INTO audio_files (title, length, extension, email, audio_data) VALUES (%s, %s, %s, %s, %s)"
                insert_values = (title, length, extension, email, audio_data)
                cursor.execute(insert_query, insert_values)
                conn.commit()

            return jsonify({"msg": "Files uploaded successfully"}), 200
    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 500


@app.route("/getfiles", methods=["POST"])
def getFile():
    try:
        data = request.get_json()
        email = data.get("email")

        query = "SELECT * FROM audio_files WHERE email = %s"
        cursor.execute(query, (email,))
        result = cursor.fetchall()
        return jsonify(result)
    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002)
