import type { Vehicle } from "./Vehicle";
import { Car } from "./Car";
import { Motorcycle } from "./Motorcycle";

export enum VehicleType {
  Car = "car",
  Motorcycle = "motorcycle",
}

export abstract class VehicleFactory {
  abstract createVehicle(type: VehicleType): Vehicle;

  static getFactory(): VehicleFactory {
    return new ConcreteVehicleFactory();
  }
}

class ConcreteVehicleFactory extends VehicleFactory {
  createVehicle(type: VehicleType): Vehicle {
    switch (type) {
      case VehicleType.Car:
        return new Car();
      case VehicleType.Motorcycle:
        return new Motorcycle();
      default:
        throw new Error("Tipo de veículo desconhecido.");
    }
  }
}
