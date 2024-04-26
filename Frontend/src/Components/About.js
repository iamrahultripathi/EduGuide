import React from 'react';
import './About.css';
import pic1 from '../assets/pic1.png';
import pic2 from '../assets/pic2.png';
import pic3 from '../assets/pic3.png';
import pic4 from '../assets/pic4.png';
import pic5 from '../assets/pic5.png';

const About = () => {
  return (
    <div className="about-container">
      <img src={pic1} alt="Pic1" className="about-image-1" />
      <img src={pic2} alt="Pic2" className="about-image-2" />
      <img src={pic5} alt="Pic5" className="about-image-5" />
      <img src={pic4} alt="Pic4" className="about-image-4" />
      <img src={pic3} alt="Pic3" className="about-image-3" />
    </div>
  );
};

export default About;
