import React from 'react'
import Participant from './Participant'
import './Participants.css'

const Participants = ({ participants }) => {

  const mapParticipants = () => participants && participants.map((participant) => <Participant key={participant.id} participant={participant} />)

  return <div className='participants'><ul >{mapParticipants()}</ul></div>
}

export default Participants
