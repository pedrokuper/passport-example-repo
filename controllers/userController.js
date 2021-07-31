class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  async createUser(req, res) {
    const { body } = req;
    const name = body.name.toLowerCase();

    if (body && body.name && body.password) {
      try {
        //Mando un objeto, copio body,  y le piso la propiedad name, por mi name en lowercase
        const user = await this.userService.createUser({ ...body, name });
        return res.sendStatus(200);
      } catch (e) {
        console.log(e);
        return res.sendStatus(500);
      }
    } else {
      return res.sendStatus(400);
    }
  }
}

module.exports = UserController;
