const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('partials/login');
});

router.post('/reg', async (req, res) => {
  if (req.body.password == req.body.passwordTwo) {
    const temp = await User.findOne({ email: req.body.email })
    if (temp) {
      let err = 1
      res.render('partials/login',{err})
      //res.send('Такой e-mail уже существует, воспользуйтесь формой "Войти" <a href="http://localhost:3000/login">Войти</a> ');
    } else {
      const newUser = await new User({ name: req.body.userName, email: req.body.email, password: req.body.password })
      newUser.save();
      req.session.user = newUser.name
      res.locals.temp = req.session.user;
      res.locals.name = newUser.name;
      let name = newUser.name;
      res.cookie('name', name);
      res.cookie('id', newUser._id);
      res.redirect('/');
    }
  }
});

router.post('/log', async (req, res) => {
  let userTemp = await User.findOne({ email: req.body.email });
  if (req.body.password == userTemp.password) {
    req.session.user = userTemp.name;
    res.locals.temp = req.session.user;
    res.locals.name = userTemp.name;
    let name = userTemp.name;
    res.cookie('name', name);
    res.cookie('id', userTemp._id);
    res.redirect('/')
  } else {
    let errLogin = 1;
    res.render('partials/login',{errLogin});
  };
});

module.exports = router;
