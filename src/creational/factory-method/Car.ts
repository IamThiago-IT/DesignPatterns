import { type Vehicle } from "./Vehicle";

export class Car implements Vehicle {
  drive() {
    console.log("Dirigindo um carro!");
  }
}
