//const User = require('../src/User')
//const ScooterApp = require('../src/ScooterApp')

//const scooterApp = new ScooterApp()
// ScooterApp tests here

// register user
//describe('registerUser method tests', () => {
//  test('Should return instance of User', () => {
//    const response = scooterApp.registerUser('Joe Bloggs', 'test123', 21)
//    expect(response).toBeInstanceOf(User)
  //})
//})

// log in
//test('should log in user with correct password', () => {
//  app.registerUser('johnDoe', 'password123', 25);
//  app.loginUser('johnDoe', 'password123');
//  expect(app.registeredUsers['johnDoe'].loggedIn).toBe(true);
//});

// log out

// rent scooter

// dock scooter

const ScooterApp = require('../src/ScooterApp');
const Scooter = require('../src/Scooter');
const User = require('../src/User');

describe('ScooterApp class tests', () => {
  let app;

  beforeEach(() => {
    app = new ScooterApp();
  });

  test('should register a new user', () => {
    const user = app.registerUser('johnDoe', 'password123', 25);
    expect(app.registeredUsers['johnDoe']).toBe(user);
    expect(user.username).toBe('johnDoe');
    expect(user.age).toBe(25);
  });

  test('should log in user with correct password', () => {
    app.registerUser('johnDoe', 'password123', 25);
    app.loginUser('johnDoe', 'password123');
    expect(app.registeredUsers['johnDoe'].loggedIn).toBe(true);
  });

  test('should throw error on login with incorrect password', () => {
    app.registerUser('johnDoe', 'password123', 25);
    expect(() => app.loginUser('johnDoe', 'wrongpassword')).toThrow(
      'Username or password is incorrect'
    );
  });

  test('should log out user', () => {
    const user = app.registerUser('johnDoe', 'password123', 25);
    app.loginUser('johnDoe', 'password123');
    app.logoutUser('johnDoe');
    expect(user.loggedIn).toBe(false);
  });

  test('should create a new scooter at a station', () => {
    const scooter = app.createScooter('Roland Park');
    expect(app.stations['Roland Park']).toContain(scooter);
    expect(scooter.station).toBe('Roland Park');
  });

  test('should throw error when creating scooter at non-existent station', () => {
    expect(() => app.createScooter('NonExistentStation')).toThrow('No such station');
  });

  test('should dock scooter at a station', () => {
    const scooter = new Scooter('Roland Park');
    app.dockScooter(scooter, 'Roland Park');
    expect(app.stations['Roland Park']).toContain(scooter);
    expect(scooter.station).toBe('Roland Park');
  });

  test('should rent a scooter to a user', () => {
    const scooter = new Scooter('Roland Park');
    const user = app.registerUser('johnDoe', 'password123', 25);
    app.stations['Roland Park'].push(scooter); // Add scooter to the station
    app.rentScooter(scooter, user);
    expect(scooter.user).toBe(user);
    expect(app.stations['Roland Park']).not.toContain(scooter); // Scooter should be removed from station
  });
});
