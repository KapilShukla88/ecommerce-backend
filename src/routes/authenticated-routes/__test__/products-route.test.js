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

describe("test authenticated products routes", () => {
  test("create product /POST", async () => {
    const reqBody = {
      name: "test product",
      description: "test product",
      category: "sneaker",
      brand: "puma",
      price: 40000,
      stock: 1,
    };
    const response = await server(expressApp)
      .post(baseUrl + "/products")
      .set({
        Authorization: `Bearer ${authToken?.accessToken}`,
        "Content-Type": "application/json",
      })
      .send(reqBody);

    // console.log('response =>>', response);//66fce745e770321f348c17b9
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toEqual(reqBody.name);
    expect(response.body.description).toEqual(reqBody.description);
  });

  test("delete product /DELETE", async () => {
    const response = await server(expressApp)
      .delete(`${baseUrl}/products/${productId}`)
      .set({
        Authorization: `Bearer ${authToken?.accessToken}`,
      });

    expect(response.statusCode).toBe(200);
  });

  test("update product /PUT", async () => {
    const updatePayload = {
      name: "test product two",
      description: "test product two",
      price: 2000,
      stock: 2,
    };

    const response = await server(expressApp)
      .put(`${baseUrl}/products/${productId}`)
      .set({
        Authorization: `Bearer ${authToken?.accessToken}`,
        "Content-Type": "application/json",
      })
      .send(updatePayload);

    expect(response.statusCode).toBe(200);
  });

  test("add new review /POST", async () => {
    const reqBody = {
      rating: 4,
      title: "New testing review",
      comment: "New testing comment",
    };

    const response = await server(expressApp)
      .post(`${baseUrl}/products/review/${productId}`)
      .set({
        Authorization: `Bearer ${authToken?.accessToken}`,
        "Content-Type": "application/json",
      })
      .send(reqBody);

    expect(response.statusCode).toBe(201);
  });

  test("delete review /DELETE", async () => {
    const reviewId = "66fce745e770321f348c17b9";
    const response = await server(expressApp)
      .delete(`${baseUrl}/products/reviews/${productId}/${reviewId}`)
      .set({
        Authorization: `Bearer ${authToken?.accessToken}`,
        "Content-Type": "application/json",
      });

    expect(response.statusCode).toBe(200);
  });
});
