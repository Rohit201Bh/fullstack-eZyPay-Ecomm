import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddProduct from '../Components/AddProduct';

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showAddProduct, setShowAddProduct] = useState(false);

    const { username } = location.state || {};

    useEffect(() => {
        if (!username) {
            navigate('/login');
        }
    }, [username, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };
    const handleNavigate = () => {
        navigate('/ProductCard');
    };

    const handleAddProduct = () => {
        setShowAddProduct(true);
    };

    const handleCloseAddProduct = () => {
        setShowAddProduct(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center text-white p-6">
            {/* Navbar */}
            <div className="w-full fixed top-0 left-0 flex justify-between items-center py-5 px-8 bg-opacity-20 backdrop-blur-lg rounded-b-xl shadow-md z-50">

                <h1 className="text-3xl font-bold">eZyPay</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-900 text-white py-2 px-4 rounded-lg transition-all duration-300"
                >
                    Logout
                </button>
            </div>
            
            {/* Welcome Section */}
            <div className="text-center mt-8">
                <h2 className="text-5xl font-extrabold">Welcome, {username}!</h2>
                <p className="mt-10 text-lg text-gray-200">Find the best products or add your own items to the marketplace.</p>
            </div>
            
            {/* Buttons Section */}
            <div className="mt-8 flex flex-wrap gap-6">
                <button
                    onClick={handleNavigate}
                    className="bg-blue-600 hover:bg-blue-800 text-white py-4 px-9 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
                >
                    🛍️ Shop Items
                </button>
                <button
                    onClick={handleAddProduct}
                    className="bg-green-500 hover:bg-green-800 text-40 text-white py-4 px-9 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                    📦 Add Product
                </button>
            </div>
            
            {/* Add Product Modal */}
            {showAddProduct && <AddProduct onClose={handleCloseAddProduct} />}
        </div>
    );
}

export default Home;