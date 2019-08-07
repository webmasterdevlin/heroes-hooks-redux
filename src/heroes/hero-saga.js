import { put, takeEvery, call, fork } from "redux-saga/effects";
import {
  postHero,
  getHeroes,
  deleteHero,
  putHero,
  getHeroById
} from "./hero-service";
import { all } from "@redux-saga/core/effects";
import {
  FETCH_HEROES_SUCCESS,
  FETCH_HEROES_FAIL,
  REMOVE_HERO_REQUEST,
  UPDATE_HERO_REQUEST,
  ADD_HERO_REQUEST,
  FETCH_HERO_BY_ID_REQUEST,
  FETCH_HEROES_REQUEST,
  ADD_HERO_FAIL,
  ADD_HERO_SUCCESS,
  FETCH_HERO_BY_ID_FAIL,
  FETCH_HERO_BY_ID_SUCCESS,
  REMOVE_HERO_FAIL,
  REMOVE_HERO_SUCCESS,
  UPDATE_HERO_FAIL,
  UPDATE_HERO_SUCCESS
} from "./hero-actions";

/*function generator implementations of Saga*/
function* fetchingHeroes() {
  try {
    const { data } = yield call(getHeroes); // Saga: Passing a reference only
    yield put({ type: FETCH_HEROES_SUCCESS, payload: data });
  } catch (e) {
    setError(e);
    yield put({
      type: FETCH_HEROES_FAIL,
      payload: e.message
    });
  }
}
function* fetchingHeroById({ payload: id }) {
  try {
    const { data } = yield getHeroById(id);
    yield put({
      type: FETCH_HERO_BY_ID_SUCCESS,
      payload: data
    });
  } catch (e) {
    setError(e);
    yield put({
      type: FETCH_HERO_BY_ID_FAIL,
      payload: e.message
    });
  }
}
function* addingHero({ payload: newHero }) {
  try {
    const { data } = yield postHero(newHero);
    yield put({ type: ADD_HERO_SUCCESS, payload: data });
  } catch (e) {
    setError(e);
    yield put({
      type: ADD_HERO_FAIL,
      payload: e.message
    });
  }
}
function* updatingHero({ payload: updatedHero }) {
  try {
    yield putHero(updatedHero);
    yield put({ type: UPDATE_HERO_SUCCESS, payload: updatedHero });
  } catch (e) {
    setError(e);
    yield put({
      type: UPDATE_HERO_FAIL,
      payload: e.message
    });
  }
}
function* removingHero({ payload: id }) {
  try {
    yield deleteHero(id);
    yield put({ type: REMOVE_HERO_SUCCESS, payload: id });
  } catch (e) {
    setError(e);
    yield put({
      type: REMOVE_HERO_FAIL,
      payload: e.message
    });
  }
}
const setError = ({ message }) => {
  console.log(message);
  alert(message);
};

/*Saga watches the actions of hero-actions*/
function* watchFetchingHeroes() {
  yield takeEvery(FETCH_HEROES_REQUEST, fetchingHeroes);
}
function* watchFetchingHeroById() {
  yield takeEvery(FETCH_HERO_BY_ID_REQUEST, fetchingHeroById);
}
function* watchAddingHero() {
  yield takeEvery(ADD_HERO_REQUEST, addingHero);
}
function* watchUpdatingHero() {
  yield takeEvery(UPDATE_HERO_REQUEST, updatingHero);
}
function* watchRemovingHero() {
  yield takeEvery(REMOVE_HERO_REQUEST, removingHero);
}

/*Saga sends all the watchers to the sagaMiddleware to run.*/
export function* heroSaga() {
  yield all([
    watchFetchingHeroes(),
    watchFetchingHeroById(),
    watchAddingHero(),
    watchUpdatingHero(),
    watchRemovingHero()
  ]);
  // yield [fork(watchFetchingHeroes)]; NOTE: fork does not work anymore
}
