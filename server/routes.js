const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('./config');
const tokenList = {};

// api/status
router.get('/status', (req, res) => {
  res.status(200).json('Server status 200');
});

// api/login
router.post('/login', (req, res) => {
  const { email, name } = req.body;
  const user = { email, name };

  const token = jwt.sign(user, config.accessTokenSecret, {
    expiresIn: config.accessTokenLife,
  });
  const refreshToken = jwt.sign(user, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenLife,
  });

  const response = {
    user,
    token: token,
    refreshToken: refreshToken,
  };
  tokenList[refreshToken] = response;

  res.status(200).json(response);
});

// api/refreshtoken
router.post('/refreshtoken', (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken && refreshToken in tokenList) {
    const { user } = tokenList[refreshToken];
    const token = jwt.sign(user, config.accessTokenSecret, {
      expiresIn: config.accessTokenLife,
    });

    tokenList[refreshToken].token = token;

    const response = { token: token };

    res.status(200).json(response);
  } else {
    res.status(404).json({
      error: true,
      message: 'Invalid refresh token',
    });
  }
});

// api/protected
router.get('/protected', require('./middleware'), (req, res) => {
  res.status(200).json('Access protected resources');
});

module.exports = router;
