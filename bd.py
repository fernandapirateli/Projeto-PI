from tinydb import TinyDB, Query

# Cria um banco de dados que armazena seus dados em 'db.json'
db = TinyDB('db.json')

# Insere dados no banco de dados
db.insert({'nome': 'maçã', 'calorias': 52})
db.insert({'nome': 'arroz', 'calorias': 42})
db.insert({'nome': 'feijão', 'calorias': 55})
db.insert({'nome': 'ovo frito', 'calorias': 105})
db.insert({'nome': 'suco de laranja', 'calorias': 70})
db.insert({'nome': 'salda de frutas', 'calorias': 150})
db.insert({'nome': 'batata', 'calorias': 23})
db.insert({'nome': 'hamburguer', 'calorias': 80})
db.insert({'nome': 'omelete', 'calorias': 125})
db.insert({'nome': 'chocolate', 'calorias': 50})
db.insert({'nome': 'lentilha', 'calorias': 23})


# Busca dados no banco de dados
Alimento = Query()
print(db.search(Alimento.nome == ''))  # Saída: [{'nome': '', 'calorias': }]
