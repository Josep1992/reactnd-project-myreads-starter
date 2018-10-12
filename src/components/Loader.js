import React from 'react';
import Logo from '../images/Loader.svg';

const Loader = () => (
  <img
    src={Logo}
    alt="Loading Books"
    style={{
      display: 'block',
      width: 300,
      margin: '70px auto',
      height: 'auto',
    }}
  />
);

export default Loader;
