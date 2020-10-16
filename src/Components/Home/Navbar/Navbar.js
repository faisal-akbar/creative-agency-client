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
        <ul className='navbar-nav  justify-content-between nav-link ml-auto align-items-md-center'>
          {/* Home Navigation Click redirect to home */}
          <li className="nav-item">
          <Link to='/home' className='nav-link  active mr-3'>
            Home
          </Link>
          </li>
          <li className="nav-item">
          <a className='nav-link mr-3' href='#portfolio'>
           Our Portfolio
          </a>
          </li>
          <li className="nav-item">
          <Link to='/' className='nav-link mr-3' href='#'>
            Our Team
          </Link>
          </li>
          <li className="nav-item">
          <a className='nav-link mr-3' href='#contact'>
            Contact Us
          </a>
          </li>
         

<li className="nav-item">
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
                    ? 'btn btn-dark w-100 px-4'
                    : 'btn btn-info w-100 px-3'
                }
              >
                {isAdminTemp || isAdmin ? 'Admin' : 'Dashboard'}
              </button>
            </Link>
          )}
</li>

<li className="nav-item">
{loggedInUser.email || isLogged ? (
            <Link to='/' className='nav-link'>
              <button
                onClick={signOut}
                type='button'
                className='btn btn-danger w-100 px-3'
              >
                Sign Out
              </button>
            </Link>
          ) : (
            <Link to='/login' className='nav-link'>
              <button type='button' className='btn btn-brand w-100 px-5'>
                Login
              </button>
            </Link>
          )}
</li>
          {/* If user is not logged in show Login else Sign out  */}
      
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
