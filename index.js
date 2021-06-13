const express = require('express')
const cors = require('cors')
require('dotenv').config();

const connection = require('./mongo')


const TodoRouter = require('./routes/todo');

const app = express();
app.use(express.json())
app.use(cors())

app.use('/api', TodoRouter);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`)
})
