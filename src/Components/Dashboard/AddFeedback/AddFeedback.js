import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import { loggedInInfo } from '../../Login/loginManager';
// ========================================================

const AddFeedback = () => {
  // Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // Logged in user info from session storage:
  const loggedInUserInfo = loggedInInfo();

  // handle redirected to home
  let history = useHistory();
  function handleEventUpdate() {
    history.push('/');
  }

  // handle Add Review:
  const onSubmit = (data) => {
    const newReview = { ...data };
    newReview.img = loggedInUser.email
      ? loggedInUser.photo
      : loggedInUserInfo.picture;

    fetch('https://creative-agency-react.herokuapp.com/addReview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          handleEventUpdate();
        }
      });
  };

  // React hook form for validation and error message
  const { register, handleSubmit, errors } = useForm();

  return (
    <div className='rounded my-4 mx-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='client-form'>
        <div className='row'>
          <div className='col-md-6 p-4'>
            <div className='form-group'>
              <input
                className='form-control'
                defaultValue={loggedInUser.name}
                name='name'
                type='text'
                placeholder='Your Name'
                ref={register({ required: true })}
              />
              {errors.name && <span className='error'>Name is required</span>}
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                name='designation'
                type='text'
                placeholder='Company’s name, Designation'
                ref={register({ required: true })}
              />
              {errors.designation && (
                <span className='error'>Company’s name, Designation</span>
              )}
            </div>

            <div className='form-group'>
              <textarea
                className='form-control'
                name='description'
                placeholder='Description'
                rows='4'
                ref={register({ required: true })}
              ></textarea>

              {errors.description && (
                <span className='error'>Description is required</span>
              )}
            </div>

            <div className='text-left'>
              <button type='submit' className='btn btn-brand'>
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* <button className="btn btn-warning" onClick={onSubmit}>Add Bulk</button> */}
    </div>
  );
};

export default AddFeedback;
