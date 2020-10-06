const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const con = require("./config/db.js");
const routes = require("./routes/index");

const app = express();

app.use(express.json());
// connecting route to database
app.use((req, res, next) => {
  req.con = con;
  next();
});

app.use(
  session({
    name: process.env.SESSION_COOKIE_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: false,
    store: new MySQLStore({}, con),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2, //2 days
      httpOnly: false,
    },
  })
);

app.use("/api/", routes);

app.listen(process.env.PORT, () => {
  console.log(`Listening at ${process.env.PORT}`);
});
