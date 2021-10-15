const validRegistrationParameters = require("../routes/registration");

test.each([
    ["", "", "", false, "fields contains no characters"],
    ["", "Hello", "World", false, "name is missing"],
    ["Hello", "World", "!!!", false, "password and email aren't valid"],
    ["This is my name", "This is my email", "This is my password", false, "password and email aren't valid"],
    ["Gamer", "foo@bar.z", "abc123XYZ", false, "email domain is invalid"],
    ["Gamer", "foo@ba", "abc123XYZ", false, "email domain is invalid"],
    ["Gamer", "foo@bar.com", "abc", false, "password is weak"],
    ["Gamer", "foo@bar.com", "abcABCabcABC", false, "password is weak; it doesn't contain numbers"],
    ["Doctor Doom", "doc@doom.co", "stanL33T", true, "this is a valid combination"],
    ["Ricky Bobby", "ricky@bobby.org", "shak3Nbak3", true, "this is a valid combination"]
])("(%s, %s, %s) valid? %s because %s", (name, email, password, valid, description) => {
    const [ok, err] = validRegistrationParameters(name, email, password)
    expect(ok).toBe(valid);
});