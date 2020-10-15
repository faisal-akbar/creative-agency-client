import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faHdd,
  faCommentAlt,
  faPlus,
  faUserPlus,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { AdminContext, AdminContextTemp, UserContext } from '../../../App';

const Sidebar = () => {
  // Admin context from App.js
  const [isAdmin, setIsAdmin] = useContext(AdminContext);
  const [isAdminTemp, setIsAdminTemp] = useContext(AdminContextTemp);

  return (
    <div className='sidebar d-flex flex-column justify-content-between py-5 px-4'>
      <ul className='list-unstyled'>
        
        {isAdmin || isAdminTemp ? (
          <>
            <li>
              <Link to='/admin-service-lists' className='text-dark'>
                <FontAwesomeIcon icon={faHdd} /> <span>Service List</span>
              </Link>
            </li>
            <li>
              <Link to='/addService' className='text-dark'>
                <FontAwesomeIcon icon={faPlus} /> <span>Add Service</span>
              </Link>
            </li>
            <li>
              <Link to='/makeAdmin' className='text-dark'>
                <FontAwesomeIcon icon={faUserPlus} /> <span>Make Admin</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/order' className='text-dark'>
                <FontAwesomeIcon icon={faShoppingCart} /> <span>Order</span>
              </Link>
            </li>

            <li>
              <Link to='/service-lists' className='text-dark'>
                <FontAwesomeIcon icon={faHdd} /> <span>Service List</span>
              </Link>
            </li>

            <li>
              <Link to='/add-feedback' className='text-dark'>
                <FontAwesomeIcon icon={faCommentAlt} /> <span>Review</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
