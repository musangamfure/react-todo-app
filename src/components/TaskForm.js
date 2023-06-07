import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TaskForm({ onAdd }) {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd(taskName);
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Add Task</button>
      <input
        type="text"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        placeholder="Enter a task"
      />
    </form>
  );
}

TaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default TaskForm;
