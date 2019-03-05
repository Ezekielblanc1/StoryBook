const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('./routes/auth');
const app = express();
//Passport config

require('./config/passport')(passport)
const port = process.env.PORT || 3000;

app.get('/', (req, res) =>{
  res.send('it works');
});

app.use('/auth', auth)

app.listen(port, () => {
  console.log(`app running on port ${port}`)
})