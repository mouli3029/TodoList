import React,{useState,useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { logoutAllUser, setTokenUser } from '../../apicalls/user';
const NavContainer = styled.nav`
  background-color : #242B2E;
  width : 100%;
  height : 50px;
  display : flex;
  align-items : center;
  justify-content : space-between;
`;
const NavItem = styled.div`
 padding : 20px;
 color : white;
 text-decoration : none; 
`

const NavItemsLeft = styled.div`
display : flex;
`
const NavItemsRight = styled.div`
display : flex;
color : white

`
const NavComponent =  ({user,setUser}) => {
  const history = useHistory();

  /* useEffect(() => {
    console.log("In USeEFFEct")
    setUser(window.localStorage.getItem('user'))
    console.log(user)
  }, [user]) */
  const handleClick = (e) => {
    console.log("Logging out");
    setTokenUser(window.localStorage.getItem('token'))
    logoutAllUser();
    setUser(null);
    history.push('/login')
    console.log(user)
    }
    return (
        <NavContainer>
          <NavItemsLeft>
            <NavItem>
              <Link style={{color:'white',textDecoration:"none"}} to="/"> AllTodos</Link>
            </NavItem>
            <NavItem>
              <Link style={{color:'white',textDecoration:"none"}}  to="/addTodo">AddTodo</Link>
            </NavItem>
          </NavItemsLeft>
          <NavItemsRight>
            {user === null?
            <>
              <NavItem>
                <Link style={{color:'white',textDecoration:"none"}} to="/login">Login</Link>
              </NavItem>
              <NavItem>
                <Link  style={{color:'white',textDecoration:"none"}}  to="/register">Register</Link>
              </NavItem>
            </>
             :
             <NavItem>
              <button style={{border : "none",color :"white",backgroundColor : "#242B2E"}} onClick={handleClick}>
                 Logout
              </button>
           </NavItem>
             }
          </NavItemsRight>
        </NavContainer>
    )
}

export default NavComponent;