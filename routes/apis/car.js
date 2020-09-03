const express = require("express");
const router = express.Router();

const passport = require("passport");

router.use(passport.authenticate("jwt"));
router.get("/", function (req, res, next) {
  console.log("-------");
  console.log(req.user);
  res.send("결과");
});

module.exports = router;
