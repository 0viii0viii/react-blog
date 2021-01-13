import React, { useCallback, useEffect, useState } from 'react';
import {
  Collapse,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginModal from '../components/auth/LoginModal';
import {
  LOGOUT_REQUEST,
  POST_WRITE_REQUEST,
  PROFILE_EDIT_REQUEST,
} from '../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import RegisterModal from './auth/RegisterModal';
import SearchInput from './search/searchInput';

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { isAuthenticated, user, userRole } = useSelector(
    (state) => state.auth
  );

  console.log(userRole, 'UserRole');

  const dispatch = useDispatch();
  //dispatch 값이 들어오면 callback function이 실행
  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);
  //로그인후 dropdown 초기화

  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addPostClick = () => {
    dispatch({
      type: POST_WRITE_REQUEST,
    });
  };

  const profileClick = () => {
    dispatch({
      type: PROFILE_EDIT_REQUEST,
    });
  };
  const authLink = (
    <>
      <NavItem>
        {userRole === 'Master' ? (
          <Form className="col mt-3">
            <Link
              to="post"
              className="btn btn-white block text-dark px-3"
              onClick={addPostClick}
            >
              글쓰기
            </Link>
          </Form>
        ) : (
          ''
        )}
      </NavItem>
      <NavItem className="d-flex justify-content-center px-3">
        <NavItem>
          <Dropdown
            size="md"
            isOpen={dropdownOpen}
            toggle={toggle}
            className="col mt-3"
          >
            <DropdownToggle
              className="bg-light text-dark btn-outline-light"
              caret
            >
              더 보기
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>
                {' '}
                {user && user.name ? (
                  <Link className="text-dark text-decoration-none">
                    {user ? `${user.name}` : ''}
                  </Link>
                ) : (
                  <Link outline color="light" className="px-3" block>
                    <strong>No User</strong>
                  </Link>
                )}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                {user && user.name ? (
                  <Link
                    to={`/user/${user.name}/profile`}
                    onClick={profileClick}
                    className="text-dark text-decoration-none"
                  >
                    프로필
                  </Link>
                ) : (
                  ''
                )}
              </DropdownItem>
              <DropdownItem onClick={onLogout}>로그아웃</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavItem>
      </NavItem>
    </>
  );

  const authLinkMobile = (
    <>
      <NavItem className="mt-3 mb-1">
        {user && user.name ? (
          <Link className="text-dark text-decoration-none px-3 mt-3 ml-3">
            {user ? `${user.name}` : ''}
          </Link>
        ) : (
          <Link outline color="light" className="px-3 ml-3" block>
            <strong>No User</strong>
          </Link>
        )}
      </NavItem>
      <DropdownItem divider />
      <NavItem>
        {userRole === 'Master' ? (
          <Form className="col mt-1">
            <Link
              to="post"
              className="btn btn-white block text-dark px-3"
              onClick={addPostClick}
            >
              글쓰기
            </Link>
          </Form>
        ) : (
          ''
        )}
      </NavItem>
      <NavItem className="mt-3">
        {user && user.name ? (
          <Link
            to={`/user/${user.name}/profile`}
            onClick={profileClick}
            className="text-dark text-decoration-none px-3 ml-3"
          >
            프로필
          </Link>
        ) : (
          ''
        )}
      </NavItem>
    </>
  );

  const guestLink = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  );
  return (
    <>
      <Navbar color="light" expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className="text-dark text-decoration-none">
            아스날 커뮤니티
          </Link>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <SearchInput isOpen={isOpen} />
            <Nav className="ml-auto d-flex justify-content-around" navbar>
              {isAuthenticated ? authLink : guestLink}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
