const express = require("express");
const router = express.Router();
const Model = require("../../models");
const AuctionModel = Model.Auction;
const CarModel = Model.CarModel;

const AuctionBiddingModel = Model.AuctionBidding;
const passport = require("passport");
router.use(passport.authenticate("jwt"));

/**
 * [auction Register by car Id]
 * body: {minPrice, carId}
 */
router.post("/", async function (req, res, next) {
  const { carId, minPrice } = req.body;
  const auction = await AuctionModel.create({
    minPrice: minPrice,
    carId: carId,
  });
  res.json(auction);
});

/**
 * [get auction list]
 */
router.get("/", async function (req, res, next) {
  const auctionList = await AuctionModel.findAll({
    include: "car",
  });
  res.json(auctionList);
});

/**
 * [get auction detail]
 */
router.get("/:id", async function (req, res, next) {
  const auctionId = req.params.id;
  const auction = await AuctionModel.findOne({
    where: {
      id: auctionId,
    },
    include: ["car", Model.User],
  });
  res.json(auction);
});

/**
 * [offer]
 */
router.post("/offer", async function (req, res, next) {
  const { auctionId, price } = req.body;

  const userId = req.user.id;
  const auction = await AuctionModel.findOne({
    where: {
      id: auctionId,
    },
  });
  if (!(parseFloat(auction.minPrice) <= parseFloat(price))) {
    return res.json({
      result: "fail",
      message: `가격이 같거나 높아야 한다.${auction.minPrice}`,
    });
  } else {
    const auctionBidding = await AuctionBiddingModel.create({
      UserId: userId,
      AuctionId: auctionId,
      price: price,
    });
    res.json(auctionBidding);
  }
});

module.exports = router;
