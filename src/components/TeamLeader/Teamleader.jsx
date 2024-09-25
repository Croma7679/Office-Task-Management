import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskIndex, setEditTaskIndex] = useState(null);

  const addTask = (task) => {
    if (editTaskIndex !== null) {
      const updatedTasks = tasks.map((t, index) => (index === editTaskIndex ? task : t));
      setTasks(updatedTasks);
      setEditTaskIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const completeTask = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: true } : t
    );
    setTasks(updatedTasks);
  };

  const sortedTasks = [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Task Manager</h1>
        <TeamLeader addTask={addTask} taskToEdit={tasks[editTaskIndex]} />
        <TaskList tasks={sortedTasks} completeTask={completeTask} deleteTask={deleteTask} />
      </div>
    </div>
  );
};

const TeamLeader = ({ addTask, taskToEdit }) => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit.task);
      setDescription(taskToEdit.description);
      setDeadline(taskToEdit.deadline);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ task, description, deadline });
    setTask('');
    setDescription('');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
      <div className="mb-4">
        <p>
          <label className="block text-gray-700">Task</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </p>
      </div>
      <div className="mb-4">
        <p>
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          ></textarea>
        </p>
      </div>
      <div className="mb-4">
        <p>
          <label className="block text-gray-700">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </p>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
        {taskToEdit ? 'Save' : 'Add Task'}
      </button>
    </form>
  );
};

const TaskList = ({ tasks, completeTask, deleteTask }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-2 px-4 border-b">Task</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Deadline</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <TaskItem
              key={index}
              {...task}
              onComplete={() => completeTask(index)}
              onDelete={() => deleteTask(index)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TaskItem = ({ task, description, deadline, onComplete, onDelete, completed }) => {
  const isPastDeadline = new Date(deadline) < new Date();
  const rowColor = completed
    ? 'bg-green-100'
    : isPastDeadline
    ? 'bg-red-100'
    : '';

  return (
    <tr className={rowColor}>
      <td className="py-2 px-4 border-b">{task}</td>
      <td className="py-2 px-4 border-b">{description}</td>
      <td className="py-2 px-4 border-b">{deadline}</td>
      <td className="py-2 px-4 border-b">
        <button
          onClick={onComplete}
          className={`text-white px-4 py-2 rounded mr-2 ${
            completed ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700 transition duration-300'
          }`}
          disabled={completed}
        >
          Completed
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default App;
