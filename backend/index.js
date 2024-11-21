const express = require("express")
const app = express()
const { Server } = require("socket.io")

const httpServer = app.listen(5000, () => {
    console.log(`Server listening on port: 5000`)
})

const io = new Server(httpServer, {
    cors: { origin: "http://localhost:3000" },
    pingInterval: 25000,
    pingTimeout: 60000,
    maxHttpBufferSize: 1e8,
    connectionStateRecovery: {},
})

app.set("io", io)

io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        const { chatRoomName } = data
        socket.join(chatRoomName)
    })

    socket.on("new_message", (data) => {
        const { roomname, username, message } = data
        socket.to(roomname).emit("received_message", { message, username })
    })
})

require("./routes")(app)
