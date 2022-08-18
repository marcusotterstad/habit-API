const request = require("supertest");
const baseURL = "http://localhost:4000";

describe("GET /habit-log", () => {
    it("should return 200", async () => {
      const response = await request(baseURL).get("/habit-log/?getBy=name&input=meditation&condition=equals");
      expect(response.statusCode).toBe(200);
      
    });
    it("should return all meditation habit-log rows", async () => {
      const response = await request(baseURL).get("/habit-log?getBy=name&input=meditation&condition=equals");
      expect(response.body.length !== 0).toBe(true);
    });
  });

/*describe("POST /habit-log", () => {
  it("should return 201", async () => {
    const response = await request(baseURL).get("/habit-log/");
    expect(response.statusCode).toBe(201);
  });

  it("should return all meditation habit-log rows", async () => {
    const response = await request(baseURL).get("/habit-log?getBy=name&input=meditation");
    console.log(response.body)
    expect(response.body.length !== 0).toBe(true);
  });
});
*/
