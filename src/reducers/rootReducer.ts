import { combineReducers } from 'redux'

import agoraStatesReducer from './agoraStatesReducer'

const rootReducer = combineReducers({
  agoraStates: agoraStatesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
