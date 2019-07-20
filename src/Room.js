import React from "react"
import ConversationBox from './ConversationBox'

const Room = ({ roomName }) => {
    return  (
        <div>
            <h1>{`Room: ${roomName}`}</h1>
            <ConversationBox roomName={roomName} />
        </div>
    )
}

export default Room