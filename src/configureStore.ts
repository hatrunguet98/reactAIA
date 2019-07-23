import { Store, createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { ApplicationState, rootReducer, rootSaga } from "./MainStore"

export default function configureStore(initialState: ApplicationState): Store<ApplicationState> {
  // const composeEnhancers = composeWithDevTools({})
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )

  sagaMiddleware.run(rootSaga)
  return store
}
