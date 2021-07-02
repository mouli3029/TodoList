import React,{useState} from 'react'
import {Card,Button,Modal} from 'react-bootstrap'
import { updateTodo, deleteTodo} from '../../apicalls/todo'
import AddTodo from '../AddTodo/AddTodo';
import {CheckCircleFill,XLg} from 'react-bootstrap-icons'


const TodoItem = ({todo,todos,setTodos}) => {
    const [show, setShow] = useState(false);
    const [title,setTitle] = useState(todo.title);
    const [description,setDescription] = useState(todo.description);


    const handleClose = () => setShow(false);

    const handleShow = (e) => {
        setShow(true);
    }

    const handleSubmit = (e) => {
        updateTodo({title,description},todo.id)
        .then(updatedTodo => {
            setTodos(todos.filter(t => t.id !== todo.id ? t : todo))
        })
        setShow(false);
    }
    const handleDelete = (e) => {
        deleteTodo(todo.id)
        .then(deletedTodo=>{
            setTodos(todos.filter(t=>t.id !== deletedTodo.id))
            console.log(deletedTodo.title)
        })

    } 
    const handleC = (e) => {
        e.preventDefault();
        updateTodo({completed:!todo.completed},todo.id)
        .then(updatedTodo => {
            setTodos(todos.filter(t => t.id !== todo.id ? t : todo))
        })
    }
    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Update {todo.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <input type="text"
              value = {title}
             onChange={(e)=> {setTitle(e.target.value)}}
             placeholder="Title" 
             className="addTodo_input"
             />
            <input type="text" 
            value = {description}
            onChange ={(e)=> {setDescription(e.target.value)}}
            placeholder = "Description" 
            className="addTodo_input"
            />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
         <Card style={{ width: '18rem', marginBottom : "20px" }}>
        <Card.Body>
            <Card.Title>{todo.title}</Card.Title>
            <Card.Text>
                {todo.description}
            </Card.Text>
            <Button onClick={handleShow} variant="primary">Update</Button>
            {" "}
            <Button onClick={handleDelete} variant="danger">Delete</Button>
            <button style={{
                marginLeft : "10px",
                backgroundColor : "white",
                border : "none"
            }} 
            onClick={handleC}>
                {todo.completed ?
                  <XLg/>
                :
                <CheckCircleFill/>
                }
            </button>
        </Card.Body>
        </Card>
        </>
    )
}

export default TodoItem;