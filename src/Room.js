import React from "react"
import Chatbox from './ConversationBox'

const Room = ({ roomName }) => {
    return  (
        <div>
            <h1>{`Room: ${roomName}`}</h1>
            <Chatbox />
        </div>
    )
}

export default Room