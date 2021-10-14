const EMAIL_FORMAT = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_FORMAT = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

/**
 * Verifies that:
 *    1. The request has valid parameters
 *    2. The email is properly formatted
 *    3. The password is strong & properly formatted
 *    	 "Strong" meaning:
 *    	      - At least one uppercase, lowercase, and digit
 *    	      - At least 8 characters
 *
 * @param name the user's registration name
 * @param email the user's registration email
 * @param password the user's registration password
 * @returns {boolean} whether or this is a valid combination of registration parameters
 */
function validRegistrationParameters(name, email, password) {
	const parametersArePresent = !!name && !!email && !!password;
	const emailIsValid = EMAIL_FORMAT.test(email);
	const passwordIsValid = PASSWORD_FORMAT.test(password);
	return parametersArePresent && emailIsValid && passwordIsValid;
}

module.exports = validRegistrationParameters;