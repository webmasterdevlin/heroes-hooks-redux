import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { heroReducer } from "../heroes/hero-reducer";
import { villainReducer } from "../villains/villain-reducer";
import { heroSaga } from "../heroes/hero-saga";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  heroReducer: heroReducer,
  villainReducer: villainReducer
});
const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware]; // thunk and saga are side-effect middleware. You don't need both. You just need one.
const store = createStore(
  rootReducer,
  withDevTools(applyMiddleware(...middleware))
);
sagaMiddleware.run(heroSaga);

export default store;
