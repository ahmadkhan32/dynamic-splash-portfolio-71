import { Request, Response } from 'express';
import Message from '../models/Message';

export const sendContactMessage = async (req: Request, res: Response) => {
  const { name, email, content } = req.body;
  const message = new Message({ name, email, content });
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getContactMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
