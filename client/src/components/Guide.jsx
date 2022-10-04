import React from 'react';

const Guide = () => {
  return (
    <ul className="mt-16">
      <li className="list-disc pl-1.5 marker:text-cyan-600">
        If you have not login yet and click Get protected resources, you will
        see No token provided.
      </li>
      <li className="list-disc pl-1.5 marker:text-cyan-600">
        If you logined with name and email, your access token and refresh token
        will be saved in local storage and you can get the protected resources.
      </li>
      <li className="list-disc pl-1.5 marker:text-cyan-600">
        If your access token is expired, Axios Interceptors will refresh your
        access token and get the protected resources again.
      </li>
      <li className="list-disc pl-1.5 marker:text-cyan-600">
        Check token in Application tab and Console tab and check API calls in
        Network tab.
      </li>
    </ul>
  );
};

export default Guide;
