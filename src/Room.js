import React from "react"
import Chatbox from './Chatbox'

const Room = ({ roomName }) => {
    return  (
        <div>
            <h1>{`Room: ${roomName}`}</h1>
            <Chatbox />
        </div>
    )
}

export default Room