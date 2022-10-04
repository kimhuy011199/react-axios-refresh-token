import React, { useState, useEffect } from 'react';
import { ApiService } from '../core/api.service';

const Status = () => {
  const api = new ApiService();
  const [status, setStatus] = useState('');

  useEffect(() => {
    api
      .get('/status')
      .then((status) => setStatus(status))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return <h2 className="text-center text-3xl font-medium mb-8">{status}</h2>;
};

export default Status;
