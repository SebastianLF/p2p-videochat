import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { isAuthenticated } from './authentication.js'
import CreateRoom from './components/CreateRoom'
import Room from './components/Room'
import NoMatch from './components/NoMatch'
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
            <Route path='/' exact component={CreateRoom} />
            <PrivateRoute path='/:roomId' component={Room} />
            <Route component={NoMatch} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )} />
  </BrowserRouter>
)

function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => isAuthenticated()
        ? <Component {...props} />
        : <Redirect to={'/'} />
      }
    />
  )
}

export default Routes
