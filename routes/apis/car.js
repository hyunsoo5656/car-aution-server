const express = require("express");
const router = express.Router();
//파일 업로드 미들웨어
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
    const uniqeSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, `${uniqueSuffix}.${ext}`);
  },
});
//파일 어디에 저장, 파일 크기, 확장자
const upload = multer({
  dest: "uploads",
  storage: diskStorage,
  limits: {
    fieldSize: 50 * 1024 * 1024, // byte => 50MB
  },
  // fileFilter : () = > {
});

//인증 미들웨어
const passport = require("passport");

router.use(passport.authenticate("jwt"));

// upload.array("<fieldName>", num_of_files) 여러개 파일
router.post("/", upload.single("carImage"), function (req, res, next) {
  const { modelName, year, manufacturer, vin } = req.body;
  const carImage = req.file;
  // console.log(req.file);
  // console.log(req.body);
  console.log(carImage);
  res.json({
    result: "success",
  });
});

router.get("/", function (req, res, next) {
  console.log("-------");
  console.log(req.user);
  res.send("결과");
});

module.exports = router;
