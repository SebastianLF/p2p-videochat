import React from "react";

const RoomForm = ({ handleChange, handleSubmit, error }) => {

    return (
        <div>
            <h2>SKYPE CLONE</h2>
            <form onSubmit={ handleSubmit }>
                <label>Room:
                    <input type='text' onChange={ handleChange }></input>
                </label>
                <input type='submit' value='JOIN'></input>
            </form>
            <div>{ error !== '' ? error : '' }</div>
        </div>
    )
}

export default RoomForm