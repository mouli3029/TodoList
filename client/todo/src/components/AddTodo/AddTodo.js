import React, { useState } from 'react';
import './AddTodo.css'
import {addTodo} from '../../apicalls/todo'
import {useHistory} from 'react-router-dom'

const AddTodo = ({todos,setTodos}) => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({title,description})
        .then(todo => {
            setTodos(todos.concat(todo))
            console.log(todo)
        })
        .catch(err => {
            console.log(err)
        })
        setTitle("");
        setDescription("");
        history.push('/');
    }

    return (
        <div className="addTodo_parent">
        <form onSubmit={handleSubmit} className="addTodo">
            <input type="text"
             value={title}
             required={true}
             onChange={(e)=> {setTitle(e.target.value)}}
             placeholder="Title" 
             className="addTodo_input"
             />
            <input type="text" 
            value = {description}
            required={true}
            onChange ={(e)=> {setDescription(e.target.value)}}
            placeholder = "Description" 
            className="addTodo_input"
            />
            <button onClick={handleSubmit} className="addTodo_button"> + </button>
        </form>
        </div>
    )

}

export default AddTodo;