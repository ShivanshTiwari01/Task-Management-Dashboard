import express from 'express';
import * as controller from './api.controller';

const router = express.Router();

router.post('/register', controller.registerUser);

router.get('/tasks', controller.getTasks);

router.post('/add/task', controller.createTask);

router.put('/update/task/:id', controller.updateTask);

router.delete('/delete/task/:id', controller.deleteTask);

export default router;
