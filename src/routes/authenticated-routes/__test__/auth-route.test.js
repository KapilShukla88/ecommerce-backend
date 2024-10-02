import server from "supertest";
// import authRoute from "../auth-route";
import {expressApp} from "../../../server.js";

const baseUrl = "/v1/main";

let timeline;

beforeAll(() => {
  timeline = new Date().getTime();
});



// afterAll((done) => {
//   expressServer.close(done);
// });

describe("test user authentication on the app", () => {
  describe("Registration /POST", () => {
    test("user should register and give status code 200", async () => {
      const payload = {
        firstName: "Kapil",
        lastName: "Shukla",
        email: `kapil${timeline}@gmail.com`,
        password: "12345678",
        role: "admin"
      };
      const response = await server(expressApp)
        .post(baseUrl + "/auth/signup")
        .send(payload);
      expect(response.statusCode).toBe(201);
    });

    test("duplicate user should get status code 409", async () => {
      const payload = {
        firstName: "Kapil",
        lastName: "Shukla",
        email: `kapil${timeline}@gmail.com`,
        password: "12345678",
      };
      const response = await server(expressApp)
        .post(baseUrl + "/auth/signup")
        .send(payload);
      expect(response.statusCode).toBe(409);
    });
  });

  describe("Login /POST", () => {
    test("user should login and give status code 201 and match the email", async () => {
      const emailId = `kapil${timeline}@gmail.com`;
      const payload = {
        email: emailId,
        password: "12345678",
      };

      const response = await server(expressApp)
        .post(baseUrl + "/auth/login")
        .send(payload);

      expect(response.statusCode).toBe(201);
      expect(response.body.data.email).toEqual(emailId);
      expect(response.body.message).toEqual("Logged in successfully.");
    });

    test("Invalid password", async () => {
      const emailId = `kapil${timeline}@gmail.com`;
      const reqBody = {
        email: emailId,
        password: "123456789",
      };

      const response = await server(expressApp)
        .post(baseUrl + "/auth/login")
        .send(reqBody);

      expect(response.statusCode).toBe(401);
    });

    test("user not found", async () => {
      const emailId = `kapil1${timeline}@gmail.com`;
      const reqBody = {
        email: emailId,
        password: "12345678",
      };

      const response = await server(expressApp)
        .post(baseUrl + "/auth/login")
        .send(reqBody);

      expect(response.statusCode).toBe(404);
    });
  });
});
