const {param} = require("express/lib/router");
const EMAIL_FORMAT = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_FORMAT = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{5,}$/;

/**
 * Verifies that:
 *    1. The request has valid parameters
 *    2. The email is properly formatted
 *    3. The password is strong & properly formatted
 *         "Strong" meaning:
 *              - At least one uppercase, lowercase, and digit
 *              - At least 5 characters
 *
 * @param name the user's registration name
 * @param email the user's registration email
 * @param password the user's registration password
 * @returns {(boolean|string)[]} whether or this is a valid combination of registration parameters
 */
function validRegistrationParameters(name, email, password) {
    const parametersArePresent = !!name && !!email && !!password;
    const emailIsValid = EMAIL_FORMAT.test(email);
    const passwordIsValid = PASSWORD_FORMAT.test(password);

    if (!parametersArePresent) {
        return [false, "Please provide a name, email, and password"]
    } else if (!emailIsValid) {
        return [false, "Please provide a valid email"]
    } else if (!passwordIsValid) {
        return [false, "Please provide a valid password"]
    }

    return [true, null]
}

module.exports = validRegistrationParameters;