const { validationResult } = require("express-validator");
const Task = require("../models/task.model");
const User = require("../models/user.model");

/**
 * method:getTasks
 * target : return tasks in json format
 * route: /tasks/all
 * @param {req} req incomming request object
 * @param {res} res response object
 * @param {next} next move to next middleware
 * @returns tasks in json format
 */
module.exports.getTasks = (req, res, next) => {
    Task.find({ creator: req.userId })
        .then((tasks) => {
            return res.status(200).json({
                tasks: tasks,
            });
        })
        .catch((err) => {
            err.statusCode = 500;
            next(err);
        });
};

/**
 * method:createTask
 * target : create new task.
 * route: /tasks/create-task.
 * @param {req} req incomming request object
 * @param {res} res response object
 * @param {next} next move to next middleware
 * @returns response of creation task request
 */
module.exports.createTask = (req, res, next) => {
    //   validation layer
    let errors = validationResult(req).array();
    if (errors.length > 0) {
        let error = new Error("Validation failed,entered data is incorrect.");
        error.statusCode = 422;
        error.content = errors;
        throw error;
    }
    let { title, dueDate, description, categories } = req.body;
    let creator = req.userId;
    //Storing task in DB.
    let task = new Task({ title, dueDate, description, creator, categories });
    task
        .save()
        .then((result) => {
            return User.findById(req.userId);
        })
        .then((user) => {
            user.tasks.push(task);
            return user.save();
        })
        .then((result) => {
            res.status(201).json({
                message: "Task Created successfully",
                task: task,
                creator: result,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

/**
 * method:getTask
 * target : fetch single task.
 * route: /tasks/single/:id.
 * @param {req} req incomming request object
 * @param {res} res response object
 * @param {next} next move to next middleware
 * @returns return single task with sending id.
 */
module.exports.getTask = (req, res, next) => {
    let { id } = req.params;
    Task.findById(id)
        .then((task) => {
            if (!task) {
                let error = new Error("There is no task with this id");
                error.statusCode = 404;
                throw error;
            }
            return res.status(200).json({
                task: task,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

/**
 * method:editTask
 * target : edit existting task.
 * route: /tasks/edit-task/:id.
 * @param {req} req incomming request object
 * @param {res} res response object
 * @param {next} next move to next middleware
 * @returns response of edit task request
 */
module.exports.editTask = (req, res, next) => {
    //validation layer
    let errors = validationResult(req).array();
    if (errors.length > 0) {
        let error = new Error("Validation failed,entered data is incorrect.");
        error.statusCode = 422;
        error.content = errors;
        throw error;
    }

    let { id } = req.params;
    let { title, dueDate, description, isCompleted, categories } = req.body;
    Task.findById(id)
        .then((task) => {
            if (!task) {
                let error = new Error("There is no task with this id");
                error.statusCode = 404;
                throw error;
            }
            if (title)
                task.title = title;
            if (description)
                task.description = description;
            if (dueDate)
                task.dueDate = dueDate;
            if (isCompleted == true || isCompleted == false)
                task.isCompleted = isCompleted;
            task.categories = categories;
            return task.save();
        })
        .then((task) => {
            return res.status(202).json({
                message: "task Updated successfully.",
                task: task,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

/**
 * method:deleteTask
 * target : delete task.
 * route: /tasks/delete-task/:id.
 * @param {req} req incomming request object
 * @param {res} res response object
 * @param {next} next move to next middleware
 * @returns response of delete task request
 */
module.exports.deleteTask = (req, res, next) => {
    let { id } = req.params;
    let _task;
    Task.findById(id).then((task) => {
        if (!task) {
            let error = new Error("There is no task with this id");
            error.statusCode = 404;
            throw error;
        }
        return task;
    }).then((task) => {
        _task = task;
        return Task.deleteOne({ _id: id });
    }).then(res => {
        return User.findById(_task.creator);
    }).then((user) => {
        user.tasks.pull(id);
        return user.save();
    })
        .then((result) => {
            return res.status(200).json({
                message: "delete task done successfully.",
                task: _task,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
