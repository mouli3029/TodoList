const express = require('express')
const cors = require('cors')
require('dotenv').config();

const connection = require('./mongo')


const TodoRouter = require('./routes/todo');
const UserRouter = require('./routes/user');

const app = express();
app.use(express.json())
app.use(cors())

// Routes
app.use('/',(req,res)=>{
    res.send('API END POINT FOR TODO APPLICATION')
})
app.use('/api', TodoRouter);
app.use('/api',UserRouter);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`)
})
