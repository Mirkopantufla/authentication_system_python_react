import { toast } from "react-toastify"

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiURL: 'http://127.0.0.1:5000',
            access_token: null,
            currentUser: null,
            email: null,
            password: "",
            name: null,
            mensaje: "",
            loading: true

        },
        actions: {
            handleChange: e => {
                const { name, value } = e.target;

                //Todos estos formateos son para mantener ordenada la vista del context
                //Formateo de la data de inicio de sesion
                if (name == 'email') {
                    setStore({ [name]: value })
                } else if (name == 'password') {
                    setStore({ [name]: value })
                } else if (name == 'name') {
                    setStore({ [name]: value })
                }
            },
            createUser: (e) => {
                e.preventDefault()
                const { apiURL, email, password, name } = getStore();

                const datos = {
                    email,
                    password,
                    name
                }

                const data = {
                    apiURL: `${apiURL}/api/register`,
                    options: {
                        method: "POST",
                        body: JSON.stringify(datos),
                        headers: {
                            "Content-Type": "application/json"
                        },
                    },
                };

                fetch(data.apiURL, data.options)
                    .then((response) => response.json())
                    .then((respJson) => {
                        toast.success(respJson.success);
                        respJson.success ?
                            setStore({
                                email: "",
                                password: "",
                                name: "",
                                mensaje: respJson
                            })
                            :
                            toast.warn(respJson.warning);
                    })
                    .catch((error) => console.log(error));

            },
            cargarSesion: () => {

                if (sessionStorage.getItem('currentUser')) {
                    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
                    const access_token = JSON.parse(sessionStorage.getItem('access_token'))

                    setStore({
                        currentUser: currentUser,
                        access_token: access_token
                    })
                }
                setStore({
                    loading: false
                })
            },
            login: async (e, navigate) => {
                e.preventDefault();
                const { email, password, apiURL } = getStore();

                const data = {
                    apiURL: `${apiURL}/api/signup`,
                    options: {
                        method: 'POST',
                        body: JSON.stringify({ email, password }),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }
                }

                try {
                    const response = await fetch(data.apiURL, data.options);
                    const respJson = await response.json();

                    if (respJson.message) {
                        toast.error(respJson.message);
                        setStore({ password: '' });
                    } else if (respJson.email) {
                        toast.warn(respJson.email);
                        setStore({ password: '' });
                    } else if (respJson.password) {
                        toast.warn(respJson.password);
                        setStore({ password: '' });
                    } else {
                        if (respJson.data.access_token) {
                            setStore({
                                currentUser: respJson,
                                access_token: respJson.data.access_token,
                                password: "",
                                name: "",
                                email: ""
                            });
                            sessionStorage.setItem('currentUser', JSON.stringify(respJson));
                            sessionStorage.setItem('access_token', JSON.stringify(respJson.data.access_token));
                            navigate('/private')
                        }
                    }

                } catch (error) {

                }
            },
            cerrarSesion: (e, navigate) => {
                e.preventDefault()
                sessionStorage.clear()
                setStore({
                    currentUser: null,
                    access_token: null
                })
                navigate('/signup');
            }
        }
    }
}

export default getState;