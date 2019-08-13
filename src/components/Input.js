import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons'

import './Input.css'

function Input ({ value, handleTyping, sendMessage, error }) {
  return (
    <div className='send'>
      <form>
        <input type='text' name='message' placeholder='Your message' value={value} onChange={handleTyping} />
        <button type="button" className='file'><FontAwesomeIcon icon={faPaperclip} /></button>
        <button type='submit' onClick={sendMessage}><FontAwesomeIcon icon={faPaperPlane} /></button>
        <p>{error}</p>
      </form>

    </div>
  )
}

export default Input
