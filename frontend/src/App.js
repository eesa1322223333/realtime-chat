import logo from "./logo.svg"
import "./App.css"
import { useNavigate } from "react-router-dom"
import { useContext, useRef } from "react"
import SocketContext from "./SocketContext"

function App() {
    const navigate = useNavigate()
    const inputTextRef = useRef("")
    const usernameRef = useRef("")
    const { socket } = useContext(SocketContext)

    const handleSubmit = (e) => {
        const chatRoomName = inputTextRef.current.value
        const username = usernameRef.current.value
        if (!chatRoomName || !username) return

        socket.emit("join_room", { chatRoomName, username })
        return navigate(`/chat/${chatRoomName}/${username}`)
    }

    return (
        <div className='App'>
            <div style={styles.container}>
                <input
                    ref={inputTextRef}
                    type='text'
                    style={styles.inputBtn}
                    placeholder='Enter chat room name:'
                />

                <input
                    ref={usernameRef}
                    type='text'
                    style={styles.inputBtn}
                    placeholder='Enter Username:'
                />
                <button
                    onClick={handleSubmit}
                    style={styles.submitBtn}
                >
                    Enter
                </button>
            </div>
        </div>
    )
}

const styles = {
    inputBtn: {
        width: "400px",
        height: 42,
        backgroundColor: "#FAFAFA",
        border: "1px solid grey",
        textIndent: 6,
    },
    submitBtn: {
        width: "406px",
        height: 42,
        color: "white",
        fontWeight: "bold",
        backgroundColor: "green",
        marginTop: 5,
        border: "1px solid grey",
        textIndent: 6,
    },
    container: {
        marginTop: 45,
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
}

export default App
