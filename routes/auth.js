const User = require("../model/user");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const bcrypt = require("bcrypt");

module.exports = (router) => {
  router.post("/register", async (req, res) => {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = hashPassword;

    if (!name) {
      res.json({ success: false, message: "You need to enter a name." });
    } else if (!email) {
      res.json({ success: false, message: "You need to enter a email." });
    } else if (!mobile) {
      res.json({ success: false, message: "You need to enter your number." });
    } else if (!password) {
      res.json({ success: false, messag: "You need to enter your password." });
    } else {
      let newUser = new User({
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        mobile: mobile,
        password: password,
      });

      newUser.save((err) => {
        if (err) {
          console.log(1);
          if (err.code === 11000) {
            console.log(2);
            res.json({ success: false, message: "User already created..." });
          } else {
            if (err.errors) {
              console.log(3);
              if (err.errors.name) {
                console.log(4);
                res.json({
                  success: false,
                  meesage: err.errors.name.meesage,
                });
              } else if (err.errors.email) {
                console.log(5);
                res.json({
                  success: false,
                  message: err.errors.email.meesage,
                });
              } else if (err.errors.password) {
                console.log(6);
                res.json({
                  success: false,
                  message: err.errors.password.meesage,
                });
              }
            } else {
              res.json({ success: false, message: "Fatal error!" });
            }
          }
        } else {
          res.json({ success: true, message: "Success." });
        }
      });
    }
  });

  router.get("/checkEmail/:email", (req, res) => {
    if (!req.params.email) {
      res.json({ success: false, message: "Email must be provided" });
    }
    {
      User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
          res.json({ success: false, meessage: err });
        } else if (user) {
          res.json({ success: false, message: "Email is already taken..." });
        } else {
          res.json({ success: true, message: "Email is available" });
        }
      });
    }
  });

  router.post("/login", (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (error, user) => {
      if (error) {
        console.log(error);
      } else {
        if (!user) {
          res.status(401).send("Invalid email");
        } else {
          if (user.password !== userData.password) {
            res.status(401).send("Invalid password");
          } else {
            //res.status(200).send(user);
            const token = jwt.sign(
              {
                userid: user._id,
              },
              config.secret,
              { expiresIn: "24h" }
            );

            res.json({
              success: true,
              message: "True",
              token: token,
            });
          }
        }
      }
    });
  });
  /*if (!req.body.email) {
      res.json({ success: false, message: "No email provided" });
    } else if (!req.body.password) {
      res.json({ success: false, message: "No password provided" });
    } else {
      User.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
        if (err) {
          res.json({ success: false, message: err });
        } else if (!req.body.email) {
          res.json({ success: false, message: "User is not found" });
        } else {
          const validPassword = user.comparePassword(req.body.password);

          if (!validPassword) {
            res.json({ success: false, message: "Password doesnt match" });
          } else {
            const token = jwt.sign(
              {
                userid: newUser._id,
              },
              config.secret,
              { expiresIn: "24h" }
            );

            res.json({
              success: true,
              message: "True",
              token: token,
              newUser: { name: newUser.name },
            });
          }
        }
      });
    }*/

  /*router.use((req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      console.log(1);
      res.json({ success: false, message: "No token provided" });
    } else {
      console.log(2);
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          console.log(3);
          res.json({ success: false, message: "Token invalid " + err });
        } else {
          console.log(4);
          req.decoded = decoded;
          next();
        }
      });
    }
  });

  router.get("/profile", (req, res) => {
    res.send(req.decoded);
  });*/

  return router;
};
