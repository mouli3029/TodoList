import React,{useState,useEffect} from 'react';
import styled,{ThemeProvider} from 'styled-components'
import NavComponent from './components/NavBar/NavComponent';
import {darkTheme,lightTheme} from './theme';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import {allTodos} from './apicalls/todo'
import AllTodo from './components/Todos/Todos';
import AddTodo from './components/AddTodo/AddTodo';

const ContainerHome = styled.div`
  width: 100%;
  min-height : 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const  App = () => {
  const [theme,setTheme] = useState(lightTheme);

  // TodoState
  const [todos,setTodos] = useState([])
  useEffect(() => {
    allTodos()
    .then((todos)=>{
      setTodos(todos)
    })
    .catch(err => {
      console.log(err);
    })
  }, [todos])
  return (
    <ThemeProvider theme={theme}>
      <ContainerHome>
        <Router>
        <NavComponent/>
          <Switch>
            <Route  path='/addTodo'>
              <AddTodo todos={todos} setTodos={setTodos}/>
            </Route>
            <Route exact path='/'>
             <AllTodo todos={todos} setTodos={setTodos}/>
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
