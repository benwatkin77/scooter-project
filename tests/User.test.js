const User = require('../src/User')

const user = new User('Joe Bloggs', 'test123', 21)

// User tests here
describe('User property tests', () => {
  // test username
  test('username should be a string', () => {
    expect(typeof user.username).toBe('string')
  })
  test('password should be a string', () => {
    expect(typeof user.password).toBe('string')
  })
  test('age should be a number', () => {
    expect(typeof user.age).toBe('number')
  })
})

// test login
test('should log in user with correct password', () => {
  user.login('test123');
  expect(user.loggedIn).toBe(true); // User should be logged in
});

// test logout
test('should log out when method called', () => {
  user.logout();
  expect(user.loggedIn).toBe(false);
})
