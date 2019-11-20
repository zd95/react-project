import {
  createStore,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import {
  composeWithDevTools
} from 'redux-devtools-extension'
import reducers from './reducers'

//区分开发环境
const middleware = process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
//创建store对象
export default createStore(reducers, middleware)