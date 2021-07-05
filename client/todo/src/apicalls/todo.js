import axios from 'axios'
const Baseurl = 'http://localhost:3001/api';


let token = null;
export const setToken = () => {
    if(window.localStorage.getItem('token')){
        token = `Bearer ${window.localStorage.getItem('token')}`
    }
    else{
        console.log("No token exists..");
    }
} 

export  const allTodos = () => {
    setToken()
    const config = {
        headers: { Authorization: token },
    }

    const req = axios.get(`${Baseurl}/todos`,config)
  
    return req.then(res => res.data)
}

export const addTodo = async (newTodo) => {
    setToken()
    const config = {
        headers: { Authorization: token },
    }
    const req = axios.post(`${Baseurl}/todos`,newTodo,config);
    return req.then((res)=>res.data)
}

export const updateTodo = (updatedTodo,id) => {
    setToken()
    const config = {
        headers: { Authorization: token },
    }
    const req = axios.put(`${Baseurl}/todos/${id}`,updatedTodo,config);
    return req.then(res => res.data)
}

export const deleteTodo = (id) => {
    setToken()
    const config = {
        headers: { Authorization: token },
    }
    const req = axios.delete(`${Baseurl}/todos/${id}`,config);
    return req.then(res => res.data)
}