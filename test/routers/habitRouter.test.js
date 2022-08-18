const request = require("supertest");
const baseURL = "http://localhost:4000";

describe("GET /habits", () => {
    it("should return 200", async () => {
      const response = await request(baseURL).get("/habits");
      expect(response.statusCode).toBe(200);
      
    });
    it("should return active habits", async () => {
      const response = await request(baseURL).get("/habits");
      expect(response.body.length !== 0).toBe(true);
    });
  });