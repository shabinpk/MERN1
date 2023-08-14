const path=require('path')
const express=require('express')
const colors=require('colors')
const goalRoutes = require('./routes/goalRoutes')
const userRoutes = require('./routes/userRoutes')

const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const dotenv=require('dotenv').config()
connectDB();
const port=process.env.PORT || 5000
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals',goalRoutes)
app.use('/api/users',userRoutes)

if (process.env.NODE_ENV === 'production') {
    // Serve the static files from the frontend build directory
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    // For any other route, serve the index.html file from the build directory
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'))
    );
  } else {
    // This part should work for development mode
    app.get('/', (req, res) => res.send('Please set to production'));
  }
  
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`server started on port ${port} `)
})