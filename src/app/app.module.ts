import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { CarService } from './car/car.service';
import { CarComponent } from './car/car.component';
import { CarListComponent } from './car/carList.component';
import { PageNotFoundComponent } from './others/pageNotFound.component';
import { HomeComponent } from './car/home.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: CarListComponent },
  { path: 'addCar', component: CarComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent, CarComponent, CarListComponent, HomeComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule,  RouterModule.forRoot(appRoutes)
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
