const RealEstate = require("../model/realestate");
const User = require("../model/user");
const config = require("../config/database");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = (router) => {
  router.post("/newEstate", upload.array("productImage", 10), (req, res) => {
    if (!req.body.typeSale) {
      res.json({ success: false, message: "Type of sale needed !" });
    } else if (!req.body.typeEstate) {
      res.json({ success: false, message: "Type of real estate needed !" });
    } else if (!req.body.price) {
      res.json({ success: false, message: "Price needed !" });
    } else if (!req.body.meters) {
      res.json({ success: false, message: "Meters needed!" });
    } else if (!req.body.rooms) {
      res.json({ success: false, message: "Rooms needed !" });
    } else if (!req.body.year) {
      res.json({ success: false, message: "Year needed !" });
    } else {
      let newPost = new RealEstate({
        typeSale: req.body.typeSale,
        typeEstate: req.body.typeEstate,
        price: req.body.price,
        meters: req.body.meters,
        rooms: req.body.rooms,
        year: req.body.year,
        termostat: req.body.termostat,
        drain: req.body.drain,
        pets: req.body.pets,
        parking: req.body.parking,
        createdAt: req.body.createdAt,
        productImage: req.files,
      });

      newPost.save((err) => {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          res.json({ success: true, message: "New Real Estate added !" });
        }
      });
    }
  });

  router.get("/allPosts", (req, res) => {
    RealEstate.find({}, (err, posts) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!posts) {
        res.json({ success: false, message: "No posts..." });
      } else {
        res.json({ success: true, posts: posts });
      }
    }).sort({ _id: -1 });
  });

  return router;
};
