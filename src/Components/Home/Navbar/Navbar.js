import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../../../assets/images/logos/logo.png';
import { Link } from 'react-router-dom';
import { AdminContext, AdminContextTemp, UserContext } from '../../../App';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { handleSignOut, isLoggedIn } from '../../Login/loginManager';
//=============================================================================

const Navbar = () => {
  // Context from App.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useContext(AdminContext);
  const [isAdminTemp, setIsAdminTemp] = useContext(AdminContextTemp);

  // is logged in
  const isLogged = isLoggedIn();

  // Handle sign out button
  const signOut = () => {
    setLoggedInUser({});
    sessionStorage.removeItem('token');
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light '>
      <Link to='/' className='navbar-brand' href='#'>
        <img src={logo} alt='creative-agency' />
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNavAltMarkup'
        aria-controls='navbarNavAltMarkup'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
        <div className='navbar-nav  justify-content-between nav-link ml-auto align-items-md-center'>
          {/* Home Navigation Click redirect to home */}
          <Link to='/home' className='nav-link active'>
            Home
          </Link>
          <Link to='/donation' className='nav-link' href='#'>
            Donation
          </Link>
          <Link to='/events' className='nav-link' href='#'>
            Events
          </Link>
          <Link to='/blog' className='nav-link' href='#'>
            Blog
          </Link>

          {(loggedInUser.email || isLogged) && (
            <Link
              to={
                isAdminTemp || isAdmin
                  ? '/admin-service-lists'
                  : '/service-lists'
              }
              className='nav-link'
            >
              <button
                type='button'
                className={
                  isAdminTemp || isAdmin
                    ? 'btn btn-dark w-100'
                    : 'btn btn-info w-100'
                }
              >
                {isAdminTemp || isAdmin ? 'Admin' : 'Dashboard'}
              </button>
            </Link>
          )}

          {/* If user is not logged in show Login else Sign out  */}
          {loggedInUser.email || isLogged ? (
            <Link to='/' className='nav-link'>
              <button
                onClick={signOut}
                type='button'
                className='btn btn-danger w-100'
              >
                Sign Out
              </button>
            </Link>
          ) : (
            <Link to='/login' className='nav-link'>
              <button type='button' className='btn btn-brand w-100'>
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
