import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, deleteTask, updateTaskStatus, logout } from './api';
import { useNavigate } from 'react-router-dom';

function App() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Verificar se o usuário está logado ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate('/login');  // Redirecionar para login se o usuário não estiver logado
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

  // Função de logout
  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('jwt_token'); // Remover o token do localStorage
    navigate('/login'); // Redirecionar para a tela de login
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <button onClick={handleLogout}>Logout</button>
      <TaskForm onCreateTask={handleCreateTask} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onUpdateTask={handleUpdateTask} />
    </div>
  );
}

export default App;
