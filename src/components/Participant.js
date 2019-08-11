import React from 'react'

const Participant = ({ participant }) => {
  return (
    <li className='participant'>
      <div className='wrap'>
        <span className='status-indicator' />
        <img src='http://emilcarlsson.se/assets/mikeross.png' alt='face user' />
        <div className='meta'>
          <div className='name'>{participant.name}</div>
          <div className='status'>In-chat</div>
        </div>
      </div>
    </li>
  )
}

export default Participant
