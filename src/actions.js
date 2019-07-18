import fetch from "cross-fetch";

export const REQUEST_FEEDS = "REQUEST_FEEDS";
export const ADDING_FEED = "ADDING_FEED"
export const ADD_FEEDS_SUCESS = "ADD_FEEDS_SUCESS";
export const ADD_FEEDS_ERROR = "ADD_FEEDS_ERROR";
export const HIDE_CLOSE = "HIDE_CLOSE"

const API_URL = "http://localhost:5000" // TODO: use env files

function requestFeeds() {
  return {
    type: REQUEST_FEEDS
  };
}

function addingFeed() {
  return {
    type: ADDING_FEED
  };
}

export const RECEIVE_FEEDS = "RECEIVE_FEEDS";

export function receiveFeeds(payload, skip) {
  if(!payload) {
    return sendError();
  }

  return {
    type: RECEIVE_FEEDS,
    payload,
  };
}

export function hideClose() {
  return {
    type: HIDE_CLOSE
  };
}

export function addFeed(payload) {
  if (!payload || payload.errors && Object.keys(payload.errors).length) {
    return sendError(payload);
  }
  return {
    type: ADD_FEEDS_SUCESS,
    payload
  };
}

function sendError(payload) {
  return {
    type: ADD_FEEDS_ERROR,
    payload
  };
}

export function fetchFeeds(skip, limit) {
  return function(dispatch) {
    dispatch(requestFeeds());

    return fetch(`${API_URL}/feeds?skip=${skip}&limit=${limit}`)
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      )
      .then(json => dispatch(receiveFeeds(json, skip)));
  };
}

export function createFeed(url) {
  return function(dispatch) {
    dispatch(addingFeed());

    return fetch(`${API_URL}/feed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    })
      .then(
        response => response.json()
      )
      .then(json => dispatch(addFeed(json)))
      .catch(err => dispatch(sendError(err)))
  };
}
