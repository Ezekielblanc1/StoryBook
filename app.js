const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('./models/User');
const auth = require('./routes/auth');
const index = require('./routes/index')


//Load keys

const keys = require('./config/keys')

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI)
  .then(() => {
    console.log('MongoDB conected')
  }).catch(err => console.log(err))


const app = express();

//Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars')
//Passport config
require('./config/passport')(passport);


app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//Global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
})

app.use('/', index)
app.use('/auth', auth);


const port = process.env.PORT || 3000;



app.listen(port, () => {
  console.log(`app running on port ${port}`)
})