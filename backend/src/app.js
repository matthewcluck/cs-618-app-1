import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'

const app = express()
app.use(bodyParser.json())
app.use(cors())

postsRoutes(app)
userRoutes(app)

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  console.log('user connected:', socket.id)
  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id)
  })
})

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

// export { app }

export { server as app }
