import React, { useState } from 'react';
import { ApiService } from '../core/api.service';
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from '../core/auth.service';

const Login = () => {
  const api = new ApiService();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLogined, setIsLogined] = useState(!!getAccessToken());

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { name, email };
    api
      .post('/login', body)
      .then((data) => {
        const { token, refreshToken } = data;
        setAccessToken(token);
        setRefreshToken(refreshToken);
        setIsLogined(true);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    removeAccessToken();
    removeRefreshToken();
    setIsLogined(false);
  };

  return (
    <div className="box">
      {!isLogined ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            placeholder="Name"
            type="text"
            value={name}
            required
            onChange={handleNameChange}
            className="input"
          />
          <input
            placeholder="Email"
            type="text"
            value={email}
            required
            onChange={handleEmailChange}
            className="input"
          />
          <button className="btn" type="submit">
            Login
          </button>
        </form>
      ) : (
        <div className="content">
          <p className="text-center">Logined</p>
          <button className="btn" disabled={!isLogined} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
