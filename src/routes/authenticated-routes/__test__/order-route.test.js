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

describe("test orders", () => {
  test("add new order /POST", async () => {
    const reqBody = {
      shippingInfo: {
        address: "new address",
        city: "delhi",
        state: "delhi",
        country: "India",
        pinCode: 110034,
        phoneNo: 8974994778,
      },
      orderItems: [
        {
          name: "product 1",
          price: 5000,
          image: "XXX.png",
          product: productId,
          quantity: 5,
        },
      ],
      user: process.env.TEST_USERID,
      paymentInfo: {
        id: "12345",
        status: "Completed",
      },
      paidAt: new Date(),
      itemsPrice: 4000,
      taxPrice: 450,
      shippingPrice: 300,
      totalPrice: 5000,
      orderStatus: "delivered",
    };
    const response = await server(expressApp)
      .post(baseUrl + "/orders/new")
      .set({
        Authorization: `Bearer ${authToken?.accessToken}`,
        "Content-Type": "application/json",
      })
      .send(reqBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("shippingInfo");
    expect(response.body).toHaveProperty("orderItems");
  });

  test("get loggedIn orders /GET", async () => {
    const response = await server(expressApp)
      .get(baseUrl + "/orders/me")
      .set({
        Authorization: `Bearer ${authToken?.accessToken}`,
        "Content-Type": "application/json",
      });

    expect(response.statusCode).toBe(200);
  });
});
