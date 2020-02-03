import { combineReducers } from 'redux'
import popupReducer from './popupReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  popupReducer,
  userReducer
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>