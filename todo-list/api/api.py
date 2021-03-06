from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.db"
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

    def __str__(self):
        return f'{self.id} {self.content}'

def todo_serializer(todo):
    return {
        'id': todo.id,
        'content': todo.content
    }

@app.route('/api', methods=['GET'])
def index():
    response = jsonify([*map(todo_serializer, Todo.query.all())])
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/api/create', methods=['POST'])
# @cross_origin()
def create():
    request_data = json.loads(request.data)
    todo = Todo(content=request_data['content'])

    db.session.add(todo)
    db.session.commit()

    return {'201': 'todo created successfully'}

@app.route('/api/<int:id>')
def show(id):
    response = jsonify([*map(todo_serializer, Todo.query.filter_by(id=id))])
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/api/delete/<int:id>', methods=['POST'])
# @cross_origin()
def delete(id):
    request_data = json.loads(request.data)
    Todo.query.filter_by(id=request_data['id']).delete()
    db.session.commit()

    return {'204': 'Deleted successfully'}

@app.route('/api/edit/<int:id>', methods=['POST'])
# @cross_origin()
def edit(id):
    request_data = json.loads(request.data)
    Todo.query.filter_by(id=request_data['id']).update(dict(content=request_data['content']))
    db.session.commit()

    return {'200': 'Edited successfully'}

if __name__ == '__main__':
    app.run(debug=True)