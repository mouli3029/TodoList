import axios from "axios";
const baseUrl = "http://localhost:3001/api/users"

let token = null;
export const setTokenUser = newToken => {
    token = `Bearer ${newToken}`
} 

export const loginUser = (object) =>{
    const req = axios.post(`${baseUrl}/login`,object)
    return req.then(res=>res.data);
}

export const registerUser = (object) => {
    const req = axios.post(`${baseUrl}`,object)
    return req.then(res=>res.data)
}

export const logoutUser = () => {
    const config = {
        headers: { Authorization: token },
    }
    const req = axios.get(`${baseUrl}/logout`,config)
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    return req.then(res => res.data)
}

export const logoutAllUser =  () => {
    const config = {
        headers: { Authorization: token },
    }

    const req = axios.get(`${baseUrl}/logoutAll`,config)
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    console.log('Going good!')
    return req.then(res => res.data)
}