import express from 'express';
import * as controller from './api.controller.js';

const router = express.Router();

router.get('/tasks', controller.getTasks);

router.post('/add/tasks', controller.createTask);

router.put('/update/tasks/:id', controller.updateTask);

router.delete('/delete/tasks/:id', controller.deleteTask);

export default router;
