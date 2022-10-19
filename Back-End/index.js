const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const usersRoutes = require('./routs/users')
const offersRoutes = require('./routs/offers')



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../front-end"));
app.use(express.static(path.join(__dirname, "../front-end")));
app.use('/offer',offersRoutes);
app.use('/user',usersRoutes);


app.get("/", (req, res) => {
  res.send("Welcome from the root page");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
//users routs


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
})
