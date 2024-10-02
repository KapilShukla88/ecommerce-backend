import "dotenv/config";
import "./services/mongo-service.js";
import express from "express";
import cors from "cors";
import openRoutes from "./routes/open-routes/index.js";
import authenticatedRoute from "./routes/authenticated-routes/index.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import healthRoute from "./routes/health-check.js";

const app = express();
const baseUrl = "/v1/main";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(fileUpload());

/**
 * @description to check the health
 * @route /v1/main/health-check
 */
app.use(baseUrl, healthRoute);

/**
 * open routes - "/v1/main/*"
 */
app.use(baseUrl, openRoutes);

/**
 * authenticated routes - for authentication and for those api's which need authentication
 * "/v1/main/*"
 */
app.use(baseUrl, authenticatedRoute);

app.use("*", (_req, res) => {
  res.status(503).json({
    statusCode: 503,
    error: "Forbidden",
    message: "Service not available.",
  });
});

const PORT = process.env.PORT;

// Export app without listening so that Supertest can use it.
export const expressApp = app;

// Only start the server if not in a testing environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}