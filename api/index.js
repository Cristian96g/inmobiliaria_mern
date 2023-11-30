import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});


app.use(express.json());
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);