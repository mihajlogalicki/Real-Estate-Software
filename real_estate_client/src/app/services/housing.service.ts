import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { eSellRentType } from '../property/property-list/property-list/eRealEstateType';
import { Property } from '../model/Property';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  private baseUrl : string = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  // HTTP requests
 getAllCities() : Observable<string[]> {
  return this.httpClient.get<string[]>(this.baseUrl +'/city/cities');
 }
 getProperties(sellRentType?: number) : Observable<Property[]> {
  return this.httpClient.get<Property[]>(this.baseUrl + "/property/list/" + sellRentType)
 }
 getProperty(id: number) : Observable<Property> {
    return this.getProperties(1).pipe(
      map(properties => {
        const property = properties.find(prop => prop.id == id);
        if(!!property) {
           return property;
        } else {
           throw new Error('Property Not Found!');
        }
      })
    )
  }


  // ** Preparing HTTP request section  **

  // Simulate calling GET Endpoint using JSON object
  getAllPropertiesJson(sellRentType?: eSellRentType) : Observable<Property[]> { 
    return this.httpClient.get('data/properties.json').pipe(
      map(data => {
        const properties: Property[] = [];

        for(const item in data){
          if(!!sellRentType){
            if(data.hasOwnProperty(item) && data[item].sellRentType === sellRentType){
              properties.push(data[item]);
            }
          } else {
            properties.push(data[item]);
          }
        }

        const localProperties = JSON.parse(localStorage.getItem('newProperty'));
        for(const property in localProperties){
          if(!!sellRentType){
            if(localProperties.hasOwnProperty(property) && localProperties[property].sellRentType === sellRentType){
              properties.push(localProperties[property]);
            }
          } else {
            properties.push(localProperties[property]);
          }
        }

        return properties;
      })
    );
  }

  // Add property to Local Storage simulate HTTP POST request
  addProperty(property : Property){
    let props = [property];
    if(localStorage.getItem('newProperty')){
      const newProperty = JSON.parse(localStorage.getItem('newProperty'));
      props = [property, ...newProperty];
    }

    localStorage.setItem('newProperty', JSON.stringify(props));     
  }


  // Add property ID to Local Storage
  addPropertyId(){
    if(localStorage.getItem('Id')){
        const localStorageId = Number(localStorage.getItem('Id')) + 1; 
        localStorage.setItem('Id', String(localStorageId));
        return localStorageId
    } else {
      localStorage.setItem('Id', '101');
      return 101;
    }
  }
}
