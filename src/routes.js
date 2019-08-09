import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import { isAuthenticated } from './authentication.js'
import CONSTANTS from './constants.js'
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
  const roomId = rest.computedMatch.params.roomId
  console.log(rest)

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

/* function test () {
   /*<Route
      {...rest}
      render={props => {
         if (isAuthenticated()) {
          return (
            <Redirect to={{
            pathname: '/join',
            state: { roomId, hasParam: RegExp('^/:').test(rest.path) }
            }}
          )
        }
      } 
        
        /* !isAuthenticated() ? (
        
        />
      ) : checkValidRoomUrl(roomId) ? (
        <Component {...props} />
      ) : (
        <NoMatch {...props} />
      )
      } 
    />
} */

async function checkValidRoomUrl (roomId) {
  const result = await axios({
    url: `${CONSTANTS.API_URL}/rooms/${roomId}`,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(({ data }) => data)
    .catch((e) => console.error(e))

  console.log(result)
  console.log(result ? true : false )
  return result
}

export default Routes
