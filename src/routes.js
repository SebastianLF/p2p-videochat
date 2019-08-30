import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { isAuthed } from './authentication.js'
import CreateRoom from './components/CreateRoom'
import Room from './components/Room'
import NoMatch from './components/NoMatch'
import IsValidRoom from './components/IsValidRoom'
import './components/Transitions.css'

const Routes = (
  <BrowserRouter>
    <Route render={({ location }) => (
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames='fade'
        >
          <Switch location={location}>
            <Redirect from='/' to='/create' exact />
            <Route path='/create' exact component={CreateRoom} />
            <Route path='/:roomId' component={Room} />
            <Route component={NoMatch} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )} />
  </BrowserRouter>
)


function PrivateRoute(props) {
  return (
    <Route
      {...props}
      render={props => isAuthed
        ? <Room />
        : <Redirect to={'/'} />
      }
    />
  )
}

export default Routes
