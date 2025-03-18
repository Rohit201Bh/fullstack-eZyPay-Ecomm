import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function RegisterUser(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const data = {
      name,
      email,
      password
    };

    try {
      const response = await fetch(`http://localhost:4800/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Registration successful!');
        // Redirect or clear form fields if needed
      } else {
        const result = await response.json();
        alert(`Registration failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred while registering.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md text-white text-center border border-white/20"
      >
        <h1 className="text-4xl font-bold mb-6">Register</h1>
        <form onSubmit={RegisterUser} className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.05 }}
            id='name-input'
            type='text'
            value={name}
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 text-black bg-white bg-opacity-20 rounded-lg focus:ring-2 focus:ring-purple-300 outline-none placeholder-gray-200"
          />
          <motion.input
            whileFocus={{ scale: 1.05 }}
            id='email-input'
            type='email'
            value={email}
            placeholder='E-mail'
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-black bg-white bg-opacity-20 rounded-lg focus:ring-2 focus:ring-purple-300 outline-none placeholder-gray-200"
          />
          <motion.input
            whileFocus={{ scale: 1.05 }}
            id='password-input'
            type='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-black bg-white bg-opacity-20 rounded-lg focus:ring-2 focus:ring-purple-300 outline-none placeholder-gray-200"
          />
          <motion.input
            whileHover={{ scale: 1.05 }}
            type="submit"
            value="Register"
            className="w-full bg-purple-600 hover:bg-purple-800 transition-all duration-300 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
          />
        </form>
        <p className="mt-4 text-sm">Already Registered? <Link to='/login' className="text-blue-200 hover:text-white">Login here</Link></p>
      </motion.div>
    </div>
  );
}

export default Register;
