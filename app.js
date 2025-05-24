require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const router = require("./routes/router");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");
const passport = require("./auth/passport");

const sessionStore = new pgSession({
  pool: pool,
  createTableIfMissing: true,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // Equals 1 day
  })
);

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(passport.session());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", router);

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}.`));
