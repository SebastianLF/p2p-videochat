import React from 'react'

function Input ({ value, handleTyping, sendMessage, error }) {
  const inputStyle = { border: 'none' }
  const buttonStyle = { display: 'none' }

  return (
    <div>
      <form>
        <input style={inputStyle} type='text' name='message' placeholder='Your message' value={value} onChange={handleTyping} />
        <input style={buttonStyle} type='submit' value='SEND' onClick={sendMessage} />
        <p>{error}</p>
      </form>

    </div>
  )
}

export default Input
