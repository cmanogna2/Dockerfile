require('dotenv').config();  // MUST be at top

const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { id: "123", role: "user" },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

console.log(token);