const TaskModel = require('../models/task.js');

module.exports = {
    cget: async (req, res, next) => {
        res.json(await TaskModel.findAll());
    },
    post: (req, res, next) => {},
    get: (req, res, next) => {},
    patch: (req, res, next) => {},
    delete: (req, res, next) => {}
};

