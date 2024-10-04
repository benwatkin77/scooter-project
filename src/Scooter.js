// Project Context - You are a Software Engineer for the city of Baltimore, and you have been asked to design, test, and code the backend for an Electric Scooter Hire app system.

class Scooter {
  static nextSerial = 1;
  constructor (station) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial ++
    this.charge = 100;
    this.isBroken = false;
  }
  rent(user) {
    if (this.charge > 20 && isBroken == false) {
      //remove it from the station and check it out to a user
      this.station = null;
      this.user = user;
    } else {
      throw new Error("Scooter needs charge and/or repair!")
    }
  }
  dock(station) {
    // return the scooter to the station, and clear the user
    this.station = station;
    this.user = null;
  }
  recharge() {
    console.log('Starting charge');
    
    let chargingTime = 10 * 1000; // 10,000 ms to go from 0% to 100% charge
    let intervalTime = 500; // update the charge to the console every 500 ms
    let chargeIncrement = (100 / (chargingTime/intervalTime)); // how much should the charge increase by every 500 ms
    let currentCharge = this.charge;

    let chargeInterval = setInterval(() => { // setInterval continually calls the function
      if (currentCharge < 100) {
        currentCharge += chargeIncrement;
        if (currentCharge >= 100) {
          currentCharge = 100;
        } console.log(`Current charge: ${currentCharge.toFixed(2)}%`);
      } else {
        clearInterval(chargeInterval);
        console.log('Charge')
      }
    }, intervalTime)

    console.log('Charge complete');   

  }
  requestRepair() {
    function completeRepair() {
      this.isBroken = false;
      console.log('Repair work completed')
      return this.isBroken
    }
    let repairInterval = setTimeout(completeRepair, 5000);
  }
}

module.exports = Scooter
