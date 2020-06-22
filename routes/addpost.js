const router = require('express').Router();
const Post = require('../models/posts');
const User = require('../models/user');


router.get('/', (req, res) => {
  let { name, id } = req.cookies;
  res.render('partials/addpost', { name, id });
});

router.post('/', async (req, res) => {
  const temp = await User.findOne({ name: req.session.user })
  const newPost = await new Post({ title: req.body.title, img: req.body.img, date: req.body.date, comment: req.body.addcomment, author: temp._id, authorName: temp.name, video: "" })
  newPost.save();
  res.redirect(`../news/${temp._id}/profile`);
})

module.exports = router;
