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

describe("get payments client secret", () => {
  test("get payment client secret /POST", async () => {
    const response = await server(expressApp)
      .post(baseUrl + "/payment/process")
      .set({
        Authorization: `Bearer ${authToken?.accessToken}`,
        "Content-Type": "application/json",
      })
      .send({ amount: 500 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("client_secret");
  });
});
