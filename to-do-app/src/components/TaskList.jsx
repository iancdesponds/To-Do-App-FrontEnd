import React from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
  return (
    <Box>
      {tasks.slice().reverse().map((task) => ( // Inverte a ordem das tarefas
        <motion.div
          key={task.id}
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0 }}
        >
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div" fontWeight={"bold"}>
                {task.title}
              </Typography>
              <Typography variant="h6" color="text.primary">
                {task.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Status: {task.status}
              </Typography>
              <Button
                variant="contained"
                color={task.status === 'pendente' ? 'success' : 'warning'}
                onClick={() => onUpdateTask(task.id)}
                sx={{ mr: 3 }}
                size='small'
              >
                {task.status === 'pendente' ? 'Completar' : 'Reabrir'}
              </Button>
              <Button variant="contained" color="error" onClick={() => onDeleteTask(task.id)} size='small'>
                Deletar
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </Box>
  );
}

export default TaskList;
