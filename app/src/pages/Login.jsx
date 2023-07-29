import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { Context } from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { store: { email, password }, actions } = useContext(Context);
    const navigate = useNavigate();

    const [errorCorreo, setErrorCorreo] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    //Regex para validar
    const solocorreos = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

    //Variable para validar si hay error o no al terminar la funcion
    let hayError = false;


    const validarDatos = (e) => {
        e.preventDefault()
        //Siempre inicia falso al consultar, en caso de haber algun error cambiara a true
        hayError = false;

        //Validacion para el campo email, que no este vacio y un formato valido: ejemplo@ejemplo.cl
        if (email && email == "") {
            setErrorCorreo('No puedes dejar el campo de correo vacio')
            toast.warn('No puedes dejar el campo de correo vacio');
            hayError = true;
        } else if (!solocorreos.test(email)) {
            setErrorCorreo('El campo de correo debe tener un formato valido: ejemplo@ejemplo.cl')
            toast.warn('El campo de correo debe tener un formato valido: ejemplo@ejemplo.cl');
            hayError = true;
        } else {
            setErrorCorreo("")
        }

        //Validacion para el campo password, de momento solo si esta vacio
        if (password == "" || password.length == 0) {
            setErrorPassword('No puedes dejar el campo de password vacio')
            toast.warn('No puedes dejar el campo de password vacio');
            hayError = true;
        } else {
            setErrorPassword("")
        }

        return hayError;
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="offset-1 col-10 text-center">
                    <h1 className='my-5 border border-3 border-danger rounded-3 p-2'>Servicio de Login Basico con Jwt Token</h1>
                </div>
                <div className="offset-2 col-8 text-center">
                    <form onSubmit={(e) => !validarDatos(e) ? actions.login(e, navigate) : null}>
                        <br />
                        <div className="form-group">
                            <h4 className="email text-center">Ingresa tu email</h4>
                            <br />
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={actions.handleChange}
                                placeholder='Email'
                            />
                            <small id='smallCorreo' className='fs-5 text-danger'>{errorCorreo}</small>
                            <br />
                        </div>
                        <div className="form-group">
                            <h4 className="password text-center">Ingresa tu contraseña</h4>
                            <br />
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={actions.handleChange}
                                placeholder='Password'
                            />
                            <small id='smallPassword' className='fs-5 text-danger'>{errorPassword}</small>
                            <br />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                        </div>

                    </form>
                </div>
            </div>
            <div className="row">
                <div className="offset-3 col-6 text-center">
                    <h1 className='text-warning text-center mt-5'>No tienes cuenta!?</h1>
                    <Link to="/register">
                        <button className='btn btn-danger fs-5'>Registrate Aqui!</button>
                    </Link>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Login