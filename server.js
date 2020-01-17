const express = require('express')
const cors = require('cors')
const projectRouter = require('./projects/projectRouter.js')
const actionRouter = require('./actions/actionRouter.js')

const server = express()

server.use(express.json())
server.use(cors())
server.use(logger)

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware challenge!</h2>`);

})

function logger(req, res, next) {
    const { method, originalUrl } = req
    console.log(`${method} to ${originalUrl}`)
    next()
}

module.exports = server