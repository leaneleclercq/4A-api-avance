const TaskModel = require('../models/task.js');

module.exports = {
    cget: async (req, res, next) => {
        res.json(await TaskModel.findAll()); // renvoie le tableau de data des taches
    },
    post: async (req, res, next) => {
        const newData = req.body;
        const newtask = await TaskModel.create(newData); // crée une nouvelle tache avec les données reçues par newData, newTask est l'objet mis à jour 
        res.status(201).json(newtask); // renvoie l'objet newTask en json, la valeur de l'objet créé, 201 signifie que la ressource a été créée
    },
    get: (req, res, next) => {},
    patch: (req, res, next) => {},
    delete: (req, res, next) => {}
};

