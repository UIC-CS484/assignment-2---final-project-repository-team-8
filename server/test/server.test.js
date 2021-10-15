const app = require('../server');
const request = require('supertest');

afterAll(done => {
    done();
});


describe("POST /account/register", () => {

    describe("when passed a username and password", () => {
      test("should respond with a 200 code", async (done) => {
        const response = await request(app).post("/account/register").send({ 
          name: "name",
          email: "username", 
          password: "password" 
        })
        expect(response.statusCode).toBe(200)
        done();
      })
    })
  
  })

describe("Test the root path", () => {
    test("It should response the GET method", done => {
        request(app)
        .get("/test")
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

// test('get accounts', () => {
//     db.serialize(async () => {
//         seedDb(db);
//         const res = await request(app).get('/account');
//         const response = [
//             { email:'farooq@uic.edu' }
//         ]
//         expect(res.status).toBe(200);
//         expect(res.body).toEqual(response);
//         done();
//     })
// });

// test('register user', () => {
//     db.serialize(async () => {
//         seedDb(db);
//         await request(app)
//             .post('/account/register')
//             .send({ name: 'Farooq', email:'farooq@uic.edu', password: 'ilovecoding'});        
//             done();
//         const res = await request(app).get('/account');
//         const response = [
//             { email:'farooq@uic.edu'}
//         ]
//         expect(res.status).toBe(200);
//         expect(res.body).toEqual(response);
//         done();
//     })
// });

