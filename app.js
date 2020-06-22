const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const hbs = require('hbs');
const app = express();

const mainRouter = require('./routes/main');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const addPostRouter = require('./routes/addpost');

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/soloproject', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cookieParser());
app.use(session({ key: 'sid', secret: 'keyboardcat', resave: false, saveUninitialized: true, cookie: { secure: false } }));
app.use((req, res, next) => {
  res.locals.temp = !!req.session.user;
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/', mainRouter )
app.use('/news', indexRouter);
app.use('/news/login', loginRouter);
app.use('/news/logout', logoutRouter);
app.use('/news/addpost', addPostRouter);

app.use(logger('dev'));
app.listen(3000); 
