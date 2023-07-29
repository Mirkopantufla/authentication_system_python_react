export function isAuthenticated() {

    //Trae el token desde el localStorage
    const token = sessionStorage.getItem('access_token');

    //Verifica si el token existe
    if (token) {
        return true;
    } else {
        return false;
    }

}

export function login(token) {
    //Guarda el token en el local storage
    sessionStorage.setItem("access_token", token)
}

export function logout() {
    //Quita el token de el local storage
    sessionStorage.removeItem("access_token");
}