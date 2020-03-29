const express = require('express');
const connectDB = require('./config/db')
const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));

app.get('/', (req,res)=>res.status(200))


// Define Routes
app.use('/api/artists', require('./routes/artists'));
app.use('/api/songs', require('./routes/songs'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on PORT: ${PORT}`));