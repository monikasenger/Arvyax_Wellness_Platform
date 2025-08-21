import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import authrouter from './routes/authRoutes.js'
import sessionrouter from './routes/sessionRoutes.js'

//app config
const app= express()
const port =process.env.PORT || 4000
connectDB()


//middlewares
app.use(express.json())
app.use(cors())

app.use("/api/auth", authrouter);
app.use("/api", sessionrouter);

app.get('/',(req,res)=>{
res.send('API WORKING ')
})

app.listen(port, ()=> console.log("Server Started", port))