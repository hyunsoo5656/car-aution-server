const express = require("express");
const router = express.Router();
const authRouter = require("./auth");

const carRouter = require("./car");

router.use("/auth", authRouter);
router.use("/car", carRouter);

module.exports = router;
