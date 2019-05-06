const express = require("express"),
  router = express.Router();

// @route GET api/posts/test
// @desc Tests POST route
// @access Public

router.get("/test", (req, res) =>
  res.json({
    msg: "User Post!"
  })
);

module.exports = router;
