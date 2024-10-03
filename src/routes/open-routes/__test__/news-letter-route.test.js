import "dotenv/config";
import server from "supertest";
import { expressApp } from "../../../server.js";

const baseUrl = "/v1/main";

describe("news letter routes testing", () => {
  test("send mail /POST", async () => {
    const response = await server(expressApp)
      .post(baseUrl + "/newsletter")
      .send({ email: process.env.TEST_EMAILID });

    expect(response.statusCode).toBe(200);
  });
});
