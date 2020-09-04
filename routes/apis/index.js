const express = require("express");
const router = express.Router();
const authRouter = require("./auth");

const carRouter = require("./car");

const auctionRouter = require("./auction");

router.use("/auth", authRouter);
router.use("/car", carRouter);
router.use("/auction", auctionRouter);

module.exports = router;
