const express = require("express");
const router = express.Router();
// 파일 업로드 미들웨어
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    // 시간 기반에서 난수생성
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, `${uniqueSuffix}.${ext}`);
  },
});
const upload = multer({
  storage: diskStorage,
  limits: {
    fieldSize: 50 * 1024 * 1024, // 50MB
  },
});

// 인증 미들웨어
const passport = require("passport");
router.use(passport.authenticate("jwt"));

// upload.array("<fieldName>", num_of_files )

const CarModel = require("../../models").Car;

/*
 * POST /car     register my car
 */

router.post("/", upload.single("carImage"), async function (req, res, next) {
  // console.log(req.file)
  const { modelName, year, manufacturer, vin } = req.body;
  const carImage = req.file;
  // console.log(carImage);

  const car = await CarModel.create({
    modelName: modelName,
    year: year,
    manufacturer: manufacturer,
    vin: vin,
    ownerId: req.user.id,
    // image: carImage.path,
  });
  // console.log(req.body)
  res.json({
    result: "success",
    message: JSON.stringify({
      id: car.id,
      modelName: car.modelName,
      year: car.year,
      manufacturer: car.manufacturer,
      vin: car.vin,
      image: car.image,
    }),
  });
});

router.get("/", async function (req, res, next) {
  const carList = await CarModel.findAll({});
  console.log("-----");
  console.log(req.user);

  res.json(carList);
});

/*
 * GET /car     register my car
 */

router.get("/", async (req, res, next) => {
  const carList = await CarModel.findAll({
    where: {
      ownerId: req.user.id,
    },
  });
  res.json(carList);
});

/*
 * GET /car     get Car Detail // auction
 */

router.get("/:id", async function (req, res, next) {
  const car = await CarModel.findOne({
    inclued: "inAuction",
    where: {
      id: req.params.id,
    },
  });
  res.json(car);
});

module.exports = router;
