const UserModel = require("../models/user.js");

module.exports = {
  cget: async (req, res, next) => {
    res.json(await UserModel.findAll()); // renvoie le tableau de data des taches
  },
  post: async (req, res, next) => {
    const newData = req.body;
    const newUser = await UserModel.create(newData); // crée une nouvelle tache avec les données reçues par newData, newUser est l'objet mis à jour
    res.status(201).json(newUser); // renvoie l'objet newUser en json, la valeur de l'objet créé, 201 signifie que la ressource a été créée
  },
  get: async (req, res, next) => {
    const User = await UserModel.findByPk(req.params.id);
    if (User) {
      res.json(User); // renvoie l'objet tache dont l'id est passé en paramètre dans l'url
    } else {
      res.sendStatus(404); // renvoie le code 404 qui signifie que la ressource n'a pas été trouvée
    }
  },
  put: async (req, res, next) => {
    const nbDeleted = await UserModel.destroy({
        where: { 
            id: req.params.id
        },
  });
  const newData = req.body;
  const newUser = await UserModel.create({id: req.params.id, ...newData});
  res.status(nbDeleted === 1 ?200 : 201).json(newUser); // si j'avais bien une ligne dans mon tableau qui existait alors code 200 sinon 201 et le === 1 veut dire que j'ai bien supprimé une ligne de mon tableau et y'en a qu'une de ligne parce que l'id c'est la primarykey donc elle n'est que sur une seule ligne
},
  patch: async (req, res, next) => {
    const [nbUptaded, [updatedUser]] = await UserModel.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    if (nbUptaded === 0) {
      return res.sendStatus(404);
    } else {
      res.json(updatedUser);
    }

    // MySQL
    //
    // if (result === 0) {
    //    return res.sendStatus(404);
    // }   else {
    //    const User = await UserModel.findByPk(req.params.id);
    //    res.json(User); // renvoie l'objet tache mis à jour
    //}
  },
  delete: async (req, res, next) => {
    await UserModel.destroy({ where: { id: req.params.id } }); // supprime la tache dont l'id est passé en paramètre dans l'url
    const nbDeleted = await UserModel.destroy({
      where: { id: req.params.id },
    });
    if (nbDeleted === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(204); // renvoie le code 204 qui signifie que la ressource a été supprimée avec succès
  },
  activate : async (req, res, next) => {
    const nbUptaded = await UserModel.update(
      { activated: true },
      {where: { id: req.params.id },
      returning: true,
      }
  );
  if (nbUptaded === 0) {
    res.sendStatus(404);
  } else {
    res.sendStatus(200);
  }
  },
};
