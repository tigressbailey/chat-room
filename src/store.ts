import { createStore, applyMiddleware, Action } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer, { RootState } from './reducers/rootReducer'

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
  // other store enhancers if any
)

const store = createStore(rootReducer, composedEnhancer)

if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
  ;(module as any).hot.accept('./reducers/rootReducer.ts', () => store.replaceReducer(rootReducer))
}

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export default store
