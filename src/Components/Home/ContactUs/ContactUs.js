import React from 'react';
import { useForm } from 'react-hook-form';

const ContactUs = () => {
  // React hook form for extra form validation and error message
  const { register, handleSubmit, errors } = useForm();

  const onSubmit= ()=>{
    console.log('Message Sent')
  }
  return (
    <section style ={{backgroundColor:'#FBD062'}} className='contact-section d-flex justify-content-center align-items-center flex-column mt-5 py-3'>
      <div className='w-75 row mt-3 pt-5 justify-content-between justify-content-center'>
        <div className='col-md-6'>
          <h3>
            Let us handle your <br /> project, professionally.
          </h3>
          <p>
            With well written codes, we build amazing apps for all platforms,
            mobile and web apps in general.
          </p>
        </div>

        <div className='col-md-6'>
          <form onSubmit={handleSubmit(onSubmit)} className='event-form'>
            <div className='form-group'>
              <input
                className='form-control'
                name='email'
                type='email'
                placeholder='Your email address'
                ref={register({ required: true })}
              />
              {errors.email && <span className='error'>Email is required</span>}
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                name='name'
                type='text'
                placeholder='Your name / company’s name'
                ref={register({ required: true })}
              />
              {errors.name && (
                <span className='error'>Name/ company’s name is required</span>
              )}
            </div>
            <div className='form-group'>
              <textarea
                className='form-control'
                name='message'
                placeholder='Your message'
                rows='6'
                ref={register({ required: true })}
              ></textarea>

              {errors.message && (
                <span className='error'>Message is required</span>
              )}
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div>
                  <button type='submit' className='btn btn-brand'>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-12 text-center text-dark mt-5'>
          <p>Copyright Orange Labs {new Date().getFullYear()}</p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
