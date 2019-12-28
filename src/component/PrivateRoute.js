import React from 'react'
import { Route,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
const PrivateRoute = ({component:Component,isLogin,...rest}) => {
  return (
    <Route {...rest} render={(props) => {
      if(isLogin){
        return <Component {...props}></Component>
      }else{
        return <Redirect to={{pathname:'/login',state:props.match.url}}></Redirect>
      }
    }}>
    </Route>
  )
}
export default connect(
  (state,ownProps) => {
    return {
      isLogin:state.isLogin
    }
  },
  (dispatch,ownProps) => {
    return {}
  }
)(PrivateRoute)