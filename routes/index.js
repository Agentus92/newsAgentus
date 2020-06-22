const express = require('express');
const axios = require('axios');
const router = express.Router();
const Post = require('../models/posts');
const User = require('../models/user');


router.get('/', async (req, res) => {
  const weather = (await axios.get('http://api.weatherstack.com/current?access_key=d47a13d7788b07a35eadcf427701b86d&query=Moscow')).data;
  console.log(weather);
  const arr = await Post.find();
  let { name, id} = req.cookies;
  res.render('index', { arr, name, id, weather});
});

// router.get('/filterTrue', async (req, res) => {
//   const date = new Date;
//   const temp = await Post.find();
//   let arr = [];
//   temp.forEach(elem => {
//     if (elem.dateEnd > date) {
//       arr.push(elem);
//     }
//   });
//   let { name, id } = req.cookies;
//   res.render('index', { arr, name, id });
// });

router.get('/:id/onepost', async (req, res)=> {
  const temp = await Post.findOne({_id:req.params.id});
  console.log(temp)
  res.render('partials/onepost', { temp } );
});

router.get('/:id/profile', async (req, res) => {
  const post = await Post.find({ author: req.params.id });
  let { name, id } = req.cookies;
  res.render('partials/profile', { post, name, id });
});

router.get('/:id/edit', async (req, res) => {
  const post = await Post.findById(req.params.id);
  let { name, id } = req.cookies;
  res.render('partials/edit', { post, name, id });
});

router.patch('/:id/edit', async (req, res) => {
  if(req.session.user){
  const post = await Post.findOne({_id: req.params.id});
  console.log(post);
  post.title = req.body.title;
  post.img = req.body.img;
  post.date = req.body.date;
  post.comment = req.body.addcomment;
  post.video = req.body.video;
  console.log(post);
  post.save();
  res.redirect('/');
} else {res.redirect('/');}
});

router.delete('/:id', async (req, res) => {
  if(req.session.user){
  const temp = await User.findOne({ name: req.session.user })
  await Post.deleteOne({ '_id': req.params.id });
  res.redirect(`/news/${temp._id}/profile`);
  } res.redirect('/');
});

module.exports = router;
