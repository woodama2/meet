import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loader = () => (
  <div className="loader">
    <TailSpin height="100" width="100" color="#4fa94d" ariaLabel="loading" />
  </div>
);

export default Loader;
