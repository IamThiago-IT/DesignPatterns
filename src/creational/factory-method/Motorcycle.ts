import type { Vehicle } from "./Vehicle";

export class Motorcycle implements Vehicle {
  drive() {
    console.log("Pilotando uma moto!");
  }
}
