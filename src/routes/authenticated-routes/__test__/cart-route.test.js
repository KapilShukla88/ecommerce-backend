import "dotenv/config";
import server from "supertest";
import generateToken from "../../../utils/generate-token";
import { expressApp } from "../../../server.js";

const baseUrl = "/v1/main";
const productId = "66fce745e770321f348c17b9";
let authToken;

beforeAll(async () => {
  authToken = await generateToken({
    _id: process.env.TEST_USERID,
    email: process.env.TEST_EMAILID,
    role: process.env.TEST_ROLE,
  });
});

describe("test cart route", () => {
  test("Add to cart /POST", async () => {
    const reqBody = {
      productId,
      quantity: 2,
    };

    const response = await server(expressApp)
      .post(baseUrl + "/cart")
      .set({
        Authorization: `Bearer ${authToken?.accessToken}`,
        "Content-Type": "application/json",
      })
      .send(reqBody);

    expect(response.statusCode).toBe(201);
  });
  test("get cart items /GET", async () => {
    const response = await server(expressApp)
      .get(`${baseUrl}/cart`)
      .set({
        Authorization: `Bearer ${authToken?.accessToken}`,
        "Content-Type": "application/json",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total_count");
  });

  test("get cart count /GET", async () => {
    const response = await server(expressApp)
      .get(baseUrl + "/cart/cart-count")
      .set({
        Authorization: `Bearer ${authToken?.accessToken}`,
        "Content-Type": "application/json",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total_count");
  });

  test("delete cart item /DELETE", async () => {
    const response = await server(expressApp)
      .delete(baseUrl + "/cart/" + productId)
      .set({
        Authorization: `Bearer ${authToken?.accessToken}`,
        "Content-Type": "application/json",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("total_count");
  });
});
