import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import CreateRoom from './components/CreateRoom'
import JoinRoom from './components/JoinRoom'

const Routes = (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={AppRouter} />
      <Route path='/create' component={CreateRoom} />
      <Route path='/join' component={JoinRoom} />
    </Switch>
  </BrowserRouter>
)

export default Routes
