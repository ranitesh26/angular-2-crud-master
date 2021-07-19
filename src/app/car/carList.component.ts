import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CarService } from './car.service';
import { Car } from './car';
import { Router } from '@angular/router';


@Component({
    selector: 'car-list',
    templateUrl: './carList.component.html',
    styleUrls: ['./carList.component.css']
})
export class CarListComponent implements OnInit{
    car = new Car();
    statusMessage: string;
    cars: Car[];
    constructor(private _carService: CarService,
                private _router: Router){}
    
    ngOnInit(): void {
        console.log("calling ngOnInit()::::");
        this.getCars();
    }

    getCars(): void{
        console.log("Inside getCars():::::")
        this._carService.getAllCars()
            .subscribe((carData) => this.cars = carData,
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        );
        console.log("end of getCars():::::");
    }
}