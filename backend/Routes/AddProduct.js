import express from'express';
const router = express.Router();
import Product from '../Models/AddProductSchema.js';

router.post('/add', async (req, resp) => {
    try {
        const data = req.body;
        const newProduct = new Product(data);
        await newProduct.save();
        resp.status(200).json({ message: "Product Added Successfully" });
    } catch (error) {
        console.log("Error Found", error);
        resp.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/read', async (req, resp) => {
    try {
        const products = await Product.find();
        resp.status(200).json({ products });
    } catch (error) {
        console.log("Error Found", error);
        resp.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;