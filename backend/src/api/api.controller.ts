import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../prisma';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (passwordMatch) {
        return res.status(200).json({
          message: 'User logged in successfully',
          userId: existingUser.id,
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      return res
        .status(201)
        .json({ message: 'User registered successfully', userId: newUser.id });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res
        .status(400)
        .json({ error: 'userId query parameter is required' });
    }
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const tasks = await prisma.task.findMany({
      where: { userId: Number(req.query.userId) },
    });
    return res.json(tasks);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, userId } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        userId,
      },
    });
    return res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const existingTask = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, status },
    });

    return res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingTask = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await prisma.task.delete({
      where: { id: Number(id) },
    });

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
