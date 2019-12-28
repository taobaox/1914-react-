import React from 'react'
import PageLayout from '@/component/PageLayout'
import Login from '@/views/Login'
import PrivateRoute from '@/component/PrivateRoute'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index'
const App = () => {
  return(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <PrivateRoute path='/' component={PageLayout}></PrivateRoute>
        </Switch>
      </Router>
    </Provider>
  )
}
export default App