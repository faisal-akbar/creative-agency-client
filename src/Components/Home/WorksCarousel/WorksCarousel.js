import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './WorksCarousel.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import carousel_1 from '../../../assets/images/carousel-1.png';
import carousel_2 from '../../../assets/images/carousel-2.png';
import carousel_3 from '../../../assets/images/carousel-3.png';
import carousel_4 from '../../../assets/images/carousel-4.png';
import carousel_5 from '../../../assets/images/carousel-5.png';

const WorksCarousel = () => {
  
    const projectData = [
      {
        img: carousel_2,
      },
      {
        img: carousel_3,
      },
      {
        img: carousel_4,
      },
      {
        img: carousel_5,
      },
      {
        img: carousel_1,
      },
    ];
  
    const settings = {
      dots: true,
      arrows: false,
      speed: 700,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 2,
      slidesToScroll: 1,
      pauseOnHover: true,
      infinite: true,
      centerMode: true,
      centerPadding: "150px",
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            centerPadding: "80px",
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            centerMode: false,
          },
        },
      ],
    };
  
    return (
      <section className="works-area py-5">
        <h3 className='text-center pt-xl-5' style={{fontSize: '34px', fontWeight:'600'}}>
        <span className='text-white'>Here are some of </span>
        <span style={{ color: '#7AB259' }}>our works</span>
      </h3>
        <div className="py-xl-5 py-2">
          <Slider {...settings} className="pt-3 pb-5">
            {projectData.map((project) => (
              <div className="project-slide img-fluid" key={Math.random()}>
                <img src={project.img} />
              </div>
            ))}
          </Slider>
        </div>
      </section>
    );
  };
  
  export default WorksCarousel;