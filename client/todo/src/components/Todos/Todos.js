import React,{useState} from 'react';
import { Container, Row,Col } from 'react-bootstrap';
import TodoItem from '../TodoItem/TodoItem';
import styled from 'styled-components'
import { left } from '@popperjs/core';

const Heading = styled.h3`
  letter-spacing : 0.2px;
  font-weight : 700;
  border-bottom : 3px solid #000;
  padding : 20px;
  width : 50%;
  text-align : center;
  margin-bottom : 40px;
`

const AllTodo = ({todos,setTodos}) => {

    return (
      <Container>
        <Row>
          <Col className="d-flex flex-column align-items-center" xs={12} md={6} lg={6}>
          <Heading> Completed </Heading>
          {todos.map(todo => (
            todo.completed ? 
              <TodoItem key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
              : ""
          ))}
          </Col>
          <Col className="d-flex flex-column align-items-center" xs={12} md={6} lg={6}>
          <Heading> Not Completed </Heading>
          {todos.map(todo => (
            todo.completed ? 
              ""
              : 
              <TodoItem key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
          ))}
          </Col>
        </Row>
      </Container>
    )
}

export default AllTodo;