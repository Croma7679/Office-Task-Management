import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TeamMember = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/task', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for authentication
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data); // Set fetched tasks to state
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error occurred while fetching tasks', error);
      }
    };

    const fetchCompletedTasks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/complete_task', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for authentication
        });

        if (response.ok) {
          const data = await response.json();
          setCompletedTasks(data); // Set fetched completed tasks to state
        } else {
          console.error('Failed to fetch completed tasks');
        }
      } catch (error) {
        console.error('Error occurred while fetching completed tasks', error);
      }
    };

    fetchTasks();
    fetchCompletedTasks();
  }, []);

  const completeTask = async (index,taskId) => {
    
    try {
      const response = await fetch(`http://localhost:8000/api/complete_task/${taskId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const updatedTasks = [...tasks];
        const completedTask = updatedTasks.splice(index, 1)[0];
        completedTask.completed = true;
        setTasks(updatedTasks);
        setCompletedTasks([...completedTasks, completedTask]);
      } else {
        console.error('Failed to complete task');
      }
    } catch (error) {
      console.error('Error occurred while completing task', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/login');
        console.log('Logout successful');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error occurred during logout', error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Task Manager - Team Member View</h1>
        <div className="overflow-x-auto">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
          <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg shadow-md mb-8">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-4 border-b">Task</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Start Date</th>
                <th className="py-2 px-4 border-b">End Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index} className={new Date(task.end_date) < new Date() ? 'bg-red-100' : ''}>
                  <td className="py-2 px-4 border-b">{task.task}</td>
                  <td className="py-2 px-4 border-b">{task.description}</td>
                  <td className="py-2 px-4 border-b">{task.start_date}</td>
                  <td className="py-2 px-4 border-b">{task.end_date}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => completeTask(index, task.id)}
                      className="text-white px-4 py-2 rounded bg-green-500 hover:bg-green-700 transition duration-300"
                    >
                      Complete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Completed Tasks</h2>
          <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-4 border-b">Task</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Start Date</th>
                <th className="py-2 px-4 border-b">End Date</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task, index) => (
                <tr key={index} className="bg-green-100">
                  <td className="py-2 px-4 border-b">{task.task}</td>
                  <td className="py-2 px-4 border-b">{task.description}</td>
                  <td className="py-2 px-4 border-b">{task.start_date}</td>
                  <td className="py-2 px-4 border-b">{task.end_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
