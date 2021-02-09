const express = require("express");
const router = express.Router();
const User = require("../backend/models/user");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const db = process.env.MONGODB_URI;
const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(db, connectOptions).then(
  () => console.log("Database successfully connected"),
  (err) => console.error("Database could not connected: " + err)
);

//router.get("/", (req, res) => res.send("Form Api Route"));

router.post("/register", (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(registeredUser);
      console.log(registeredUser);
    }
  });
});

router.post("/login", (req, res) => {
  let userData = req.body;

  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("Invalid email");
      } else if (user.password !== userData.password) {
        res.status(401).send("Invalid password");
      } else {
        res.status(200).send(user);
      }
    }
  });
});

router.get("/events", (req, res) => {
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
        "Mollit do duis irure tempor ea mollit proident commodo ut ea veniam. Mollit eu nisi ea voluptate incididunt id. Ipsum ad excepteur ipsum et ullamco. Officia ipsum cillum exercitation anim ea nisi consectetur deserunt culpa irure ad sit tempor.\r\n",
      registered: "2021-02-02T19:42:49.043Z",
    },
  ];
  res.json(events);
});

router.get("/special", (req, res) => {
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

module.exports = router;
