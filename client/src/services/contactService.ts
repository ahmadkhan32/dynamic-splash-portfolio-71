import api from './api';
import { Message } from '../types';

export const sendContactMessage = async (messageData: Partial<Message>): Promise<Message> => {
  const response = await api.post<Message>('/contact', messageData);
  return response.data;
};

export const getContactMessages = async (): Promise<Message[]> => {
  const response = await api.get<Message[]>('/contact');
  return response.data;
};

export const markMessageAsRead = async (id: string): Promise<Message> => {
  const response = await api.patch<Message>(`/contact/${id}/read`);
  return response.data;
};

