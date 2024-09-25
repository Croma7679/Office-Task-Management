// import React, { useState } from 'react';

// const App = () => {
//   const [employees, setEmployees] = useState([
//     { id: 1, name: 'John Doe' },
//     { id: 2, name: 'Jane Smith' },
//     { id: 3, name: 'Michael Johnson' },
//     { id: 4, name: 'Emily Brown' },
//     { id: 5, name: 'David Lee' },
//   ]);

//   const [teamLeaders, setTeamLeaders] = useState([]);

//   // Function to add a team leader
//   const addTeamLeader = (employee) => {
//     setTeamLeaders([...teamLeaders, employee]);
//   };

//   // Function to remove a team leader
//   const removeTeamLeader = (id) => {
//     const updatedTeamLeaders = teamLeaders.filter((leader) => leader.id !== id);
//     setTeamLeaders(updatedTeamLeaders);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h1>

//         {/* Employee Master Section */}
//         <div className="mb-8">
//           <h2 className="text-xl font-bold mb-4">EMP MASTER</h2>
//           <div className="flex items-center mb-4">
//             <label htmlFor="employeeList" className="block text-gray-700 mr-4">Select an employee:</label>
//             <select
//               id="employeeList"
//               onChange={(e) => addTeamLeader(JSON.parse(e.target.value))}
//               className="w-64 p-2 border border-gray-300 rounded"
//             >
//               <option value="">Select an employee</option>
//               {employees.map((employee) => (
//                 <option key={employee.id} value={JSON.stringify(employee)}>
//                   {employee.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Team Leader Table Section */}
//         <div>
//           <h2 className="text-xl font-bold mb-4">Current Team Leaders</h2>
//           <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//             <thead className="bg-blue-500 text-white">
//               <tr>
//                 <th className="py-2 px-4 border-b">#</th>
//                 <th className="py-2 px-4 border-b">Name</th>
//                 <th className="py-2 px-4 border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {teamLeaders.map((leader, index) => (
//                 <tr key={leader.id}>
//                   <td className="py-2 px-4 border-b">{index + 1}</td>
//                   <td className="py-2 px-4 border-b">{leader.name}</td>
//                   <td className="py-2 px-4 border-b">
//                     <button
//                       onClick={() => removeTeamLeader(leader.id)}
//                       className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 transition duration-300"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
// import React, { useState, useEffect } from 'react';

// const AdminPage = () => {
//     const [teamMembers, setTeamMembers] = useState([]);
//     const [teamLeaders, setTeamLeaders] = useState([]);

//     useEffect(() => {
//         fetchTeamMembers();
//         fetchTeamLeaders();
//     }, []);

//     const fetchTeamMembers = async () => {
//         const response = await fetch('http://localhost:8000/api/team-members');
//         const data = await response.json();
//         setTeamMembers(data);
//     };

//     const fetchTeamLeaders = async () => {
//         const response = await fetch('http://localhost:8000/api/team-leaders');
//         const data = await response.json();
//         setTeamLeaders(data);
//     };

//     const promoteToLeader = async (id) => {
//         const response = await fetch(`http://localhost:8000/api/team-members/${id}/promote_to_leader`, {
//             method: 'POST',
//         });
//         if (response.ok) {
//             // Find the promoted member
//             const promotedMember = teamMembers.find(member => member.id === id);
//             // Mark as leader in the teamMembers list
//             setTeamMembers(teamMembers.map(member => 
//                 member.id === id ? { ...member, is_leader: true } : member
//             ));
//             // Add to teamLeaders list
//             setTeamLeaders([...teamLeaders, { team_member: promotedMember }]);
//         }
//     };

//     const demoteToMember = async (id) => {
//         const response = await fetch(`http://localhost:8000/api/team-leaders/${id}/demote_to_member`, {
//             method: 'POST',
//         });
//         if (response.ok) {
//             // Mark as not a leader in the teamMembers list
//             setTeamMembers(teamMembers.map(member => 
//                 member.id === id ? { ...member, is_leader: false } : member
//             ));
//             // Remove from teamLeaders list
//             setTeamLeaders(teamLeaders.filter(leader => leader.team_member.id !== id));
//         }
//     };

//     return (
//         <div className="p-6 bg-gray-50 min-h-screen">
//             <h1 className="text-3xl font-bold text-gray-800">Admin View</h1>
//              {/* <h1 className="text-4xl font-bold mb-2 text-black-100">Admin View</h1> */}
//             <h2 className="text-2xl font-bold mb-4 text-indigo-600">Team Members</h2>
//             <table className="min-w-full bg-white shadow-lg rounded">
//                 <thead>
//                     <tr className="bg-indigo-500 text-white">
//                         <th className="py-3 px-6 border-b">Name</th>
//                         <th className="py-3 px-6 border-b">Rank</th>
//                         <th className="py-3 px-6 border-b">Gender</th>
//                         <th className="py-3 px-6 border-b">Date of Joining</th>
//                         <th className="py-3 px-6 border-b">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {teamMembers.map(member => (
//                         <tr key={member.id} className="bg-gray-100 hover:bg-gray-200">
//                             <td className="py-3 px-6 border-b">{member.name}</td>
//                             <td className="py-3 px-6 border-b">{member.rank}</td>
//                             <td className="py-3 px-6 border-b">{member.gender}</td>
//                             <td className="py-3 px-6 border-b">{member.date_of_joining}</td>
//                             <td className="py-3 px-6 border-b">
//                                 {!member.is_leader ? (
//                                     <button
//                                         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                                         onClick={() => {promoteToLeader(member.id); console.log(member.id);}}
//                                     >
//                                         Promote to Leader
//                                     </button>
//                                 ) : (
//                                     <span className="text-gray-500">Leader</span>
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-600">Team Leaders</h2>
//             <table className="min-w-full bg-white shadow-lg rounded">
//                 <thead>
//                     <tr className="bg-indigo-500 text-white">
//                         <th className="py-3 px-6 border-b">Name</th>
//                         <th className="py-3 px-6 border-b">Rank</th>
//                         <th className="py-3 px-6 border-b">Gender</th>
//                         <th className="py-3 px-6 border-b">Date of Joining</th>
//                         <th className="py-3 px-6 border-b">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {teamLeaders.map(leader => (
//                         <tr key={leader.id} className="bg-gray-100 hover:bg-gray-200">
//                             <td className="py-3 px-6 border-b">{leader.team_member.name}</td>
//                             <td className="py-3 px-6 border-b">{leader.team_member.rank}</td>
//                             <td className="py-3 px-6 border-b">{leader.team_member.gender}</td>
//                             <td className="py-3 px-6 border-b">{leader.team_member.date_of_joining}</td>
//                             <td className="py-3 px-6 border-b">
//                                 <button
//                                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                                     onClick={() =>{ demoteToMember(leader.team_member.id);console.log(leader.team_member.id);}}
//                                 >
//                                     Demote to Member
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [teamLeaders, setTeamLeaders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTeamMembers();
        fetchTeamLeaders();
    }, []);

    const fetchTeamMembers = async () => {
        const response = await fetch('http://localhost:8000/api/team-members');
        const data = await response.json();
        setTeamMembers(data);
    };

    const fetchTeamLeaders = async () => {
        const response = await fetch('http://localhost:8000/api/team-leaders');
        const data = await response.json();
        setTeamLeaders(data);
    };

    const promoteToLeader = async (id) => {
        const response = await fetch(`http://localhost:8000/api/team-members/${id}/promote_to_leader`, {
            method: 'POST',
        });
        if (response.ok) {
            // Find the promoted member
            const promotedMember = teamMembers.find(member => member.id === id);
            // Mark as leader in the teamMembers list
            setTeamMembers(teamMembers.map(member =>
                member.id === id ? { ...member, is_leader: true } : member
            ));
            // Add to teamLeaders list
            setTeamLeaders([...teamLeaders, { team_member: promotedMember }]);
        }
    };

    const demoteToMember = async (id) => {
        const response = await fetch(`http://localhost:8000/api/team-leaders/${id}/demote_to_member`, {
            method: 'POST',
        });
        if (response.ok) {
            // Mark as not a leader in the teamMembers list
            setTeamMembers(teamMembers.map(member =>
                member.id === id ? { ...member, is_leader: false } : member
            ));
            // Remove from teamLeaders list
            setTeamLeaders(teamLeaders.filter(leader => leader.team_member.id !== id));
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            navigate('/login');
            console.log('Logout successful');
        } catch (error) {
            console.error('Error occurred during logout', error);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800">Admin View</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                >
                    Logout
                </button>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Team Members</h2>
            <table className="min-w-full bg-white shadow-lg rounded mb-8">
                <thead>
                    <tr className="bg-indigo-500 text-white">
                        <th className="py-3 px-6 border-b">Name</th>
                        <th className="py-3 px-6 border-b">Rank</th>
                        <th className="py-3 px-6 border-b">Gender</th>
                        <th className="py-3 px-6 border-b">Date of Joining</th>
                        <th className="py-3 px-6 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {teamMembers.map(member => (
                        <tr key={member.id} className="bg-gray-100 hover:bg-gray-200">
                            <td className="py-3 px-6 border-b">{member.name}</td>
                            <td className="py-3 px-6 border-b">{member.rank}</td>
                            <td className="py-3 px-6 border-b">{member.gender}</td>
                            <td className="py-3 px-6 border-b">{member.date_of_joining}</td>
                            <td className="py-3 px-6 border-b">
                                {!member.is_leader ? (
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        onClick={() => {promoteToLeader(member.id); console.log(member.id);}}
                                    >
                                        Promote to Leader
                                    </button>
                                ) : (
                                    <span className="text-gray-500">Leader</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Team Leaders</h2>
            <table className="min-w-full bg-white shadow-lg rounded mb-8">
                <thead>
                    <tr className="bg-indigo-500 text-white">
                        <th className="py-3 px-6 border-b">Name</th>
                        <th className="py-3 px-6 border-b">Rank</th>
                        <th className="py-3 px-6 border-b">Gender</th>
                        <th className="py-3 px-6 border-b">Date of Joining</th>
                        <th className="py-3 px-6 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {teamLeaders.map(leader => (
                        <tr key={leader.id} className="bg-gray-100 hover:bg-gray-200">
                            <td className="py-3 px-6 border-b">{leader.team_member.name}</td>
                            <td className="py-3 px-6 border-b">{leader.team_member.rank}</td>
                            <td className="py-3 px-6 border-b">{leader.team_member.gender}</td>
                            <td className="py-3 px-6 border-b">{leader.team_member.date_of_joining}</td>
                            <td className="py-3 px-6 border-b">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={() =>{ demoteToMember(leader.team_member.id);console.log(leader.team_member.id);}}
                                >
                                    Demote to Member
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
