import React from "react"

const MessageBubble = ({ message, isOwn }) => {
    const extraStyles = isOwn
        ? { backgroundColor: "green" }
        : { backgroundColor: "darkgrey", marginLeft: "auto" }

    return (
        <div style={{ ...styles.containerStyles, ...extraStyles }}>
            <span>{message.message}</span>
        </div>
    )
}

const styles = {
    containerStyles: {
        display: "flex",
        maxWidth: 350,
        width: 200,
        marginTop: 25,
        color: "white",
        padding: "15px",
        borderRadius: "10px",
    },
}

export default MessageBubble
