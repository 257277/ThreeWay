from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/",methods=["GET"])
def home():
    return "home"




if __name__ == '__main__':
    app.run(debug=True, port=5002)



