from flask import Blueprint, jsonify, request
# from models import db, Match, MatchLog
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.security import check_password_hash
from models.user import User

api = Blueprint('api_auth', __name__)

@api.route('/signup', methods=['POST'])
def login():
    
    email = request.json.get('email')
    password = request.json.get('password')
    
    if not email: return jsonify({ "warning": "El correo es requerido!"}), 400
    if not password: return jsonify({ "warning": "La contraseña es requerida!"}), 400
    
    userFound = User.query.filter_by(email=email).first()
    
    if not userFound: return jsonify({ "error": "El correo o password es incorrecto!"}), 401
    
    if not check_password_hash(userFound.password, password):
        return jsonify({ "error": "El correo o password es incorrecto!"}), 401
    
    access_token = create_access_token(identity=userFound.id)
    
    data = {
        "access_token": access_token,
        "user": userFound.serialize()
    }
    
    return jsonify({ "success": "Login successfully", "status": 200, "data": data}), 200

@api.route('/private', methods=['GET'])
@jwt_required() # Definiendo una ruta privada
def profiles():

    id = get_jwt_identity()
    userFound = User.query.get(id)

    return jsonify({ "message": "Perfil Privado", "usuario": userFound.serialize()}), 200