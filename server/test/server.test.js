const app = require("../server").app;
const msg = require("../server").msg;
const routes = require("../server").routes;
const supertest = require("supertest");
const StatusCodes = require("http-status-codes").StatusCodes;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db-test.sqlite");

beforeAll(() => {
	process.env.NODE_ENV = "test";
	seedDb(db);
});

afterAll(done => {
	db.run("DROP TABLE user");
	db.close();
	done();
});

const seedDb = db => {
	db.run("CREATE TABLE IF NOT EXISTS user (email text PRIMARY KEY UNIQUE, password text, name text, CONSTRAINT email_unique UNIQUE (email))");
};

const [name, email, password] = ["Farooq", "test@farooq.com", "Farooq123!"];

describe("POST test for register and login", () => {
	test("Create a new user", async () => {
		const newUser = await supertest(app)
			.post(routes.REGISTER)
			.send({
				email: email,
				password: password,
				name: name
			});

		expect(newUser.statusCode).toEqual(StatusCodes.OK);
		expect(newUser.body.message).toEqual(msg.REGISTRATION_SUCCEEDED);
	});
});

describe("POST /account/login", () => {
	test("Check for invalid login credentials", async () => {
		const newUser = await supertest(app)
			.post(routes.LOGIN)
			.send({
				email: "yo@farooq.com",
				password: "Farooq123!"
			});

		expect(newUser.statusCode).toEqual(StatusCodes.NOT_FOUND);
		expect(newUser.body.error).toEqual(msg.USER_NOT_FOUND);
	});
});