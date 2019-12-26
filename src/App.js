import React from 'react'
import PageLayout from './component/PageLayout'
import { HashRouter as Router, Route } from 'react-router-dom'
const App = () => {
  return(
    <Router>
      <Route path='/' component={PageLayout}></Route>
    </Router>
  )
}
export default App