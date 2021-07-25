const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const passportConfig = require("./passport");
const passport = require("passport");
const session = require("express-session");
const app = express();

const sessionMiddleware = session({
  name: "auth-test",
  secret: "s3cr3t_k3y",
  saveUninitialized: false,
  resave: false,
});

//secret debería ser una variable de entorno y no hardcodeado

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Es importante que pongamos esto ANTES de las rutas.

app.use(sessionMiddleware); //Esto va siempre arriba de las otras

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);

module.exports = app;
