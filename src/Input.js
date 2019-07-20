import React from 'react'

function Input({ value, handleTyping, sendMessage, error }) {
  return (
    <div>
      <form>
        <input type="text" name="message" value={value} onChange={handleTyping} />
        <input type="submit" value="SEND" onClick={sendMessage} />
        <p>{error}</p>
      </form>
      
    </div>
  )
}

export default Input
