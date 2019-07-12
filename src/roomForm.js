import React from "react";

const RoomForm = ({ handleChange, handleSubmit }) => {
    return (
        <div>
            <h1>Enter a room:</h1>
            <form onSubmit={ handleSubmit }>
                <input type='text' onChange={ handleChange }></input>
                <input type='submit' value='send'></input>
            </form>
        </div>
    )
}

export default RoomForm