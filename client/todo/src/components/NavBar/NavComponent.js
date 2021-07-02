import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const NavContainer = styled.nav`
  background-color : #242B2E;
  width : 100%;
  height : 50px;
  display : flex;
  align-items : center;
`;
const NavItem = styled.div`
 padding : 20px;
 color : white;
 text-decoration : none; 
`
const NavComponent =  () => {
    return (
        <NavContainer>
          <NavItem>
             <Link style={{color:'white',textDecoration:"none"}} to="/"> AllTodos</Link>
          </NavItem>
          <NavItem>
             <Link style={{color:'white',textDecoration:"none"}}  to="/addTodo">AddTodo</Link>
          </NavItem>
        </NavContainer>
    )
}

export default NavComponent;