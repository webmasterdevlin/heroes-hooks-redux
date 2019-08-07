import {
  postVillain,
  getVillains,
  deleteVillain,
  putVillain,
  getVillainById
} from "./villain-service";
/*action types*/
export const FETCH_VILLAINS_REQUEST = "FETCH_VILLAINS_REQUEST";
export const FETCH_VILLAINS_SUCCESS = "FETCH_VILLAINS_SUCCESS";
export const FETCH_VILLAINS_FAIL = "FETCH_VILLAINS_FAIL";

export const FETCH_VILLAIN_BY_ID_REQUEST = "FETCH_VILLAIN_BY_ID_REQUEST";
export const FETCH_VILLAIN_BY_ID_SUCCESS = "FETCH_VILLAIN_BY_ID_SUCCESS";
export const FETCH_VILLAIN_BY_ID_FAIL = "FETCH_VILLAIN_BY_ID_FAIL";

export const ADD_VILLAIN_REQUEST = "ADD_VILLAIN_REQUEST";
export const ADD_VILLAIN_SUCCESS = "ADD_VILLAIN_SUCCESS";
export const ADD_VILLAIN_FAIL = "ADD_VILLAIN_FAIL";

export const UPDATE_VILLAIN_REQUEST = "UPDATE_VILLAIN_REQUEST";
export const UPDATE_VILLAIN_SUCCESS = "UPDATE_VILLAIN_SUCCESS";
export const UPDATE_VILLAIN_FAIL = "UPDATE_VILLAIN_FAIL";

export const REMOVE_VILLAIN_REQUEST = "REMOVE_VILLAIN_REQUEST";
export const REMOVE_VILLAIN_SUCCESS = "REMOVE_VILLAIN_SUCCESS";
export const REMOVE_VILLAIN_FAIL = "REMOVE_VILLAIN_FAIL";

export const SET_VILLAIN = "SET_VILLAIN";

/*action creators that uses thunk, which is an async and await side effect.
 * There's no need for a separate thunk file like in saga.*/
export const fetchVillains = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_VILLAINS_REQUEST
    });
    try {
      const { data } = await getVillains();
      dispatch({ type: FETCH_VILLAINS_SUCCESS, payload: data });
    } catch (e) {
      setError(e);
      dispatch({
        type: FETCH_VILLAINS_FAIL,
        payload: e.message
      });
    }
  };
};

export const fetchVillainById = id => {
  return async dispatch => {
    dispatch({
      type: FETCH_VILLAIN_BY_ID_REQUEST
    });
    try {
      const { data } = await getVillainById(id);
      dispatch({
        type: FETCH_VILLAIN_BY_ID_SUCCESS,
        payload: data
      });
    } catch (e) {
      setError(e);
      dispatch({
        type: FETCH_VILLAIN_BY_ID_FAIL,
        payload: e.message
      });
    }
  };
};

export const addVillain = villain => {
  return async dispatch => {
    dispatch({
      type: ADD_VILLAIN_REQUEST
    });
    try {
      const { data } = await postVillain(villain);
      dispatch({ type: ADD_VILLAIN_SUCCESS, payload: data });
    } catch (e) {
      setError(e);
      dispatch({
        type: ADD_VILLAIN_FAIL,
        payload: e.message
      });
    }
  };
};

export const updateVillain = villain => {
  return async dispatch => {
    dispatch({
      type: UPDATE_VILLAIN_REQUEST
    });
    try {
      await putVillain(villain);
      dispatch({ type: UPDATE_VILLAIN_SUCCESS, payload: villain });
    } catch (e) {
      setError(e);
      dispatch({
        type: UPDATE_VILLAIN_FAIL,
        payload: e.message
      });
    }
  };
};

export const removeVillain = id => {
  return async dispatch => {
    dispatch({
      type: REMOVE_VILLAIN_REQUEST
    });
    try {
      await deleteVillain(id);
      dispatch({ type: REMOVE_VILLAIN_SUCCESS, payload: id });
    } catch (e) {
      setError(e);
      dispatch({
        type: REMOVE_VILLAIN_FAIL,
        payload: e.message
      });
    }
  };
};

export const setVillain = villain => {
  return dispatch =>
    dispatch({
      type: SET_VILLAIN,
      payload: villain
    });
};

const setError = ({ message }) => {
  console.log(message);
  alert(message);
};
