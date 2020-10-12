#!flask/bin/python
from flask import Flask, jsonify, request 
from flask_restful import Resource, Api 
from flask_cors import CORS, cross_origin

from get.code import get_code
from get.sleep import get_sleep

from download.code import download_all_worksheets
from download.smartwatch import download_smartwatch

app = Flask(__name__) 
CORS(app, support_credentials=True)
api = Api(app) 

class Code(Resource): 
    def get(self): 
        code = get_code()
        return jsonify(code)
  
class Sleep(Resource): 
    def get(self): 
        sleep = get_sleep()
        return jsonify(sleep)

class DownloadCode(Resource): 
    def get(self): 
        download_all_worksheets()
        return jsonify({'message': 'cool'})

class DownloadSmartwatch(Resource): 
    def get(self): 
        download_smartwatch()
        return jsonify({'message': 'cool'})


api.add_resource(Code, '/code')
api.add_resource(Sleep, '/sleep') 
api.add_resource(DownloadCode, '/download-code') 
api.add_resource(DownloadSmartwatch, '/download-sleep') 


if __name__ == '__main__':
    app.run(debug=True)