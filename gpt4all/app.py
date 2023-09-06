from gpt4all import GPT4All
from flask import Flask, request, jsonify
import re

model = GPT4All("wizardlm-13b-v1.1-superhot-8k.ggmlv3.q4_0.bin", "./models")
system_template = 'A chat between a curious user and an artificial intelligence assistant.'
prompt_template = 'USER: {0}\nASSISTANT: '

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World from gpt4all!'

def clean_text(text):
    # Remove leading special characters
    text = re.sub(r'^\W+', '', text)
    # Trim leading/trailing whitespace
    text = text.strip()
    return text

# curl -X POST -H "Content-"type": application/json" -d '{"prompt":"The capital of France is"}' http://localhost:5000/generate
@app.route('/generate', methods=['POST'])
def generate():
    with model.chat_session(system_template, prompt_template):
        app.logger.info("Generating response...")
        app.logger.info(request.json)
        output = model.generate(request.json['prompt'])
        app.logger.info(output)
        return jsonify({'output': clean_text(output)})
    
