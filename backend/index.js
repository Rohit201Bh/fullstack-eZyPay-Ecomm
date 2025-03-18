import payment from './Routes/Payment.js';
import User from './Models/UserSchema.js';
import AddProduct from './Routes/AddProduct.js';
import express from'express'
const app = express()
import './Models/database.js';

import bodyparser from'body-parser';
import cors from 'cors';
import path from "path";

app.use(bodyparser.json())
app.use(cors())
app.use(express.json())

import jwt from 'jsonwebtoken';
const _dirname = path.resolve();


app.post('/api/register', async (req, resp) => {
    console.log(req.body);
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        resp.send(user)
    } catch (error) {
        console.log("Error in signup",error);
        resp.send({'Error': error})
    }
})

app.post('/api/login', async (req, resp) => {
    console.log(req.body);
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });

        if (user) {
            const token = jwt.sign({
                name: user.name,
                email: user.email
            }, 'secretkey123');

            resp.send({ 'Token': token,'User':user});
        } else {
            resp.json({ status: 'error', message: 'Invalid email or password' });
        }
    } catch (error) {
        console.log("Error in login", error);
        resp.json({ status: 'error', message: 'An error occurred during login' });
    }
});

app.use('/api/payment',payment)
app.use('/api/addproduct',AddProduct)

if (process.env.NODE_ENV == "production") {
    app.use(express.static (path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {

        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


app.listen(4800, () => {
    console.log('Running on port 4800');
})