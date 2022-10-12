const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const config = require("./config/database");
const path = require("path");
const user = require("./routes/auth")(router);
const realEstate = require("./routes/realestates")(router);
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log("Not connected");
  } else {
    console.log("Connected " + config.db);
  }
});

//Middleware
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/uploads", express.static("uploads"));
app.use(express.static(__dirname + "/real-estate/dist/real-estate"));
app.use("/user", user);
app.use("/realEstate", realEstate);

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname + "/real-estate/dist/real-estate/index.html")
  );
});

app.listen(3000, () => {
  console.log("Port open on 3000");
});
