class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }
  displayInfo() {
    return `${this.#brand} ${this.#model}, Speed: ${this.speed}, TrunkOpen: ${
      this.isTrunkOpen
    }`;
  }
  go() {
    !this.isTrunkOpen && (this.speed += 5);
  }

  brake() {
    this.speed -= 5;

    this.speed = this.speed < 0 ? 0 : this.speed;
  }

  openTrunk() {
    this.speed === 0 && (this.isTrunkOpen = true);
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration = 0;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }
  go() {
    this.speed += this.acceleration;
  }

  openTrunk() {}
  closeTrunk() {}
}

const car1 = new Car({ brand: "Toyota", model: "Corolla" });
const car2 = new Car({ brand: "Tesla", model: "Model 3" });

console.log(car1.displayInfo());
console.log(car2.displayInfo());

car1.openTrunk();
car1.go();

console.log(car1.displayInfo());

car1.closeTrunk();
car1.go();

console.log(car1.displayInfo());

const raceCar = new RaceCar({
  brand: "McLaren",
  model: "F1",
  acceleration: 20,
});

console.log(raceCar);
raceCar.go();
console.log(raceCar.displayInfo());

raceCar.openTrunk();
console.log(raceCar.displayInfo());
