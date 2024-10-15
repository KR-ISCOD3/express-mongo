import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import connectdb from './config/db.js';
import authRoute from './routes/authRoute.js';
import adminrouter from './routes/adminRoute.js'
import userrouter from './routes/userRoute.js';
import { requireAdmin, requireUser } from './middleware/auth.js';
import Job from './model/jobModel.js';


// declare app for using express function
const app = express();

app.use(express.json());

// config env
config();
// call connection from db.js
connectdb();

// use cors to allow user to access from deffrent domain
app.use(cors());

// Define route to fetch jobs from MongoDB
app.get('/get', async (req, res) => {
    try {
        // Find all jobs
        const jobs = await Job.find();  // Correct use of the Mongoose Job model

        // Respond with jobs
        res.status(200).json({ jobs });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/job/:id',async (req,res) => {
    const {id} = req.params;
    try{
        const job = await Job.findById(id);
        if(!job){
            return res.status(404).json({ message: "Job not found "})
        }
        res.status(200).json({job});
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})



app.use('/auth',authRoute);
// app.use('/user',requireUser,userrouter);
app.use('/admin',adminrouter);

// declare port for running server
const PORT = process.env.PORT || 5550;

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);   
})

