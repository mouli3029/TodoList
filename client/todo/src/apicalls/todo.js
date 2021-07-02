import axios from 'axios'
const Baseurl = 'http://localhost:3001/api';

export  const allTodos = () => {
    const req = axios.get(`${Baseurl}/todos`)
    return req.then(res => res.data)
}

export const addTodo = (newTodo) => {
    const req = axios.post(`${Baseurl}/todos`,newTodo);
    return req.then((res)=>res.data)
}

export const updateTodo = (updatedTodo,id) => {
    const req = axios.put(`${Baseurl}/todos/${id}`,updatedTodo)
    return req.then(res => res.data)
}

export const deleteTodo = (id) => {
    const req = axios.delete(`${Baseurl}/todos/${id}`);
    return req.then(res => res.data)
}