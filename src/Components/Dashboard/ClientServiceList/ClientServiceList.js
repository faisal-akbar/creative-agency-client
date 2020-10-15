import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import './ClientServiceList.css';
import PreLoader from '../../PreLoader/PreLoader';
import ClientServiceItem from './ClientServiceItem';
import { loggedInInfo } from '../../Login/loginManager';
//======================================================================

const ClientServiceList = () => {
  // Set state for loggedInUser:
  const [clientServices, setClientServices] = useState([]);

  // Logged in user Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // logged User info from session
  const loggedUser = loggedInInfo();

  //PreLoader visibility
  const [preLoaderVisibility, setPreLoaderVisibility] = useState('block');

  // Dynamically filter loggedInUser data from API:
  useEffect(() => {
    fetch(
      'https://creative-agency-react.herokuapp.com/clientServices?email=' +
        loggedUser.email,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClientServices(data);
        setPreLoaderVisibility('none');
      });
  }, [loggedUser.email]);

  return (
    <div className='container mt-5'>
      <div className='row'>
        <PreLoader visibility={preLoaderVisibility} />
        {clientServices.map((service) => (
          <ClientServiceItem key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ClientServiceList;

// When user Click on Cancel update the userDashboard view:
// const handleDeleteUpdate = () => {
//   fetch(
//     'https://volunteer-network-react.herokuapp.com/userTasks?email=' +
//       loggedInUser.email,
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => setUserTasks(data));
// };
