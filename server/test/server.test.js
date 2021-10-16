const app = require("../server").app;
const msg = require("../server").msg;
const routes = require("../server").routes;
const supertest = require("supertest");
const StatusCodes = require("http-status-codes").StatusCodes;
const sqlite3 = require("sqlite3").verbose();
const dbname = require("../database.js").dbname;
const dbFile = dbname + ".sqlite";
const db = new sqlite3.Database(dbFile);

const [name, email, password] = ["Farooq", "test@farooq.com", "Farooq123!"];

beforeAll(() => {
	process.env.NODE_ENV = "test";
	seedDb(db);
});

afterAll(done => {
	db.run("DROP TABLE user");
	db.close();
	// force remove `dbFile` after tests!
	done();
});

const seedDb = db => {
	db.run("CREATE TABLE IF NOT EXISTS user (email text PRIMARY KEY UNIQUE, password text, name text, CONSTRAINT email_unique UNIQUE (email))");
};

describe("POST test for register and login", () => {
	test("Create a new user", async () => {
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