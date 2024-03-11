/*require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        // mongodb connection string
        console.log(process.env.MONGO_URI);
        const con = await mongoose.connect('mongodb+srv://sepide:Sepid123@cluster0.0i9x0mj.mongodb.net/?retryWrites=true&w=majority/auth')
        console.log(`MongoDB connected : ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB*/