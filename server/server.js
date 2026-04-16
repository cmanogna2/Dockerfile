const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

const uploadRoute = require('./routes/upload');

app.use('/api/upload', uploadRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});