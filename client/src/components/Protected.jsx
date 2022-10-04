import React, { useState } from 'react';
import { ApiService } from '../core/api.service';

const Protected = () => {
  const api = new ApiService();
  const [content, setContent] = useState('');

  const handleProtected = () => {
    api
      .get('/protected')
      .then((content) => setContent(content))
      .catch((err) => setContent(err.response.data.message));
  };

  return (
    <div className="box">
      <div className="content">
        <h2 className="text-center">
          {content ? content : 'Click to see result'}
        </h2>
        <button className="btn" onClick={handleProtected}>
          Get protected resources
        </button>
      </div>
    </div>
  );
};

export default Protected;
