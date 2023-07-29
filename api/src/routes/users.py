from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, create_access_token
from models import db
from models.user import User

api = Blueprint('api_users', __name__)

@api.route('/register', methods=['POST'])
def registrar_usuario():

    email = request.json.get('email')
    name = request.json.get('name')
    password = request.json.get('password')

    #Valido si los campos vienen con informacion, defino las advertencias que iran para el front y desplegarlas con el toast
    if not email: return jsonify({"warning": "El email es requerido!"}), 400
    if not name: return jsonify({"warning": "Nombre requerido!"}), 400
    if not password: return jsonify({"warning": "Password requerido!"}), 400

    #Creo una variable userFound, a la cual le asigno el primer usuario que encuentre con la funcion filter_by
    #buscando en la db, el correo provisto por el POST dentro de todos los User existentes
    userFound = User.query.filter_by(email=email).first()
    #Si el usuario encontrado efectivamente existe, se devuelve un mensaje de que ya existe
    if userFound: return jsonify({"warning": "El correo ya esta registrado!"}), 400

    new_user = User()
    new_user.email = email
    new_user.name = name
    new_user.password = generate_password_hash(password)
    new_user.save()

    return jsonify({"success": "Usuario creado Satisfactoriamente", "user": new_user.serialize(), "status": 201})