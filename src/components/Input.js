import React from 'react'

import './Input.css'

function Input ({ value, handleTyping, sendMessage, error }) {
  return (
    <div className='send'>
      <form>
        <input type='text' name='message' placeholder='Your message' value={value} onChange={handleTyping} />
        <input type='submit' value='SEND' onClick={sendMessage} />
        <p>{error}</p>
      </form>

    </div>
  )
}

export default Input
