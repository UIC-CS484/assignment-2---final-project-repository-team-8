const app = require('../server');
const supertest = require('supertest');
var sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database('db-test.sqlite');

beforeAll(() => {
  process.env.NODE_ENV = 'test';
  seedDb(db);
})

afterAll(done => {
    db.run('DROP TABLE user');
    db.close();
    done();
});

const seedDb = db => {
  db.run('CREATE TABLE IF NOT EXISTS user (email text PRIMARY KEY UNIQUE, password text, name text, CONSTRAINT email_unique UNIQUE (email))');
}

describe("GET / ", () => {
  test("It should return names", async () => {
    const response = await supertest(app).get("/test");
    expect(response.body).toEqual(["Farooq", "Matt"]);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST test for register and login", () => {
  test("Create a new user", async () => {
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

describe("POST /account/login", () => {
  test("Check for login credentials", async () => {
    const newUser = await supertest(app)
      .post("/account/login")
      .send({
        email:'yo@farooq.com', 
        password: 'Farooq123!'
      });

    expect(newUser.text).toEqual("No User Exists");
  });
});
