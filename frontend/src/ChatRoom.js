import React, { useContext, useRef, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Chat.css"
import SocketContext from "./SocketContext"
import MessageBubble from "./MessageBubble"

const ChatRoom = () => {
    const { roomname, username } = useParams()
    const inputRef = useRef("")
    const { socket } = useContext(SocketContext)
    const [messages, setMessages] = useState([])

    const handleSend = async () => {
        const text = inputRef.current.value
        if (!text) return

        socket.emit("new_message", { roomname, username, message: text })

        setMessages((prev) => [...prev, { roomname, username, message: text }])

        inputRef.current.value = ""
    }

    useEffect(() => {
        if (!socket) return

        socket.on("received_message", (data) => {
            setMessages((prev) => [...prev, data])
        })

        return () => socket.off("received_message")
    }, [socket])

    if (!roomname || !username) return <div>Make sure username and chatroom is in title</div>

    return (
        <div className='chat-container'>
            <div className='chat-header'>{roomname}</div>

            <div className='chat-screen'>
                {messages.map((m) => {
                    return (
                        <MessageBubble
                            message={m}
                            key={Math.random()}
                            isOwn={username === m.username}
                        />
                    )
                })}
            </div>

            <div className='chat-input-container'>
                <input
                    type='text'
                    ref={inputRef}
                    className='chat-input'
                    placeholder='Enter a message: '
                />
                <button
                    onClick={handleSend}
                    className='chat-send-button'
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatRoom
