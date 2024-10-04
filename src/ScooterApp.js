// require the User and Scooter classes - see where they can be used in ScooterApp.js
const Scooter = require('./Scooter.js');
const User = require('./User.js');

class ScooterApp {
  constructor() {
    this.stations = {
      'Roland Park': [],
      'Patterson Park': [],
      'Mount Vernon': []
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (!this.registeredUsers[username] && age >= 18) {  // Check if the user is new and age >= 18
      const user = new User(username, password, age);
      this.registeredUsers[username] = user;
      console.log(`User ${username} registered successfully.`);
      return user;
    } else {
      console.log(`Username ${username} is already taken, or you are too young to register.`);
      return null;
    }
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (user) {  // Check if user exists
      if (user.password === password) {
        user.loggedIn = true;
        console.log(`User ${username} logged in successfully.`);
      } else {
        throw new Error('Username or password is incorrect');
      }
    } else {
      throw new Error('Username or password is incorrect');
    }
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (user) {  // Check if user exists
      user.loggedIn = false;
      console.log(`User ${username} logged out successfully.`);
    } else {
      throw new Error(`No such user ${username} is logged in.`);
    }
  }

  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error('No such station');
    }
    
    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log(`Created new scooter with serial ${scooter.serial}.`);
    return scooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) throw new Error('No such station.');
    if (scooter.station === station) throw new Error('Scooter is already at the station.');

    scooter.dock(station);
    this.stations[station].push(scooter);
    console.log(`Scooter ${scooter.serial} is docked at ${station}.`);
  }

  rentScooter(scooter, user) {
    for (const station in this.stations) {
      const stationScooters = this.stations[station];
      const index = stationScooters.indexOf(scooter);

      if (index !== -1) {
        stationScooters.splice(index, 1); // Remove scooter from station
        scooter.rent(user); // Rent scooter to user
        return;
      }
    }

    throw new Error('Scooter already rented or not found at any station.');
  }
}

module.exports = ScooterApp;
