from flask import Flask, request
import sys
import json
import encoder

app = Flask(__name__)

@app.route('/', methods=['POST'])
def hello():
  req_content = request.get_json(force=True)
  sound = req_content['sound']
  #print(req_content, file=sys.stderr)
  encoder.encode(sound)
  return 'JSON posted'

app.run(host='0.0.0.0', port=5000)