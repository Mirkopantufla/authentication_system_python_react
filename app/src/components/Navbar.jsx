import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../context/AppContext';

const Navbar = () => {

    const navigate = useNavigate();
    const { actions } = useContext(Context);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className='navbar-brand' to={'/home'}>
                    SimpleLogin
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className='navbar-nav ms-auto'>
                        <button type='button' className="dropdown-item text-dark" onClick={(e) => actions.cerrarSesion(e, navigate)}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar