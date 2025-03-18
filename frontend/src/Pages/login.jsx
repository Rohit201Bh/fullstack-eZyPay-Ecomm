import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/home');
        }
    }, [navigate]);

    async function handleLogin(e) {
        e.preventDefault();
        const data = {
            email,
            password
        };
        try {
            const response = await fetch(`http://localhost:4800/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log(response);

            const result = await response.json();
            console.log("Token is", result.Token);
            if (result.Token) {
                // console.log('user is',user,' ans Token is',Token);
                // localStorage.setItem('user', JSON.stringify(result.User));
                localStorage.setItem('token', result.Token);
                navigate('/home', { state: { username: result.User.name } });
            } else {
                alert(`Login failed: ${result.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred while logging in.');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex  items-center justify-center text-white px-4 lg:px-20 w-full">
            {/* Navbar */}
            <div className="w-full fixed top-0 left-0 flex justify-between  py-5 px-8 bg-opacity-20 backdrop-blur-lg rounded-b-xl shadow-md z-50">
                <h1 className="text-3xl font-bold">eZyPay</h1>
                
            </div>

            {/* Animated Form with Border & Shadow */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className="bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 shadow-2xl shadow-black/40 rounded-2xl p-10 max-w-sm w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-xl text-white text-center "
            >
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-White"
                >
                    Login
                </motion.h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email Input */}
                    <motion.input
                        id='email-input'
                        type='email'
                        value={email}
                        placeholder='E-mail'
                        onChange={(e) => setEmail(e.target.value)}
                        whileFocus={{ scale: 1.05, boxShadow: "0px 0px 12px rgba(255,255,255,0.3)" }}
                        className="w-full px-4 py-3 text-black bg-white bg-opacity-30 rounded-lg border border-white border-opacity-30 focus:ring-2 focus:ring-blue-300 outline-none placeholder-gray-200 transition-all duration-300"
                    />

                    {/* Password Input */}
                    <motion.input
                        id='password-input'
                        type='password'
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        whileFocus={{ scale: 1.05, boxShadow: "0px 0px 12px rgba(255,255,255,0.3)" }}
                        className="w-full px-4 py-3 text-black bg-white bg-opacity-30 rounded-lg border border-white border-opacity-30 focus:ring-2 focus:ring-blue-300 outline-none placeholder-gray-200 transition-all duration-300"
                    />

                    {/* Login Button */}
                    <motion.input
                        type="submit"
                        value="Login"
                        whileHover={{ scale: 1.05, backgroundColor: "#2563eb", boxShadow: "0px 4px 15px rgba(37, 99, 235, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-3 px-4 rounded-lg cursor-pointer"
                    />
                </form>

                {/* Register Link */}
                <p className="mt-4 text-sm">
                    Don't have an account?{" "}
                    <Link to='/register' className="text-blue-200 hover:text-white transition-all duration-300">
                        Register here
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default Login;
