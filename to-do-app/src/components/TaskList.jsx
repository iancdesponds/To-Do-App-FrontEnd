import React from 'react';

function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <div>
            <strong>{task.title}</strong>
            <p>{task.description}</p> {/* Exibe a descrição da tarefa */}
            <span>Status: {task.status}</span>
          </div>
          <button onClick={() => onUpdateTask(task.id)}>
            {task.status === 'pendente' ? 'Completar' : 'Reabrir'}
          </button>
          <button onClick={() => onDeleteTask(task.id)}>Deletar</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;