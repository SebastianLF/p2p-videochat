import React from 'react'
import './NoMatch.css'

const NoMatch = ({ location }) => {
  return (
    <div className='page-404'>
      <h1>404</h1>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  )
}

export default NoMatch
