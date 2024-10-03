import "dotenv/config";
import server from "supertest";
import { expressApp } from "../../../server.js";

const productId = "66fce745e770321f348c17b9";
const baseUrl = "/v1/main";

describe("test unauthenticated route", () => {
  test("get products /GET", async () => {
    const response = await server(expressApp).get(baseUrl + "/products");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    const products = response.body;

    products?.forEach((product) => {
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("description");
      expect(product).toHaveProperty("category");
      expect(product).toHaveProperty("stock");
    });
  });

  test("get popular products /GET", async () => {
    const response = await server(expressApp).get(
      baseUrl + "/products/popular-products"
    );

    expect(response.statusCode).toBe(200);
    const products = response.body;

    products?.forEach((product) => {
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("description");
      expect(product).toHaveProperty("category");
      expect(product).toHaveProperty("stock");
    });
  });

  test("product details /GET", async () => {
    const response = await server(expressApp).get(
      baseUrl + `/products/${productId}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("stock");
  });

  test("product review /GET", async () => {
    const response = await server(expressApp).get(
      baseUrl + `/products/review/${productId}`
    );

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.reviews)).toBe(true);
    const reviews = response.body.reviews;

    reviews.forEach((review) => {
      expect(review).toHaveProperty("user");
      expect(review).toHaveProperty("rating");
      expect(review).toHaveProperty("name");
      expect(review).toHaveProperty("title");
    });
  });

  test("search product /GET", async () => {
    const response = await server(expressApp).get(
      baseUrl + `/products/search/test`
    );

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    const products = response.body;

    products?.forEach((product) => {
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("product_rating");
      expect(product).toHaveProperty("image");
    });
  });
});
