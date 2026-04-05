import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Initial admin creation (utility)
export const createInitialAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, passwordHash });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
