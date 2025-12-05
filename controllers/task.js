const TaskModel = require("../models/task.js");

module.exports = {
  cget: async (req, res, next) => {
    res.json(await TaskModel.findAll()); // renvoie le tableau de data des taches
  },
  post: async (req, res, next) => {
    const newData = req.body;
    const newtask = await TaskModel.create(newData); // crée une nouvelle tache avec les données reçues par newData, newTask est l'objet mis à jour
    res.status(201).json(newtask); // renvoie l'objet newTask en json, la valeur de l'objet créé, 201 signifie que la ressource a été créée
  },
  get: async (req, res, next) => {
    const task = await TaskModel.findByPk(req.params.id);
    if (task) {
      res.json(task); // renvoie l'objet tache dont l'id est passé en paramètre dans l'url
    } else {
      res.sendStatus(404); // renvoie le code 404 qui signifie que la ressource n'a pas été trouvée
    }
  },
  put: async (req, res, next) => {
    const nbDeleted = await TaskModel.destroy({
        where: { 
            id: req.params.id
        },
  });
  const newData = req.body;
  const newtask = await TaskModel.create({id: req.params.id, ...newData});
  res.status(nbDeleted === 1 ?200 : 201).json(newtask); // si j'avais bien une ligne dans mon tableau qui existait alors code 200 sinon 201 et le === 1 veut dire que j'ai bien supprimé une ligne de mon tableau et y'en a qu'une de ligne parce que l'id c'est la primarykey donc elle n'est que sur une seule ligne
},
  patch: async (req, res, next) => {
    const [nbUptaded, [updatedTask]] = await TaskModel.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    if (nbUptaded === 0) {
      return res.sendStatus(404);
    } else {
      res.json(updatedTask);
    }

    // MySQL
    //
    // if (result === 0) {
    //    return res.sendStatus(404);
    // }   else {
    //    const task = await TaskModel.findByPk(req.params.id);
    //    res.json(task); // renvoie l'objet tache mis à jour
    //}
  },
  delete: async (req, res, next) => {
    await TaskModel.destroy({ where: { id: req.params.id } }); // supprime la tache dont l'id est passé en paramètre dans l'url
    const nbDeleted = await TaskModel.destroy({
      where: { id: req.params.id },
    });
    if (nbDeleted === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(204); // renvoie le code 204 qui signifie que la ressource a été supprimée avec succès
  },
};
