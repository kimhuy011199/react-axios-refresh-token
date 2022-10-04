const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const app = express();

app.use(cors(config.clientURL));

app.use(bodyParser.json());

app.use('/api', require('./routes'));

app.listen(config.port, () =>
  console.log(`Server runs on port ${config.port}`)
);
