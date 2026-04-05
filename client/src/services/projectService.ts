import api from './api';
import { Project } from '../types';

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>('/projects');
  return response.data;
};

export const createProject = async (projectData: Project): Promise<Project> => {
  const response = await api.post<Project>('/projects', projectData);
  return response.data;
};

export const updateProject = async (id: string, projectData: Partial<Project>): Promise<Project> => {
  const response = await api.put<Project>(`/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

