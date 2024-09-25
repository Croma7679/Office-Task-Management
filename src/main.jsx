import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css'
import { RouterProvider,createBrowserRouter} from 'react-router-dom'
import Layout from './Layout.jsx'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import AdminPage from './pages/AdminPage.jsx';
import { AuthProvider } from './context/Auth.jsx';
import ProtectedRoute from './components/Protectedroute.jsx';
import TeamLeaderPage from './pages/TeamLeaderPage.jsx';
import TeamMemberPage from './pages/TeamMemberPage.jsx';


const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout />,
    children:[
        {
        path:"login",
        element:<Login/>,
        },
        {
          path:"signup",
          element:<SignUp/>
          
        }

    ]
  },
   {
    path:"/admin",
    element:<AdminPage/>
    
   },
  {
    path:"/team-leader",
    // element: <ProtectedRoute element={<TeamLeaderPage/>}/>
    element:<TeamLeaderPage/>
    
  },
  {
    path:"/team-member",
    element: <TeamMemberPage/>
    
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    
  </React.StrictMode>
);
// index.js
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import Layout from './Layout.jsx';
// import Login from './components/Login/Login';
// import SignUp from './components/SignUp/SignUp';
// import AdminPage from './pages/AdminPage.jsx';
// import { AuthProvider } from './context/Auth.jsx';
// import ProtectedRoute from './components/Protectedroute.jsx';
// import TeamLeaderPage from './pages/TeamLeaderPage.jsx';
// import TeamMemberPage from './pages/TeamMemberPage.jsx';
// import NotAuthorized from './pages/Notauthorised';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         path: 'login',
//         element: <Login />,
//       },
//       {
//         path: 'signup',
//         element: <SignUp />,
//       },
//     ],
//   },
//   {
//     path: '/admin',
//     element: <ProtectedRoute element={<AdminPage />} roles={['Admin']} />,
//   },
//   {
//     path: '/team-leader',
//     element: <ProtectedRoute element={<TeamLeaderPage />} roles={['Team Leader']} />,
//   },
//   {
//     path: '/team-member',
//     element: <ProtectedRoute element={<TeamMemberPage />} roles={['Team Member']} />,
//   },
//   {
//     path: '/not-authorized',
//     element: <NotAuthorized />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <RouterProvider router={router}></RouterProvider>
//     </AuthProvider>
//   </React.StrictMode>
// );
