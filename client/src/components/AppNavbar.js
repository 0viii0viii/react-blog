import React from 'react'
import { Collapse, Container, Nav, Navbar, NavbarToggler } from 'reactstrap'
import { Link } from 'react-router-dom';

const AppNavbar = () => {
    return(
    <>
      <Navbar color="dark" expand="lg" className="sticky-top">
          <Container>
            <Link to='/' className='text-white text-decoration-none'>
                React Blog by 0viii0viii
            </Link>
         
          <NavbarToggler />
          <Collapse isOpen={true} navbar>
            <Nav className="ml-auto d-flex justify-content-around" navbar>
            {true ? (
            <h1 className='text-white'>authLink</h1>
             ) : (
             <h1 className='text-white'>guestLink</h1>
             )}
            </Nav>          
          </Collapse>
          </Container>
      </Navbar>
    </>
    )
};

export default AppNavbar;