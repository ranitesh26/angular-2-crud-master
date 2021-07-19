import {Component, OnInit, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {CarService} from './car.service';
import {Car} from './car';

@Component({
    selector: 'app-car',
    templateUrl: './car.component.html',
    styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit, OnChanges{

    cars: Car[];
    statusMessage: string;
    car = new Car();
    
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

    addCar(): void{
        console.log("inside the addCar()::::::")
        this._carService.addCar(this.car)
            .subscribe((response) => {console.log(response); this.getCars();this.reset();},
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        );   
        
        console.log("end of addCar()::::");
        //this._router.navigate(['/cars']);
    }

    private reset(){
        console.log("inside the reset():::::::");
        this.car.id = null;
        this.car.name = null;
        this.car.model = null;
        console.log("end of reset():::::::");
    }

    ngOnChanges(changes:any) {
        console.log("calling ngOnChanges()::::::::");
    }

    deleteCar(carId: string){
        console.log("Inside the deleteCar()::::Car id::::"+carId);
        this._carService.deleteCar(carId)
            .subscribe((response) => {console.log(response); this.getCars();},
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            });
            this.reset();
            console.log("end of deleteBook():::::::");
    }

    getCar(carId: string){
        console.log("Inside the updateCar()::::::Book id::::"+carId);
        this._carService.getCarById(carId)
            .subscribe((carData) => {this.car = carData; this.getCars(); }),
            (error) => {
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        this.reset();    
        console.log("end of updateBook()::::::");
    }
}