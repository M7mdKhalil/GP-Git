const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const User = require("./models/user");
const Offer = require("./models/offer");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../front-end"));
app.use(express.static(path.join(__dirname, "../front-end")));

app.get("/", (req, res) => {
  res.send("Welcome from the root page");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
//users routs
app.get("/user", async (req, res) => {
  const allusers = await User.find({});
  res.send(allusers);
});
app.post("/user", async (req, res) => {
  const {
    username,
    password,
    email,
    cv,
    Kind,
    image,
    filename,
    location,
    phonenumber,
  } = req.body;
  const isfound = await User.findOne({ username });
  if (!isfound) {
    const newUser = await User.create({
      username,
      password,
      email,
      cv,
      Kind,
      image,
      filename,
      location,
      phonenumber,
      createdat: new Date(),
    });
    return res.send({ ok: true, msg: "welcome" });
  } else {
    res.send({ ok: false, msg: "is already registrated" });
  }
});
app.put("/user", async (req, res) => {
  const { _id } = req.body;
  const newUser = await User.findByIdAndUpdate(_id, req.body, { new: true });
  res.send(newUser);
});
app.delete("/user", async (req, res) => {
  const newUser = await User.findByIdAndDelete(req.body._id);
  res.send(newUser);
});
//offers routs
app.get("/offer", async (req, res) => {
  const allOffers = await Offer.find({});
  res.send(allOffers);
});

// app.put("/filteredOffer", async () => {
//   const { title, location, author } = req.body;
//   const data = Offer.find({ title, location, author });
//   if (data) res.send({ data, found: true });
//   else res.send({ found: false });
// });

// app.post("/offers", async (req, res) => {
//   const allOffers = await Offer.find({"title" : "FE"});
//   res.send(allOffers);
// });

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

app.post("/offer", async (req, res) => {
  const { title, description, location, applaiers, author, date, image } =
    req.body;
  const newOffer = await Offer.create({
    title,
    description,
    location,
    applaiers,
    author,
    date: formatDate(new Date()),
    image,
  });
  res.send(newOffer);
});

app.put("/offer", async (req, res) => {
  const { _id } = req.body;
  const { title, description, location, author } = req.body;
  const newOffer = await Offer.findByIdAndUpdate(
    _id,
    { title, description, location, author },
    { new: true }
  );
  res.send(newOffer);
});
app.delete("/offer", async (req, res) => {
  const newOffer = await Offer.findByIdAndDelete(req.body._id);
  res.send(newOffer);
});

app.get("/offer/:id", async (req, res) => {
  const id = req.params.id;
  const offer = await Offer.findById(id);
  console.log(offer.title);
  res.send(offer);
});

//login

app.post("/user/login", async (req, res) => {
  const { username, password } = req.body;
  const userfound = await User.findOne({ username, password });
  if (userfound) {
    res.send({ ok: true, msg: "found", _id: userfound._id, username });
  } else {
    res.send({ ok: false, msg: "not found" });
  }
});

const DBusername = "mkhalil";
const DBpassword = "mkhalildb";
portNumber = 5000;
const Url = `mongodb+srv://${DBusername}:${DBpassword}@cluster0.bai53vp.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
try {
  mongoose.connect(Url, connectionParams);
  console.log("Database connected succesfully");
} catch (error) {
  console.log(error);
  console.log("DataBase connection failed");
}

// hallllllllllllllo im barra

app.listen(portNumber, () => {
  console.log(`Back-End is running on port ${portNumber}`);
});
