const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { check } = require('express-validator');
const isAuth = require("../guards/isAuth.guard");

//target:to fetch all tasks mroute:/tasks/all
router.get('/all', isAuth, taskController.getTasks);

//target:to fetch single task mroute:/tasks/single/:id
router.get('/single/:id', isAuth, taskController.getTask);

//target:create a new task mroute:/tasks/creae-task
router.post('/creae-task', [
    check('title').trim().isLength({ min: 5 }),
    check('description').trim().isLength({ min: 5 }),
], isAuth, taskController.createTask);


//target:Edit a task route:/tasks/edit-task/:id
router.put('/edit-task/:id', isAuth, taskController.editTask);

//target:Delete a task mroute:/tasks/delete-task/:id
router.delete('/delete-task/:id', isAuth, taskController.deleteTask);


module.exports = router;