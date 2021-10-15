const app = require('../server');
const supertest = require('supertest');

afterAll(done => {
    done();
});


describe("GET / ", () => {
  test("It should return names", async () => {
    const response = await supertest(app).get("/test");
    expect(response.body).toEqual(["Farooq", "Matt"]);
    expect(response.statusCode).toBe(200);
    done();
  });
});

describe("POST /account/register", () => {
  test("It responds with the newly created user", async () => {
    const newUser = await supertest(app)
      .post("/account/register")
      .send({
        name: 'Farooq', 
        email:'farooq@uic.edu', 
        password: 'ilovecSDDoding212321!23131212312@#'
      });

    expect(newUser.statusCode).toBe(200);

    // const response = await request(app).get("/students");
    // expect(response.body.length).toBe(3);
  });
});


