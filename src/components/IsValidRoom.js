import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from './Loader'
import { API_URL } from '../constants'
import NoMatch from './NoMatch'
import Room from './Room'

function IsValidRoom({ component: Component, match }) {
    const [isLoading, setIsLoading] = useState(true)
    const [isValid, setIsValid] = useState(false)

    /*useEffect(() => {
        getRoomData(match.params.id)
            .then((data) => console.log(data))
    }, [match.params.id]) */

    if (isLoading) return <Loader />

    if (!isValid) return <NoMatch />

    return (
        <Room />
    )
}

const getRoomData = (roomId) => axios.get(`${API_URL}/room/${roomId}`)

export default IsValidRoom