const app = require('../server');
const supertest = require('supertest');

beforeAll(() => {
  process.env.NODE_ENV = 'test';
})

afterAll(done => {
    done();
});


describe("GET / ", () => {
  test("It should return names", async () => {
    const response = await supertest(app).get("/test");
    expect(response.body).toEqual(["Farooq", "Matt"]);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /account/register", () => {
  test("It responds with the newly created user", async () => {
    const newUser = await supertest(app)
      .post("/account/register")
      .send({
        email:'test@farooq.com', 
        password: 'Farooq123!',
        name: 'Farooq'
      });

    expect(newUser.statusCode).toEqual(200);
  });
});


