const express = require("express");
const router = express.Router();
const passport = require("passport");

const UserController = require("../controllers/userController");
const UserService = require("../services/userService");

const UserInstance = new UserController(new UserService());

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Welcome!");
});

//Passport auth ejecuta una función de passport que es la que utiliza la estrategia local.
//La estrategia local agarra el usuario y password que nos llega en el post y la valida contra lo que tenemos en la base de datos.
//
router.post("/api/login", passport.authenticate("local"), (req, res) => {
  return res.json({
    ok: true,
  });
});

router.get("/api/verify", (req, res) => {
  return res.json(req.user);
});

router.post("/create", (req, res) => {
  UserInstance.createUser(req, res);
});

module.exports = router;
