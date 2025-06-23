const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
const app = express();
const port = 5000;
var cors=require('cors');
app.use(cors());

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(express.json());

//available routes
app.get('/', (req, res) => {
    res.send('Hello World! iNotebook Backend is running');
});
 app.use('/api/auth', require('./routes/auth'));
 app.use('/api/notes', require('./routes/notes'));
 
 
// Start server
app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`);
});