import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminContext, AdminContextTemp } from '../../../App';
import PreLoader from '../../PreLoader/PreLoader';
// ==============================================================================

const AdminServiceList = () => {
  // This is table showed in the Admin Dashboard with List of service register
  // Set List of service register:
  const [serviceList, setServiceList] = useState([]);
  const [selectService, setSelectService] = useState({});

    // loader
    const [loading, setLoading] = useState(true);

  // Get all the Volunteer Register
  useEffect(() => {
    fetch('https://creative-agency-react.herokuapp.com/adminServices')
      .then((res) => res.json())
      .then((data) => {
        setServiceList(data);
        setLoading(false);
      });
  }, [serviceList]);

  // Update when admin change status and update the dashboard
  const updateStatus = (status) => {
    const data = { _id: selectService._id, status };
    console.log(selectService, 'status', status);

    fetch(
      `https://creative-agency-react.herokuapp.com/updateServiceStatus/${data._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then((result) => {
        if (result) {
          console.log(result);
        }
      });
  };

  // Allow access to Admin Only
   // Admin context from App.js
   const [isAdmin, setIsAdmin] = useContext(AdminContext);
   const [isAdminTemp, setIsAdminTemp] = useContext(AdminContextTemp);
   let history = useHistory();
  
   // If admin then allow
   useEffect(() => {
     if (isAdmin || isAdminTemp) {
       history.push('/admin-service-lists');
     } 
         else {
       history.push('/');
     }
   }, [history, isAdmin, isAdminTemp]);

  let serialNo = 1;

  return (
    <>
      <div className='table-responsive'>
        <table className='table table-borderless table-hover bg-white rounded my-4'>
          <thead className='thead-light'>
            <tr>
              <th className='text-secondary text-left' scope='col'>
                #
              </th>
              <th className='text-secondary' scope='col'>
                Name
              </th>
              <th className='text-secondary' scope='col'>
                Email ID
              </th>
              <th className='text-secondary' scope='col'>
                Service
              </th>
              <th className='text-secondary' scope='col'>
                Project Details
              </th>
              <th className='text-secondary' scope='col'>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {serviceList.map((service) => (
              <tr key={service._id}>
                <td>{serialNo++}</td>
                <td>{service.name}</td>
                <td>{service.email}</td>
                <td>{service.title}</td>
                <td>{service.description}</td>

                <td className='text-center'>
                  <select
                    onClick={() => setSelectService(service)}
                    onChange={(e) => updateStatus(e.target.value)}
                    className={
                      service.status == 'Pending'
                        ? 'btn btn-danger'
                        : service.status == 'Done'
                        ? 'btn btn-success'
                        : service.status == 'On going'
                        ? 'btn btn-warning'
                        : 'btn btn-dark'
                    }
                  >
                    <option
                      selected={service.status == 'Pending'}
                      className='bg-white text-secondary'
                    >
                      Pending
                    </option>
                    <option
                      selected={service.status == 'On going'}
                      className='bg-white text-secondary'
                    >
                      On going
                    </option>
                    <option
                      selected={service.status == 'Done'}
                      className='bg-white text-secondary'
                    >
                      Done
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PreLoader loading={loading} />
      </div>
    </>
  );
};

export default AdminServiceList;
