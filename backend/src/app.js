const express = require('express');
const cors = require('cors');

const aiRoute = require('./routes/ai.routes');
const authRoute = require('./routes/auth.routes'); // ✅ ADD THIS

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/ai', aiRoute);
app.use('/auth', authRoute); // ✅ REGISTER ROUTE HERE

module.exports = app;
