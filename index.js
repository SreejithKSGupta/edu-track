const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes')
const userRoutes = require('./routes/userRoutes')
const notificationRoutes = require('./routes/notificationRoutes')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDB connected!!!");
}).catch((err)=>{
    console.log(err);
})

app.use(studentRoutes)
app.use(userRoutes)
app.use(notificationRoutes)

app.listen(PORT, ()=>{
    console.log(`Listening on PORT: ${PORT}`);
})