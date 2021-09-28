import axios from "axios"
import { 
    USER_LOGIN ,
    USER_REGISTER,
    USER_LOGOUT,
    USER_AUTH
} from "./types";


export async function userLogin(userData) {
    const request = await axios.post('/api/users/login', userData)
        //.then(response=>response.data);

    return {
        type: USER_LOGIN,
        payload: request.data
    }
}

export async function userRegister(userData) {
    const request = await axios.post('/api/users/register', userData)
        //.then(response => response.data)

    return {
        type: USER_REGISTER,
        payload: request.data
    }
}

export async function auth() {
    const request = await axios.get('/api/users/auth')
        //.then(response => response.data)
    return {
        type: USER_AUTH,
        payload: request.data
    }
}

export function userLogout(userData) {
    return {
        type: USER_LOGOUT
    }
}

