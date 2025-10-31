import express , {json} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { userauth } from './Routes/userauth.js';
dotenv.config();
const app =express();
app.use(cors({
    origin:'*',
    credentials:true
}));
app.use(json());
app.use('/uploads', express.static('uploads'));

app.use("/",userauth);


mongoose.connect('mongodb://localhost:27017/ARCHITECTURE3D').then(()=>{
    console.log("MongoDB connected successfully to the Architecture3d");
})
.catch((error)=>{
    console.error("MongoDB connction failed",error);
});

app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`);
});