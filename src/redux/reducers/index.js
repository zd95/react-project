import {
  combineReducers
} from 'redux'

import user from './user'
import category from './category'
import roles from './roles'
import language from './language'


export default combineReducers({
  user,
  categories:category,
  roles,
  language
})

