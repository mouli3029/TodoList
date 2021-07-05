import React,{useState,useEffect} from 'react';
import styled,{ThemeProvider} from 'styled-components'
import NavComponent from './components/NavBar/NavComponent';
import {darkTheme,lightTheme} from './theme';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import {allTodos, setToken} from './apicalls/todo'
import AllTodo from './components/Todos/Todos';
import AddTodo from './components/AddTodo/AddTodo';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { setTokenUser } from './apicalls/user';



const ContainerHome = styled.div`
  width: 100%;
  min-height : 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const  App = () => {
  const [theme,setTheme] = useState(lightTheme);

  // TodoState
  const [todos,setTodos] = useState([])

  // users State
  const [user,setUser] = useState(null);

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      setUser(null);
    }
  },[])
  useEffect(() => {
    setUser(localStorage.getItem('user'))
    if(user){
    allTodos()
      .then((todos)=>{
        setTodos(todos)
      })
      .catch(err => {
        console.log(err);
    })
  }
  }, [todos,user])
  return (
    <ThemeProvider theme={theme}>
      <ContainerHome>
        <Router>
        <NavComponent user={user} setUser={setUser}/>
          <Switch>
          <Route exact path='/'>
             <AllTodo todos={todos} setTodos={setTodos}/>
            </Route>
            <Route  path='/addTodo'>
              <AddTodo todos={todos} setTodos={setTodos}/>
            </Route>
            <Route exact path='/login'>
             <Login setUser={setUser}/>
            </Route>

            <Route exact path='/register'>
              <Signup />
            </Route>
          </Switch>
        </Router>
       {/*  <AddTodo />
        <AllTodo todos={todos}/> */}
      </ContainerHome>
    </ThemeProvider>

  );
}


export default App;
