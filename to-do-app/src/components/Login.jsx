import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const token = await login(username, password);
    if (token) {
      localStorage.setItem('jwt_token', token); // Armazenar o token
      navigate('/'); // Redirecionar para a tela principal
    } else {
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuário"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        required
      />
      <button type="submit">Login</button>
      <button type="button" onClick={() => navigate('/cadastro')}>Criar uma nova conta</button>
    </form>
  );
}

export default Login;
