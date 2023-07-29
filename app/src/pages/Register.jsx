import React, { useContext, useState } from 'react'
import { Context } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

const Register = () => {

    const navigate = useNavigate();

    //Estados Auxiliares
    const [errorCorreo, setErrorCorreo] = useState('');
    const [errorNombre, setErrorNombre] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    //Variables de los input guardados en el context
    const { store: { email, password, name }, actions } = useContext(Context);

    //Variable para validar si hay error o no al terminar la funcion
    let hayError;

    //Regex para validar
    const solocorreos = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    const soloLetras = /^[a-zA-Z\s]+$/;


    const handleJoinNow = (e) => {
        e.preventDefault();

        validarDatos()

        if (hayError == false) {
            actions.createUser(e)
        }
    };

    const validarDatos = () => {
        //Siempre inicia falso al consultar, en caso de haber algun error cambiara a true
        hayError = false;

        //Validacion para el campo email, que no este vacio y un formato valido: ejemplo@ejemplo.cl
        if (email == '') {
            setErrorCorreo('No puedes dejar el campo de correo vacio')
            toast.warn('No puedes dejar el campo de correo vacio');
            hayError = true;
        } else if (!solocorreos.test(email)) {
            setErrorCorreo('El campo de correo debe tener un formato valido: ejemplo@ejemplo.cl')
            toast.warn('El campo de correo debe tener un formato valido: ejemplo@ejemplo.cl');
            hayError = true;
        } else {
            setErrorCorreo('')
        }

        //Validacion para el campo nombre, que no este vacio y solo letras
        if (name == '') {
            setErrorNombre('No puedes dejar el campo de nombre vacio')
            toast.warn('No puedes dejar el campo de nombre vacio');
            hayError = true;
        } else if (!soloLetras.test(name)) {
            setErrorNombre('El campo de nombre debe tener solo letras')
            toast.warn('El campo de nombre debe tener solo letras');
            hayError = true;
        } else {
            setErrorNombre('')
        }

        //Validacion para el campo password, de momento solo si esta vacio
        if (password == '') {
            setErrorPassword('No puedes dejar el campo de password vacio')
            toast.warn('No puedes dejar el campo de password vacio');
            hayError = true;
        } else {
            setErrorPassword('')
        }

        return hayError;
    }

    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="offset-2 col-8 text-center p-3 border border-light rounded-3 mt-5">
                    <Link className='navbar-brand' to="/signup">
                        <button className='btn btn-danger d-flex align-items-start'>Atras</button>
                    </Link>
                    <h2 className='mb-4'>Puedes registrarte aqui:</h2>
                    <form>
                        <div className="form-group">
                            {/* Con el Onchange mando los cambios inmediatamente al context mediante una funcion dentro de flux */}
                            <h5>Email</h5>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={actions.handleChange}
                            />
                            <small id='smallCorreo' className='fs-5 text-danger'>{errorCorreo}</small>
                        </div>
                        <br />
                        <div className="form-group">
                            <h5>Nombre</h5>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                onChange={actions.handleChange}
                            />
                            <small id='smallNombre' className='fs-5 text-danger'>{errorNombre}</small>
                        </div>
                        <br />
                        <div className="form-group">
                            <h5>Contraseña</h5>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={actions.handleChange}
                            />
                            <small id='smallPassword' className='fs-5 text-danger'>{errorPassword}</small>
                        </div>
                    </form>
                    <br />
                    <button className="btn btn-primary custom-button text-center" onClick={handleJoinNow}>
                        Únete ya
                    </button>
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

export default Register