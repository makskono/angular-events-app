const EXPRESS = require("express");
const JWT = require("jsonwebtoken");
const ROUTER = EXPRESS.Router();
const USER = require("../backend/models/user");
const MONGOOSE = require("mongoose");
const PATH = require("path");
const BCRYPT = require("bcryptjs");
require("dotenv").config({ path: PATH.resolve(__dirname, "../.env") });

const DB = process.env.MONGODB_URI;
const CONNECT_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

MONGOOSE.connect(DB, CONNECT_OPTIONS).then(
  () => console.log("Database successfully connected"),
  (err) => console.error("Database could not connected: " + err)
);

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }
  let payload = JWT.verify(token, "secret");
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
}

ROUTER.post("/register", (req, res) => {
  USER.findOne({ email: req.body.email }).then((candidate) => {
    if (candidate) {
      return res.status(401).send("User already exists");
    } else {
      const SALT = BCRYPT.genSaltSync(10);
      const PASSWORD = req.body.password;

      let user = new USER({
        name: req.body.name,
        email: req.body.email,
        password: BCRYPT.hashSync(PASSWORD, SALT),
      });

      user.save((error, registeredUser) => {
        if (error) {
          console.log(error);
        } else {
          let payload = { subject: registeredUser._id };
          let token = JWT.sign(payload, "secret", { expiresIn: "1h" });
          res.status(201).send({ token });
          console.log("Token generated success");
        }
      });
    }
  });
});

ROUTER.post("/login", (req, res) => {
  USER.findOne({ email: req.body.email }).then((user) => {
    if (!user)
      return res.status(400).json({
        msg: "User not exist",
      });

    BCRYPT.compare(req.body.password, user.password, (error, data) => {
      if (error) {
        console.log(error);
      }
      if (data) {
        let payload = { subject: user._id };
        let token = JWT.sign(payload, "secret", { expiresIn: "1h" });
        res.status(200).send({ token });
        //res.status(200).json({ msg: "all ok" });
      } else {
        res.status(401).json({ msg: "Invalid credential" });
      }
    });
  });
});

ROUTER.get("/events", (req, res) => {
  let events = [
    {
      index: 0,
      picture: "https://via.placeholder.com/100/ee6e73/FFFFFF/?text=Angular",
      title: "EXIAND",
      about:
        "Aliquip ex sint laboris esse in excepteur excepteur aliquip. Proident eu commodo deserunt laboris except.\r\n",
      registered: "2021-02-02T19:37:02.036Z",
    },
    {
      index: 1,
      picture: "https://via.placeholder.com/100/ee6e73/FFFFFF/?text=Angular",
      title: "ZIDANT",
      about:
        "Do ut amet magna magna dolore ex. Velit nostrud sit mollit id elit eu aliquip officia magna culpa cons.\r\n",
      registered: "2021-02-02T19:37:02.036Z",
    },
    {
      index: 2,
      picture: "https://via.placeholder.com/100/ee6e73/FFFFFF/?text=Angular",
      title: "COASH",
      about:
        "Lorem aliqua anim eu exercitation labore sunt veniam nostrud ut cupidatat reprehenderit amet.\r\n",
      registered: "2021-02-02T19:37:02.036Z",
    },
    {
      index: 3,
      picture: "https://via.placeholder.com/100/ee6e73/FFFFFF/?text=Angular",
      title: "ATOMICA",
      about:
        "In dolore officia duis laborum. Reprehenderit tempor adipisicing deserunt pariatur eu qui laboris ullamco.\r\n",
      registered: "2021-02-02T19:37:02.036Z",
    },
    {
      index: 4,
      picture: "https://via.placeholder.com/100/ee6e73/FFFFFF/?text=Angular",
      title: "LIMAGE",
      about:
        "Minim sit officia magna id aliquip exercitation non officia Lorem cupidatat cupidatat quis.\r\n",
      registered: "2021-02-02T19:37:02.036Z",
    },
    {
      index: 5,
      picture: "https://via.placeholder.com/100/ee6e73/FFFFFF/?text=Angular",
      title: "MEDIFAX",
      about:
        "Mollit do duis irure tempor ea mollit proident commodo ut ea veniam. Mollit eu nisi ea voluptate incididunt id.\r\n",
      registered: "2021-02-02T19:42:49.043Z",
    },
  ];
  res.json(events);
});

ROUTER.get("/special", verifyToken, (req, res) => {
  let specialEvents = [
    {
      index: 0,
      picture: "https://via.placeholder.com/100/ee6e73/FFFFFF/?text=Angular",
      title: "NETERIA",
      about:
        "Mollit voluptate cupidatat non est duis consectetur voluptate conse. Fugiat culpa cupidatat officia magna.\r\n",
      registered: "2021-02-02T19:34:14.263Z",
    },
    {
      index: 1,
      picture: "https://via.placeholder.com/100/ee6e73/FFFFFF/?text=Angular",
      title: "ZILLIDIUM",
      about:
        "Proident commodo incididunt dolor nisi Lorem eu aute ut nisi irure. Fugiat velit tempor occaecat do.\r\n",
      registered: "2021-02-02T19:34:14.263Z",
    },
    {
      index: 2,
      picture: "https://via.placeholder.com/100/ee6e73/FFFFFF/?text=Angular",
      title: "ZOMBOID",
      about:
        "Pariatur duis consectetur nisi tempor duis ipsum ex laborum incididunt nostrud nisi ipsum elit. Exercit.\r\n",
      registered: "2021-02-02T19:34:14.263Z",
    },
    {
      index: 3,
      picture: "https://via.placeholder.com/100/ee6e73/FFFFFF/?text=Angular",
      title: "LOVEPAD",
      about:
        "Laborum consequat sit amet laboris ut exercitation enim excepteur.\r\n",
      registered: "2021-02-02T19:34:14.263Z",
    },
    {
      index: 4,
      picture: "https://via.placeholder.com/100/ee6e73/FFFFFF/?text=Angular",
      title: "TELEQUIET",
      about:
        "Commodo quis elit anim anim occaecat velit officia ut amet. Voluptate eu adipisicing consequat .\r\n",
      registered: "2021-02-02T19:34:14.263Z",
    },
    {
      index: 5,
      picture: "https://via.placeholder.com/100/ee6e73/FFFFFF/?text=Angular",
      title: "COMTRAIL",
      about:
        "Elit amet cupidatat dolore qui ipsum sunt in aliqua pariatur velit officia deserunt. Magna aliqua voluptate.\r\n",
      registered: "2021-02-02T19:34:14.264Z",
    },
  ];
  res.json(specialEvents);
});

ROUTER.get("/", (req, res) => res.send("Form Api Route"));
module.exports = ROUTER;
