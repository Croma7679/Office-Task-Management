import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamMember from './TeamMemberPage';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // const addTask = (task) => {
  //   if (editTaskIndex !== null) {
  //     const updatedTasks = tasks.map((t, index) => (index === editTaskIndex ? task : t));
  //     setTasks(updatedTasks);
  //     setEditTaskIndex(null);
  //   } else {
  //     setTasks((prevTasks) => [...prevTasks, task]);
  //   }

  //   sendTaskToApi(task); // Call function to send task data to API
  // };
  const addTask = (task) => {
    if (editTaskIndex !== null) {
      updateTask(task,tasks[editTaskIndex].id);
    } else {
      sendTaskToApi(task);
    }
  };

  const sendTaskToApi = async (task) => {
    // Adjusting the task object to match the expected field names in Django
    const taskData = {
      task: task.task,
      description: task.description,
      start_date: task.startDate,
      end_date: task.endDate,
    };
  
    try {
      const [taskResponse, teamLeaderTaskListResponse] = await Promise.all([
        fetch('http://localhost:8000/api/task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
          credentials: 'include', // Ensure cookies are sent for authentication if using
        }),
        fetch('http://localhost:8000/api/teamleadertasklist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
          credentials: 'include', // Ensure cookies are sent for authentication if using
        }),
      ]);
  
      if (!taskResponse.ok) {
        const errorData = await taskResponse.json(); // Get the error response from the server
        console.error('Error response from server:', errorData); // Log the error response for debugging
        throw new Error('Error adding task');
      }
  
      if (!teamLeaderTaskListResponse.ok) {
        const errorData = await teamLeaderTaskListResponse.json(); // Get the error response from the server
        console.error('Error response from server:', errorData); // Log the error response for debugging
        
        throw new Error('Error fetching team leader task list');
      }
  
      const taskDataResponse = await taskResponse.json();
      const teamLeaderTaskListData = await teamLeaderTaskListResponse.json();
  
      console.log('Task added successfully:', taskDataResponse);
      console.log('Team Leader Task List:', teamLeaderTaskListData);
      // Optionally handle response if needed
  
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error condition as needed
    }
  };
  
  const editTask = (index) => {
    setEditTaskIndex(index);
  };
  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/teamleadertasklist', {
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
        const response = await fetch('http://localhost:8000/api/completed_taskleader', {
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


  const completedTask = async (index,taskId) => {
    
    try {
      const response = await fetch(`http://localhost:8000/api/completed_taskleader/${taskId}`, {
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

  

  const updateTask = async (task,taskId) => {
    // Adjusting the task object to match the expected field names in Django
    const taskData = {
      
      task: task.task,
      description: task.description,
      start_date: task.startDate,
      end_date: task.endDate,
    };
  
    try {
      const [taskResponse, teamLeaderTaskListResponse] = await Promise.all([
        fetch(`http://localhost:8000/api/task/${taskId}`, { // Assuming endpoint for editing task by ID
          method: 'PUT', // Use PUT method for updating existing resource
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
          credentials: 'include', // Ensure cookies are sent for authentication if using
        }),
        fetch(`http://localhost:8000/api/teamleadertasklist/${taskId}`, { // Assuming endpoint for updating team leader task list
          method: 'PUT', // Adjust method based on your backend API design
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
          credentials: 'include', // Ensure cookies are sent for authentication if using
        }),
      ]);
  
      if (!taskResponse.ok) {
        const errorData = await taskResponse.json(); 
        console.log(taskData)// Get the error response from the server
        console.error('Error response from server:', errorData); // Log the error response for debugging
        throw new Error('Error editing task');
      }
  
      if (!teamLeaderTaskListResponse.ok) {
        const errorData = await teamLeaderTaskListResponse.json(); // Get the error response from the server
        console.error('Error response from server:', errorData); // Log the error response for debugging
        throw new Error('Error updating team leader task list');
      }
  
      const taskDataResponse = await taskResponse.json();
      const teamLeaderTaskListData = await teamLeaderTaskListResponse.json();
  
      console.log('Task edited successfully:', taskDataResponse);
      console.log('Team Leader Task List updated:', teamLeaderTaskListData);
      // Optionally handle response if needed
  
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error condition as needed
    }
  };

  // const completeTask = (index) => {
  //   const taskToComplete = tasks[index];
  //   setCompletedTasks([...completedTasks, { ...taskToComplete, completed: true }]);
  //   const updatedTasks = tasks.filter((_, i) => i !== index);
  //   setTasks(updatedTasks);
  // };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
      });

      if (response.ok) {
        navigate('/login');
        console.log('Logout successful');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Error occurred during logout', error.message);
    }
  };

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }, [tasks]);

  const filteredTasks = sortedTasks.filter((task) =>
    task.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / entriesPerPage);
  const displayedTasks = filteredTasks.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Task Manager - Team Leader View</h1>
        <div className="flex items-center">
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
            Logout
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <TeamLeader addTask={addTask} taskToEdit={tasks[editTaskIndex]} />
        <div className="mb-4">
          <label htmlFor="entriesPerPage" className="block text-gray-700">Entries per page:</label>
          <select
            id="entriesPerPage"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="w-20 p-2 border border-gray-300 rounded mt-2"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <input
            type="text"
            placeholder="Search tasks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 p-2 border border-gray-300 rounded mt-2 ml-4"
          />
        </div>
        <TaskList
          tasks={displayedTasks}
          completeTask={completedTask}
          editTask={editTask}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
        <CompletedTaskList completedTasks={completedTasks} />
      </div>
    </div>
  );
};

const TeamLeader = ({ addTask, taskToEdit }) => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit.task);
      setDescription(taskToEdit.description);
      setStartDate(formatDate(taskToEdit.start_date)); // Format date on edit
      setEndDate(formatDate(taskToEdit.end_date)); // Format date on edit
    } else {
      setTask('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ task, description, startDate, endDate });
    setTask('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  };

  const minDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
      <div className="mb-4">
        <label className="block text-gray-700">Task</label>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min={minDate}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate || minDate} // Ensure end date is not earlier than start date
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
        {taskToEdit ? 'Save' : 'Add Task'}
      </button>
    </form>
  );
};

const TaskList = ({ tasks, completeTask, editTask, currentPage, totalPages, setCurrentPage }) => {
  const handleComplete = (index, taskId) => {
    completeTask(index, taskId); 
  }
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-2 px-4 border-b">Sr</th>
            <th className="py-2 px-4 border-b">Task</th>
            <th className="py-2 px-4 border-b">Task Description</th>
            <th className="py-2 px-4 border-b">Task Start Date</th>
            <th className="py-2 px-4 border-b">Task End Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="text-gray-700">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{task.task}</td>
              <td className="py-2 px-4 border-b">{task.description}</td>
              <td className="py-2 px-4 border-b">{task.start_date}</td>
              <td className="py-2 px-4 border-b">{task.end_date}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() =>handleComplete(index,task.id)}
                  className="bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-700 transition duration-300"
                >
                  Complete
                </button>
                <button
                  onClick={() => editTask(index)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 transition duration-300"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <span className="mr-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-1 ${
            currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'
          } transition duration-300 rounded`}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 ml-2 ${
            currentPage === totalPages ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'
          } transition duration-300 rounded`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// const CompletedTaskList = ({ completedTasks }) => {
//   return (
//     <div className="mt-8">
//       <h2 className="text-xl font-semibold mb-4">Completed Tasks</h2>
//       {completedTasks.length === 0 ? (
//         <p className="text-gray-600">No tasks completed yet.</p>
//       ) : (
//         <ul className="list-disc list-inside">
//           {completedTasks.map((task, index) => (
//             <li key={index} className="text-gray-700">
//               {task.task}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
const CompletedTaskList = ({ completedTasks }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Completed Tasks</h2>
      <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="py-2 px-4 border-b">Sr</th>
            <th className="py-2 px-4 border-b">Task</th>
            <th className="py-2 px-4 border-b">Task Description</th>
            <th className="py-2 px-4 border-b">Task Start Date</th>
            <th className="py-2 px-4 border-b">Task End Date</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.map((task, index) => (
            <tr key={index} className="bg-green-100">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{task.task}</td>
              <td className="py-2 px-4 border-b">{task.description}</td>
              <td className="py-2 px-4 border-b">{task.start_date}</td>
              <td className="py-2 px-4 border-b">{task.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default App;
