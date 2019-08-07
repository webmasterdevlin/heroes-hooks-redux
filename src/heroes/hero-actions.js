/*action types*/
export const FETCH_HEROES_REQUEST = "FETCH_HEROES_REQUEST";
export const FETCH_HEROES_SUCCESS = "FETCH_HEROES_SUCCESS";
export const FETCH_HEROES_FAIL = "FETCH_HEROES_FAIL";

export const FETCH_HERO_BY_ID_REQUEST = "FETCH_HERO_BY_ID_REQUEST";
export const FETCH_HERO_BY_ID_SUCCESS = "FETCH_HERO_BY_ID_SUCCESS";
export const FETCH_HERO_BY_ID_FAIL = "FETCH_HERO_BY_ID_FAIL";

export const ADD_HERO_REQUEST = "ADD_HERO_REQUEST";
export const ADD_HERO_SUCCESS = "ADD_HERO_SUCCESS";
export const ADD_HERO_FAIL = "ADD_HERO_FAIL";

export const UPDATE_HERO_REQUEST = "UPDATE_HERO_REQUEST";
export const UPDATE_HERO_SUCCESS = "UPDATE_HERO_SUCCESS";
export const UPDATE_HERO_FAIL = "UPDATE_HERO_FAIL";

export const REMOVE_HERO_REQUEST = "REMOVE_HERO_REQUEST";
export const REMOVE_HERO_SUCCESS = "DELETE_HERO_SUCCESS";
export const REMOVE_HERO_FAIL = "DELETE_HERO_FAIL";

export const SET_HERO = "SET_HERO";

/*action creators that uses saga, which is a function generator side effect*/
/*saga will watch these request*/
export const fetchHeroes = () => ({
  type: FETCH_HEROES_REQUEST
});

export const fetchHeroById = id => ({
  type: FETCH_HERO_BY_ID_REQUEST,
  payload: id
});

export const addHero = hero => ({
  type: ADD_HERO_REQUEST,
  payload: hero
});

export const updateHero = hero => ({
  type: UPDATE_HERO_REQUEST,
  payload: hero
});

export const removeHero = id => ({
  type: REMOVE_HERO_REQUEST,
  payload: id
});

export const setHero = hero => ({
  type: SET_HERO,
  payload: hero
});
