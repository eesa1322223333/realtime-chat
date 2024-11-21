import { createContext, useEffect, useState } from "react"
import io from "socket.io-client"

const SocketContext = createContext(false)

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const socket_instance = io("http://localhost:5000")
        setSocket(socket_instance)

        return () => socket_instance?.disconnect()
    }, [])

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}

export default SocketContext
