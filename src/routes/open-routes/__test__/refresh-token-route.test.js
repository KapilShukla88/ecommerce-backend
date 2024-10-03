import "dotenv/config";
import server from "supertest";
import generateToken from "../../../utils/generate-token";
import { expressApp } from "../../../server.js";

const baseUrl = "/v1/main";
let authToken;

beforeAll(async () => {
  authToken = await generateToken({
    _id: process.env.TEST_USERID,
    email: process.env.TEST_EMAILID,
    role: process.env.TEST_ROLE,
  });
});

describe("test refresh token route", () => {
  test("new refresh token /POST", async () => {
    const response = await server(expressApp)
      .post(baseUrl + "/refreshToken")
      .send({
        refresh_token: authToken.refreshToken,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  test("delete refresh token /DELETE", async () => {
    const response = await server(expressApp)
      .delete(baseUrl + "/refreshToken")
      .send({
        refresh_token: authToken.refreshToken,
      });

    expect(response.statusCode).toBe(200);
  });
});
