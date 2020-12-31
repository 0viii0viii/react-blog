import React, { useCallback, useEffect, useState } from 'react'
import { Collapse, Container, Nav, Navbar, NavbarToggler } from 'reactstrap'
import { Link } from 'react-router-dom';
import LoginModal from '../components/auth/LoginModal';
import { LOGOUT_REQUEST } from '../redux/types';
import { useDispatch, useSelector } from 'react-redux';

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {isAuthenticated, user, userRole} = useSelector((state)=>state.auth)

    console.log(userRole, "UserRole");

    const dispatch = useDispatch();
//dispatch 값이 들어오면 callback function이 실행
    const onLogout = useCallback(()=> {
        dispatch({
            type: LOGOUT_REQUEST,

        })
    }, [dispatch])
//로그인후 dropdown 초기화
    useEffect(()=> {
        setIsOpen(false)
    },[user])

    const handleToggle = ()=> {
        setIsOpen(!isOpen)
    }

    return(
    <>
      <Navbar color="dark" expand="lg" className="sticky-top">
          <Container>
            <Link to='/' className='text-white text-decoration-none'>
                React Blog by 0viii0viii
            </Link>
         
          <NavbarToggler onClick={handleToggle}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto d-flex justify-content-around" navbar>
            {isAuthenticated ? (
            <h1 className='text-white'>authLink</h1>
             ) : (
                   <LoginModal />
             )}
            
            </Nav>          
          </Collapse>
          </Container>
      </Navbar>
    </>
    )
};

export default AppNavbar;