const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./models");
const cors = require("cors");

const routes = require("./routes");

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/", express.static(path.join(__dirname, "react")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "br",
  })
);

app.use("/api", routes);

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(8081, () => {
  console.log("8081 server start");
});
app.listen(8082, () => {
  console.log("8082 ws server start");
});
