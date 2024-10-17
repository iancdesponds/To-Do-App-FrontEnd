const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Função para buscar todas as tarefas
export const getTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  const data = await response.json();
  return data;
};

// Função para criar uma nova tarefa
export const createTask = async (task) => {
  await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(task)
  });
};

// Função para deletar uma tarefa
export const deleteTask = async (taskId) => {
  await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

// Função para atualizar o status de uma tarefa
export const updateTaskStatus = async (taskId) => {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Erro ao atualizar o status da tarefa');
    }
  };
  

// Função para logout
export const logout = async () => {
  await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

// Função auxiliar para obter o token JWT armazenado (presumindo que está salvo em localStorage)
const getToken = () => {
  return localStorage.getItem('jwt_token');
};

// Função para login
export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${username}&password=${password}&grant_type=password`
    });
  
    if (response.ok) {
      const data = await response.json();
      return data.access_token;  // Retorna o token JWT
    } else {
      return null;
    }
  };
  

// Função para registrar um novo usuário
export const registerUser = async (username, password) => {
    const response = await fetch(`${API_URL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    return response.ok; // Retorna true se o cadastro for bem-sucedido
  };
  