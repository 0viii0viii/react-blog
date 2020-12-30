import express from 'express';
import hpp from 'hpp';
import mongoose from 'mongoose';
import config from './config';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

// Routes
import postRoutes from './routes/api/post';
import userRoutes from './routes/api/user';


const app = express()
const { MONGO_URI } = config;

//security in deployment
app.use(hpp());
app.use(helmet());
app.use(cors({origin:true, credentials: true}));
app.use(morgan("dev"));

app.use(express.json());


mongoose
    .connect(MONGO_URI, {
        
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex: true, 
    
    })
    .then(()=> console.log("MongoDB is successfully connected!"))
    .catch((e)=> console.log(e));

// Use routes
app.get('/');
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);

export default app;