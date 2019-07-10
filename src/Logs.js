import React from 'react'

function Logs({ logs }) {
  return (
    <div>
      {logs.map((log) => <li>{log}</li>)}
    </div>
  )
}

export default Logs
