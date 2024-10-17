import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import { Button, TextField, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

function Cadastro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      navigate('/login');
    } else {
      setError('Erro no cadastro. Tente novamente.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, margin: '0 auto', mt: 4 }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Cadastro
        </Typography>

        <TextField
          label="Nome de usuário"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Confirme a senha"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        {/* Mensagem de erro acima dos botões */}
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        <Button type="submit" variant="contained" color="primary" sx={{ mb: 2 }}>
          Cadastrar
        </Button>
        <Button
            onClick={() => navigate('/login')}
            variant="text"
            sx={{
                color: 'black',
                '&:hover': {
                color: 'white',
                },
            }}
        >
          Já tem uma conta? Faça login
        </Button>
      </Box>
    </motion.div>
  );
}

export default Cadastro;
