const express = require("express");
const router = express.Router();
const {fetchPosts} = require("../controllers/postController");

router.route("/").get(fetchPosts);

module.exports = router;