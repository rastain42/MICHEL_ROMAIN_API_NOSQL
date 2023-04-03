require('dotenv').config();
const express = require('express');
const server = express()
server.use(express.json())

const mainRouter = require('./app/routes/mainRouter');

server.use('/', mainRouter);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})