import "dotenv/config";
import "./services/mongo-service.js";
import express from "express";
import cors from "cors";
import openRoutes from "./routes/open-routes/index.js";
import authenticatedRoute from "./routes/authenticated-routes/index.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

const app = express();
const baseUrl = "/v1/main";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// TODO: Add health check

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
  res.status(403).json({
    statusCode: 403,
    error: "Forbidden",
    message: "Service not available.",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
