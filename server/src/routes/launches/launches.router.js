const express = require("express");
const { httpGetALLLaunch, httpAddNewLauch, httpAbortLaunch } = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetALLLaunch);
launchesRouter.post("/", httpAddNewLauch);
launchesRouter.delete("/:id", httpAbortLaunch)

module.exports = launchesRouter;
