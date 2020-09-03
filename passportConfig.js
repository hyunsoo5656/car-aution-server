const passport = require("passport");
const passportJWT = require("passport-jwt");
const passportLocal = require("passport-local");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;

const UserModel = require("./models").User;
const bcrypt = require("bcryptjs");

// Strategy(<option>, callback_func)

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      // login 체크
      try {
        // mysql2.query("SELECT")
        const user = await UserModel.findOne({
          where: {
            email: email,
          },
        });
        // 로그인 실패 시,
        if (!user) {
          return done(null, false, {
            message: "가입되지 않은 E-mail 주소입니다.",
          });
        }
        const isValid = bcrypt.compareSync(password, user.password);

        // 로그인 성공 시,
        if (isValid) {
          const userData = {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            name: user.name,
          };
          return done(null, userData, { message: "로그인 성공!" });
        } else {
          return done(null, false, { message: "비밀번호가 옳지 않습니다!" });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    async function (jwtPayload, done) {
      const user = await UserModel.findByPk(jwtPayload.id);
      if (user) {
        const userData = {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          name: user.name,
          updatedAt: user.updatedAt,
        };
        done(null, user);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // session에 넣을 user
  //   console.log("Serialize");
  //   console.log(user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // session에서 user get
  //   console.log("Deserialize");
  //   console.log(user);
  done(null, user);
});

module.exports = passport;
