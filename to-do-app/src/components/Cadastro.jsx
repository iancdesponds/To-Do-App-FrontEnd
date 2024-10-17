import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

function Cadastro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (/\s/.test(username)) {
      setError('Nome de usuário não pode conter espaços.');
      return;
    }

    const sanitizedUsername = username.trim();
    const result = await registerUser(sanitizedUsername, password);
    
    if (result) {
      navigate('/login'); // Redireciona para a tela de login
    } else {
      setError('Erro no cadastro. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Nome de usuário" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Senha" 
        required 
      />
      <input 
        type="password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        placeholder="Confirme a senha" 
        required 
      />
      <button type="submit">Cadastrar</button>
      <button type="button" onClick={() => navigate('/login')}>Já tem uma conta? Faça login</button>
    </form>
  );
}

export default Cadastro;
