import fetch from "cross-fetch";

import { getHostIpAddress } from "./helpers";

export const REQUEST_FEEDS = "REQUEST_FEEDS";
export const ADDING_FEED = "ADDING_FEED";
export const ADD_FEEDS_SUCESS = "ADD_FEEDS_SUCESS";
export const ADD_FEEDS_ERROR = "ADD_FEEDS_ERROR";
export const HIDE_CLOSE = "HIDE_CLOSE";
export const DELETE_FEED_SUCCESS = "DELETE_FEED_SUCCESSS"

const hostFromServer = getHostIpAddress();
const host =
  typeof window !== "undefined" && window.HOST_ADDRESS
    ? window.HOST_ADDRESS.includes("__HOST_ADDRESS__")
      ? "localhost"
      : window.HOST_ADDRESS
    : hostFromServer;
const isDevelopment = process.env.NODE_ENV === `development`
// const API_URL = isDevelopment ?  `http://${host}:4000` : 'https://feed-reader-api.herokuapp.com' // TODO: use env files
const API_URL = 'https://feed-reader-api.herokuapp.com' // TODO: use env files

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
  if (!payload) {
    return sendError();
  }

  return {
    type: RECEIVE_FEEDS,
    payload
  };
}

export function hideClose() {
  return {
    type: HIDE_CLOSE
  };
}

export function addFeed(payload) {
  if (!payload || (payload.errors && Object.keys(payload.errors).length)) {
    return sendError(payload);
  }
  return {
    type: ADD_FEEDS_SUCESS,
    payload
  };
}

export function deleteFeed(payload) {
  if (!payload || (payload.errors && Object.keys(payload.errors).length)) {
    return sendError(payload);
  }
  return {
    type: DELETE_FEED_SUCCESS,
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
      .then(response => response.json())
      .then(json => dispatch(addFeed(json)))
      .catch(err => dispatch(sendError(err)));
  };
}

export function removeFeed(id) {
  return function(dispatch) {
    return fetch(`${API_URL}/feed?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(json => dispatch(deleteFeed(json)))
      .catch(err => dispatch(sendError(err)));
  };
}
