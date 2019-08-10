import React from 'react'
import Participants from './Participants'
import './SidePanel.css'

const SidePanel = (props) => {

  return (
    <div className='sidepanel'>
      <div className='profile'>
        <div className='wrap'>
          <img src='http://emilcarlsson.se/assets/mikeross.png' />
          <p>Mike Holls</p>
        </div>
      </div>
      <Participants {...props} />
    </div>
  )
}

export default SidePanel
