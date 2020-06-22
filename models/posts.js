const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  date:{
    type: Date,
  },
  comment: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  video: {
    type: String,
  },
  authorName: {
    type: String,
  },
})


  module.exports = mongoose.model('Post', postSchema);
