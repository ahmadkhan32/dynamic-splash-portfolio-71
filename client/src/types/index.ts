export interface Project {
  _id?: string;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  category: string;
}

export interface Message {
  _id?: string;
  name: string;
  email: string;
  content: string;
  isRead: boolean;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}
