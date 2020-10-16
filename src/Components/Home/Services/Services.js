import React, { useEffect, useState } from 'react';
import ServiceDetail from '../ServiceDetail/ServiceDetail';
import './Services.css';
import PreLoader from '../../PreLoader/PreLoader';

const Services = () => {
  // loader
  const [loading, setLoading] = useState(true);

  // Set data using hook:
  const [serviceData, setServiceData] = useState([]);

  // Get data from API and set the data:
  useEffect(() => {
    fetch('https://creative-agency-react.herokuapp.com/services')
      .then((res) => res.json())
      .then((data) => {
        setServiceData(data);
        setLoading(false);
      });
  }, []);

  return (
    <section className='services-container'>
      <div className='text-center'>
        <h3 style={{fontSize:'34px', fontWeight:'600px'}}>
          Provide Awesome <span style={{ color: '#7AB259' }}>services</span>
        </h3>
      </div>
      <div className='d-flex justify-content-center'>
        <div className='w-75 row mt-2 pt-5 justify-content-center justify-content-between'>
          <PreLoader loading={loading} />
          {serviceData.map((service) => (
            <ServiceDetail service={service} key={service._id}></ServiceDetail>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
