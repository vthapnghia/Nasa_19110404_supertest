const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithID,
  abortLaunchByID,
} = require("../../models/launches.model");

function httpGetALLLaunch(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLauch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchID = Number(req.params.id);

  if (!existsLaunchWithID(launchID)) {
    return res.status(400).json({
      error: "Launch not found",
    });
  }
  const aborted = abortLaunchByID(launchID);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetALLLaunch,
  httpAddNewLauch,
  httpAbortLaunch
};
