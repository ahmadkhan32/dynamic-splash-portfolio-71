import React, { useState, useEffect } from 'react';
import { getProjects, deleteProject } from '../../services/projectService';
import { getContactMessages, markMessageAsRead } from '../../services/contactService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, CheckCircle, Mail, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import { Project, Message } from '../../types';

const AdminDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const projectsData: Project[] = await getProjects() || [];
      const messagesData: Message[] = await getContactMessages() || [];
      setProjects(projectsData);
      setMessages(messagesData);
    } catch (error) {

      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        toast.success('Project deleted');
        setProjects(projects.filter((p: Project) => p._id !== id));
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markMessageAsRead(id);
      toast.success('Marked as read');
      setMessages(messages.map((m: Message) => m._id === id ? { ...m, isRead: true } : m));
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto p-6 pt-24 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 gradient-text">Admin Dashboard</h1>
      
      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="glass border-primary/20">
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" /> Projects
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> Messages
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: Project) => (
              <Card key={project._id} className="glass border-primary/20 hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm" className="glass border-primary/30">Edit</Button>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => project._id && handleDeleteProject(project._id)}
                      className="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="glass border-dashed border-primary/40 flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-primary/10 transition-all duration-300">
              <span className="text-3xl mb-2">+</span>
              <span className="font-semibold">Add New Project</span>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="messages">
          <div className="space-y-4">
            {messages.map((msg: Message) => (
              <Card key={msg._id} className={`glass border-primary/20 transition-all duration-300 ${!msg.isRead ? 'border-primary shadow-glow' : 'opacity-80'}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{msg.name}</h3>
                      <p className="text-primary text-sm">{msg.email}</p>
                    </div>
                    {!msg.isRead && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => msg._id && handleMarkAsRead(msg._id)}
                        className="text-emerald-500 hover:bg-emerald-500/20"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                  <p className="text-muted-foreground">{msg.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

