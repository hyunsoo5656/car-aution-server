const express = require("express");
const router = express.Router();
//파일 업로드 미들웨어
const multer = require("multer");
//파일 어디에 저장, 파일 크기, 확장자
const upload = multer({
  dest: "uploads",
  // limits:"",
  // fileFilter : () = > {
});

//인증 미들웨어
const passport = require("passport");

router.use(passport.authenticate("jwt"));

// upload.array("<fieldName>", num_of_files) 여러개 파일
router.post("/", upload.single("carImage"), function (req, res, next) {
  const { modelName, year, manufacturer, vin } = req.body;
  const carImage = req.file;
  console.log(req.file);
  console.log(req.body);

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
