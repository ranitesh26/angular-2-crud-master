import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Car } from './car';

@Injectable()
export class CarService{
    
    constructor(private _httpService: Http){}

    getAllCars(): Observable<Car[]>{
        console.log("inside the service getAllCars():::::::");
        return this._httpService.get("http://localhost:8080/Car-Api/api/car")
                .map((response: Response) => response.json())
                .catch(this.handleError);
    }

    getCarById(carId: string): Observable<Car>{
        console.log("Inside the getCarById() service::::::");
        return this._httpService.get("http://localhost:8080/Car-Api/api/car/"+carId)
                .map((response: Response) => response.json())
                .catch(this.handleError);
    }

    addCar(car: Car){
        let body = JSON.parse(JSON.stringify(car));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        if(car.id){    
            console.log("Inside addCar update service():::::::");
            return this._httpService.put("http://localhost:8080/Car-Api/api/car/"+car.id, body, options);
        }else{
            console.log("Inside addCar add service():::::::");
            return this._httpService.post("http://localhost:8080/Car-Api/api/car", body, options);
        }
    }

    deleteCar(carId: string){
        console.log("Inside the service deleteCar():::::car id:::"+carId);
        return this._httpService.delete("http://localhost:8080/Car-Api/api/car/"+carId);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error);
    }
}