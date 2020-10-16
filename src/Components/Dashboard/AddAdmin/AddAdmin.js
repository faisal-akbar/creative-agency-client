import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AdminContext, AdminContextTemp, UserContext } from '../../../App';
// ========================================================

const AddAdmin = () => {
  // Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // handle redirected to home
  let history = useHistory();
  function handleAdminUpdate() {
    history.push('/');
  }

  // handle Add admin when form Submit:
  const onSubmit = (data) => {
    const newAdmin = { ...data };
    console.log('new ad', newAdmin);

    fetch('https://creative-agency-react.herokuapp.com/addAdmin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAdmin),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          handleAdminUpdate();
        }
      });
  };

    // Allow access to Admin Only
  // Admin context from App.js
  const [isAdmin, setIsAdmin] = useContext(AdminContext);
  const [isAdminTemp, setIsAdminTemp] = useContext(AdminContextTemp);
  
  // If admin then allow
  useEffect(() => {
    if (isAdmin || isAdminTemp) {
      history.push('/makeAdmin');
    } else {
      history.push('/');
    }
  }, [history, isAdmin, isAdminTemp]);

  // handle redirected to home
  function handleServiceUpdate() {
    history.push('/');
  }

  // React hook form for validation and error message
  const { register, handleSubmit, errors } = useForm();

  return (
    <div className='rounded bg-white my-4 mx-4 p-4'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
          <div className='col-md-6 d-flex'>
            <div className='form-group mr-3 w-100'>
              <input
                className='form-control'
                name='email'
                type='email'
                placeholder='admin@creative.com'
                ref={register({ required: true })}
              />
              {errors.email && <span className='error'>Email is required</span>}
            </div>

            <div className='text-left'>
              <button type='submit' className='btn btn-success'>
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* <button className="btn btn-warning" onClick={handleAddEvent}>Add Bulk</button> */}
    </div>
  );
};

export default AddAdmin;
