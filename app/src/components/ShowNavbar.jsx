import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const ShowNavbar = ({ children }) => {

    const userView = useLocation();
    const [mostrar, setMostrar] = useState(false);

    useEffect(() => {
        if (userView.pathname === '/private' || userView.pathname === '/home') {
            setMostrar(true)
        } else {
            setMostrar(false)
        }

    }, [userView])

    return (
        <>{mostrar && children}</>
    )
}

export default ShowNavbar