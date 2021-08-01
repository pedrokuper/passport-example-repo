const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

//Requerimos el servicio de UserService y lo instanciamos, para poder acceder al método que va a pegar contra la db.
const UserService = require("./services/userService");
const UserInstance = new UserService();

/*
En estas lineas -> Passport va a usar la estrategia local. Va con new porque es una clase.
Le estamos pasando al constructor de la clase, los campos del modelo, que van a ser el nombre y la password.
De esta forma se llama mi modelo, lo que voy a usar para el nombre y lo que voy a usar en la password.

*/
passport.use(
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "password",
    },
    async (username, password, cb) => {
      try {
        const userData = await UserInstance.getUserByName(
          username.toLowerCase()
        );
        if (!userData) {
          console.log("Entró al primero");
          return cb(null, false); // Si no hay userData este usuario no se puede loguear
        }
        const compare = await bcrypt.compare(password, userData.password);
        if (!compare) {
          console.log("Entro al segundo");
          return cb(null, false); //Si usarData.password (la query de la db) es diferente a la password ingresada en la ruta,  el usuario no se puede loguear.
        }

        return cb(null, userData); //Acá se loguea
      } catch (err) {
        //Acá explotó el server o algo
        console.log(err);
        return cb(null, false);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  return cb(null, user.name);
});

//El deserialize user, tiene que ser un string.
passport.deserializeUser(async (name, cb) => {
  const data = await UserInstance.getUserByName(name);
  return cb(null, data);
});
