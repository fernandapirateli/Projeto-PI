from flask import Flask, render_template, request, jsonify

from tinydb import TinyDB, Query
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

db = TinyDB('db.json')
Alimento = Query()

db = TinyDB('db.json')
Calorias = Query()

# Cria um banco de dados que armazena seus dados em 'db.json'
db = TinyDB('db.json')



# Busca dados no banco de dados
Alimento = Query()
print(db.search(Alimento.nome == ''))  # Saída: [{'nome': '', 'calorias': }]

@app.route('/alimento', methods=['GET', 'POST'])
def alimentos():
    if request.method == 'GET':
        return jsonify(db.all()), 200
    elif request.method == 'POST':
        db.insert(request.json)
        return jsonify(request.json), 201

@app.route('/alimento/<int:id>', methods=['PUT', 'DELETE'])
def alimento(id):
    if request.method == 'PUT':
        db.update(request.json, Alimento.id == id)
        return jsonify(request.json), 200
    elif request.method == 'DELETE':
        db.remove(Alimento.id == id)
        return '', 204

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)