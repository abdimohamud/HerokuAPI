const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const authRouter = require("../auth/auth-router")
const postRouter = require("../posts/post-router")
const server = express()




server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api', authRouter)
server.use('/api/posts', postRouter)

module.exports = server
