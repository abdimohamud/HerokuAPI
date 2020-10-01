const express = require('express');

const server = express()
server.get ('/', (req, res) => {
    res.status(200).json({message: 'hello', port: `${process.env.PORT}`, environment: `${process.env.NODE_ENV}`})
})

module.exports = server;