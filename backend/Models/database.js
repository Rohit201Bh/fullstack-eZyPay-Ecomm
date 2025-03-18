import mongoose from 'mongoose';

// Replace these with your actual username, password, and database name

const mongoURI = `mongodb+srv://rohitbhardwaj458:J3nMcX4tLoZCNnCy@finalcluster.ufyd8.mongodb.net/?retryWrites=true&w=majority&appName=finalcluster`;

mongoose.connect(mongoURI)
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.log('Error in MongoDB ... ', err);
});
