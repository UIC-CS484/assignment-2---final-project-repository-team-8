const app = require("../server").app;
const msg = require("../server").msg;
const routes = require("../server").routes;
const supertest = require("supertest");
const StatusCodes = require("http-status-codes").StatusCodes;
const db = require("../database.js").db;

const [name, email, password] = ["Farooq", "test@farooq.com", "Farooq123!"];

afterAll(done => {
	db.run("DROP TABLE user");
	db.close();
	done();
});

describe("POST test for register and login", () => {
	test("Create a new user and login", async () => {
		const register = await supertest(app)
			.post(routes.REGISTER)
			.send({
				email: email,
				password: password,
				name: name
			});

		expect(register.statusCode).toEqual(StatusCodes.OK);
		expect(register.body.message).toEqual(msg.REGISTRATION_SUCCEEDED);

		const login = await supertest(app)
			.post(routes.LOGIN)
			.send({
				email: email,
				password: password
			});

		console.log(login);
		expect(login.body.message).toEqual(msg.LOGIN_SUCCEEDED);
		expect(login.statusCode).toEqual(StatusCodes.OK);
	});
});

describe("POST /account/login", () => {
	test("Check for invalid login credentials", async () => {
		const login = await supertest(app)
			.post(routes.LOGIN)
			.send({
				email: "yo@farooq.com",
				password: "Farooq123!"
			});

		expect(login.statusCode).toEqual(StatusCodes.NOT_FOUND);
		expect(login.body.error).toEqual(msg.USER_NOT_FOUND);
	});
});