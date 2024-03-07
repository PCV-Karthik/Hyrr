const tryCatch = require("../utils/tryCatch");
const Post = require("../models/postModel");


const fetchPosts = tryCatch(async (req, res, next) => {
  console.log("fetchPosts");
  const data = await Post.find();
  console.log(data);
  res.send(data);
});

module.exports = {fetchPosts};
