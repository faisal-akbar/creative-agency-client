import React from 'react';
import faker from 'faker';

const ClientFeedbackItem = ({ review }) => {
  return (
    <div className='col-md-4 text-center feedback-card mb-4'>
      <div className='d-flex flex-column text-left mb-4 card h-100 p-3'>
        <div className='d-flex align-items-center mb-2'>
          {review.img === undefined || review.img === '' ? (
            <img
              style={{ width: '20%' }}
              className='mr-2 rounded-circle'
              src={faker.image.avatar()}
              alt=''
            />
          ) : (
            <img
              style={{ width: '20%' }}
              className='mr-2 rounded-circle'
              src={review.img}
              alt=''
            />
          )}

          <div>
            <h5>{review.name}</h5>
            <small>{review.designation}</small>
          </div>
        </div>
        <div>{review.description}</div>
      </div>
    </div>
  );
};

export default ClientFeedbackItem;
