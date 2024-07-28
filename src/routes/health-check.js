import express from "express";

const healthRoute = express();

/**
 * @description to check the health of the server
 * @route `/v1/main/healthchecker`
 * @return `{uptime, responseTime, message, timestamp}`
 */
healthRoute.get("/healthchecker", (_req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    responseTime: process.hrtime(), //response time — how long it takes to server to respond to requests
    message: "Ok",
    timestamp: Date.now(),
  };
  try {
    res.status(200).json(healthCheck);
  } catch (error) {
    healthCheck.message = error;
    res.status(503).json(healthCheck);
  }
});

export default healthRoute;
