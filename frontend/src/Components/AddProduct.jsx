import React, { useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { X } from "lucide-react";

const AddProduct = ({ onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleAddProduct = async () => {
        const productData = {
            name,
            description,
            image: imageUrl,
            price,
        };

        try {
            const response = await axios.post(`http://localhost:4800/api/addproduct/add`, productData);
            console.log(response.data);
            onClose();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20 max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-200 hover:text-white"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          Add Product
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/30 focus:ring-2 focus:ring-white"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/30 focus:ring-2 focus:ring-white"
          ></textarea>
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/30 focus:ring-2 focus:ring-white"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/30 focus:ring-2 focus:ring-white"
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-700 text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAddProduct}
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 text-white transition"
            >
              Add Product
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddProduct;