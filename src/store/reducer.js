const isLogin = localStorage.getItem('isLogin')

const initState = {
  isLogin : isLogin ? JSON.parse(isLogin) : null
}

const reducer = (state=initState,action) => {
  if(action.type === 'LOGIN_IN'){
    let isLogin = localStorage.getItem('isLogin')
    console.log(isLogin)
    return {
      ...state,
      isLogin
    }
  }
  return state
}

export default reducer