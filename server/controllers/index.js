import express from "express";
import "babel-polyfill";

import serverRenderer from "../middleware/renderer";
import configureStore from "../../src/store";
import { fetchFeeds } from "../../src/actions";

const path = require("path");
const router = express.Router();

const INITIAL_COUNT = 6;

// root (/) should always serve our server rendered page
const actionIndex = async (req, res, next) => {
  const store = configureStore();

  await store.dispatch(fetchFeeds(0, INITIAL_COUNT)).then(() => {
    serverRenderer(store)(req, res, next);
  });
};

router.use("^/$", actionIndex);

// other static resources should just be served as they are
router.use(
  express.static(path.resolve(__dirname, "..", "..", "build"), {
    maxAge: "30d"
  })
);

export default router;
