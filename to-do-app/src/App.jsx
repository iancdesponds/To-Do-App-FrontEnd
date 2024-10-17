import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, deleteTask, updateTaskStatus, logout } from './api';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

function App() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate('/login');
    } else {
      loadTasks();
    }
  }, []);

  const loadTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const handleCreateTask = async (newTask) => {
    await createTask(newTask);
    loadTasks();
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    loadTasks();
  };

  const handleUpdateTask = async (taskId) => {
    await updateTaskStatus(taskId);
    loadTasks();
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('jwt_token');
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Posicionando o botão de logout no canto superior direito */}
      <Box sx={{ position: 'relative', textAlign: 'center', mt: 4 }}>
        <Button
          onClick={handleLogout}
          variant="contained"
          color="secondary"
          sx={{ position: 'absolute', top: 0, right: 0, mt: 2, mr: 2 }}
        >
          Logout
        </Button>
        <Typography variant="h3" component="h1" gutterBottom>
          To-Do List
        </Typography>
        <TaskForm onCreateTask={handleCreateTask} />
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onUpdateTask={handleUpdateTask} />
      </Box>
    </motion.div>
  );
}

export default App;
