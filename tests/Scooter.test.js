const Scooter = require('../src/Scooter')
const User = require('../src/User')

// typeof scooter === object
describe('scooter object', () => {
  test('Scooter class should create Scooter instance', () => {
    const scooter = new Scooter()
    expect(scooter).toBeInstanceOf(Scooter)
  })
})

// Method tests
describe('scooter methods', () => {
  let scooter;
  let user;

  beforeEach(() => {
    scooter = new Scooter('Roland Park');
    user = new User('testuser', 'password123', 25);
  });

  test('should create a new scooter with correct properties', () => {
    expect(scooter.station).toBe('Roland Park');
    expect(scooter.charge).toBe(100);
    expect(scooter.isBroken).toBe(false);
    expect(scooter.user).toBe(null); // Scooter should not be rented initially
  });

  // rent method
  test('should rent scooter if charge is sufficient and not broken', () => {
    scooter.rentScooter(user);
    expect(scooter.user).toBe(user);
    expect(scooter.station).toBe(null); // Scooter should no longer be docked
  });

  // dock method
  test('should dock scooter and clear user', () => {
    scooter.rent(user);
    scooter.dock('Downtown');
    expect(scooter.station).toBe('Downtown');
    expect(scooter.user).toBe(null); // User should be cleared after docking
  });

  // requestRepair method
  test('should request repair and fix the scooter', async () => {
    scooter.isBroken = true; // Set scooter as broken
    await scooter.requestRepair();
    expect(scooter.isBroken).toBe(false); // Scooter should be repaired
  });


  // charge method
  test('should recharge scooter', async () => {
    scooter.charge = 50; // Set charge to something less than 100
    await scooter.recharge();
    expect(scooter.charge).toBe(100); // After recharge, charge should be 100
  });

})
