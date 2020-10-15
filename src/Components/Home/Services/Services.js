import React, { useEffect, useState } from 'react';
import ServiceDetail from '../ServiceDetail/ServiceDetail';
import './Services.css';
import PreLoader from '../../PreLoader/PreLoader';

const Services = () => {
  // Set data using hook:
  const [serviceData, setServiceData] = useState([]);

  //PreLoader visibility
  const [preLoaderVisibility, setPreLoaderVisibility] = useState('block');

  // Get data from API and set the data:
  useEffect(() => {
    fetch('https://creative-agency-react.herokuapp.com/services')
      .then((res) => res.json())
      .then((data) => {
        setServiceData(data);
        setPreLoaderVisibility('none');
      });
  }, []);

  return (
    <section className='services-container'>
      <div className='text-center'>
        <h3>
          Provide Awesome <span style={{ color: '#7AB259' }}>service</span>
        </h3>
      </div>
      <div className='d-flex justify-content-center'>
        <div className='w-75 row mt-2 pt-5 mx-auto justify-content-center'>
          <PreLoader visibility={preLoaderVisibility} />
          {serviceData.map((service) => (
            <ServiceDetail service={service} key={service._id}></ServiceDetail>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
