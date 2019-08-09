import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { isAuthenticated } from './authentication.js'
import AppRouter from './components/AppRouter'
import CreateRoom from './components/CreateRoom'
import JoinRoom from './components/JoinRoom'
import Room from './components/Room'
import NoMatch from './components/NoMatch'

const Routes = (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={AppRouter} />
      <Route path='/create' component={CreateRoom} />
      <Route path='/join' component={JoinRoom} />
      <PrivateRoute path='/:roomId' component={Room} />
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>
)

function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => isAuthenticated()
        ? <Component {...props} />
        : props.history.replace('/join')
      }
    />
  )
}

export default Routes
