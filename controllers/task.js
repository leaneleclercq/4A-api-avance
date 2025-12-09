const initTranslations = require("../lib/i18next.js");
const TaskModel = require("../models/task.js");
const Papa = require("papaparse");
const getAskedVersion = require("../lib/versioning.js");

module.exports = {
  cgetV1: async (req, res, next) => {
    const apiVersion = getAskedVersion(req);
    const trad = initTranslations(req);
    const tasks = await TaskModel.findAll(); // trouve toutes les taches dans la base de données
    res.render(tasks);
  },
  // res.language(trad)

  cgetV2: async (req, res, next) => {
    const apiVersion = getAskedVersion(req);
    const trad = initTranslations(req);
    const tasks = await TaskModel.findAll(); // trouve toutes les taches dans la base de données
    res.render(
      tasks.map((item) => {
        task.dataValues.completed_trad = trad(
          task.completed ? "completed" : "not-completed"
        );
        return task;
      })
    );
  },

  cget: async (req, res, next) => {
    const apiVersion = getAskedVersion(req);
    const trad = initTranslations(req);
    const tasks = await TaskModel.findAll(); // trouve toutes les taches dans la base de données
    res.render(
      tasks.map((task) => {
        task.dataValues.completed = trad(
          task.completed ? "completed" : "not-completed"
        );
        return task;
      })
    );
  },

  // ici que je fais le cgetv1/cgetv2/cgetv3

  //switch (apiVersion) {
  //  case "v1":
  //    res.render(tasks);
  //    return;
  //  case "v2":
  //res.render(
  //  tasks.map((item) => {
  //    task.dataValues.completed_trad = trad(
  //      task.completed ? "completed" : "not-completed"
  //    );
  //    return task;
  //  })
  //);
  //    res.render({version: "v2"})
  //    return;
  //  case "v3":
  //    res.render({version: "v3"})
  // default: // veut dire que c'est ma dernière version
  // res.render(
  //   tasks.map((task) => {
  //     task.dataValues.completed = trad(
  //       task.completed ? "completed" : "not-completed"
  //     );
  //     return task;
  //   })
  // );
  // //   return;

  // tasks.map((task) => {
  // task.dataValues.completed_trad = trad(
  // task.completed ? "completed" : "not-completed");
  // return task;
  // }));

  // res.format({
  //   'text/csv' () {
  //     const csv = Papa.unparse(items.map((itemOrm) => itemOrm.dataValues))
  //     res.setHeader('Content-type', 'text/csv');
  //     res.send(csv);
  //   },
  //   default() {
  //     res.json(items);
  //   },
  // });

  post: async (req, res, next) => {
    const newData = req.body;
    const newtask = await TaskModel.create(newData); // crée une nouvelle tache avec les données reçues par newData, newTask est l'objet mis à jour
    res.status(201).json(newtask); // renvoie l'objet newTask en json, la valeur de l'objet créé, 201 signifie que la ressource a été créée
  },
  get: async (req, res, next) => {
    const task = await TaskModel.findByPk(req.params.id);
    if (task) {
      res.format({
        "text/csv"() {
          const csv = Papa.unparse([task.dataValues]);
          res.setHeader("Content-type", "text/csv");
          res.send(csv);
        },
        default() {
          res.json(task);
        },
      });
    } else {
      res.sendStatus(404); // renvoie le code 404 qui signifie que la ressource n'a pas été trouvée
    }
  },
  put: async (req, res, next) => {
    const nbDeleted = await TaskModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    const newData = req.body;
    const newtask = await TaskModel.create({ id: req.params.id, ...newData });
    res.status(nbDeleted === 1 ? 200 : 201).json(newtask); // si j'avais bien une ligne dans mon tableau qui existait alors code 200 sinon 201 et le === 1 veut dire que j'ai bien supprimé une ligne de mon tableau et y'en a qu'une de ligne parce que l'id c'est la primarykey donc elle n'est que sur une seule ligne
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
