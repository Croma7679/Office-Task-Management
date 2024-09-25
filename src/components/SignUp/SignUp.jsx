// import React, { useState } from 'react';

// const AuthForm = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [mobileNo, setMobileNo] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//   };

//   const handleOtpSend = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/send_otp/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ mobile_no: mobileNo }),
//       });
//       const data = await response.json();
//       if (data.status === 'OTP sent') {
//         setIsOtpSent(true);
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//     }
//   };

//   const handleOtpVerify = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/verify_otp/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ mobile_no: mobileNo, otp }),
//       });
//       const data = await response.json();
//       if (data.status === 'OTP verified') {
//         setIsOtpVerified(true);
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isLogin) {
//       // Handle login logic here
//     } else {
//       // Handle sign up logic here
//       if (password !== confirmPassword) {
//         console.error('Passwords do not match');
//         return;
//       }
//       if (!isOtpVerified) {
//         console.error('OTP not verified');
//         return;
//       }
//       try {
//         const response = await fetch('http://localhost:8000/api/create_user/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             name,
//             email,
//             password,
//             mobile_no: mobileNo,
//           }),
//         });
//         const data = await response.json();
//         if (data.status === 'User created') {
//           setIsLogin(true); // Switch to login form after successful sign up
//         }
//       } catch (error) {
//         console.error('Error signing up:', error);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-400">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           {isLogin ? 'Login' : 'Sign Up'}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Mobile Number</label>
//                 <input
//                   type="text"
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your mobile number"
//                   value={mobileNo}
//                   onChange={(e) => setMobileNo(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   className="w-full bg-blue-500 text-white py-2 mt-2 rounded-md hover:bg-blue-600 transition duration-200"
//                   onClick={handleOtpSend}
//                 >
//                   Send OTP
//                 </button>
//               </div>
//               {isOtpSent && (
//                 <div className="mb-4">
//                   <label className="block text-gray-700">OTP</label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                   />
//                   <button
//                     type="button"
//                     className="w-full bg-blue-500 text-white py-2 mt-2 rounded-md hover:bg-blue-600 transition duration-200"
//                     onClick={handleOtpVerify}
//                   >
//                     Verify OTP
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           {!isLogin && (
//             <div className="mb-4">
//               <label className="block text-gray-700">Confirm Password</label>
//               <input
//                 type="password"
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Confirm your password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>
//           )}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
//           >
//             {isLogin ? 'Login' : 'Sign Up'}
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <p className="text-gray-600">
//             {isLogin ? "Don't have an account?" : 'Already have an account?'}
//             <button
//               onClick={toggleForm}
//               className="text-blue-500 ml-1 hover:underline"
//             >
//               {isLogin ? 'Sign Up' : 'Login'}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;

import React from 'react';

const AdminPage = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default AdminPage;


