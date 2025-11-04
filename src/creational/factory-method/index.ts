
import { VehicleFactory, VehicleType } from "./VehicleFactory";

const factory = VehicleFactory.getFactory();

const car = factory.createVehicle(VehicleType.Car);
car.drive(); // "Dirigindo um carro!"

const motorcycle = factory.createVehicle(VehicleType.Motorcycle);
motorcycle.drive(); // "Pilotando uma moto!"
