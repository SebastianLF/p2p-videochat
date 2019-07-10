import React from 'react'

function Input({ value, handleTyping, addMessage }) {
  return (
    <div>
      <form>
        <input type="text" name="message" value={value} onChange={handleTyping} />
        <input type="submit" value="SEND" onClick={addMessage} />
      </form>
    </div>
  )
}

export default Input
