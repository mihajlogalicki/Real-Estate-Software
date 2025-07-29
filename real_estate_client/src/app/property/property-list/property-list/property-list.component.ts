import { Component } from '@angular/core';
import { take } from 'rxjs';
import { HousingService } from '../../../services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { eRealEstateType } from './eRealEstateType';
import { IPropertyBase } from '../../../model/IPropertyBase';

@Component({
  selector: 'app-property-list',
  standalone: false,
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent {

  public realEstateType: eRealEstateType = eRealEstateType.Sell;
  public properties: IPropertyBase[];
  public searchText : string = '';
  public sortByDirection : string = 'asc';

  // sort
  public sortOptions: string[] = ['City', 'Price'];
  public sortBy : string;

  constructor(private housingService: HousingService, private activatedRoute: ActivatedRoute){}

  ngOnInit() : void {
    this.getProperties();
  }

  getProperties(){ 
    if(!!this.activatedRoute.snapshot.url[0]) {
       this.realEstateType = eRealEstateType.Rent;
    }

    this.housingService.getAllProperties(this.realEstateType)
        .pipe(take(1))
        .subscribe({
         next: data => {
            this.properties = data;
            const newProperty = JSON.parse(localStorage.getItem('newProperty'));

            if(!!newProperty && newProperty.RealEstateType == this.realEstateType) {
              this.properties = [newProperty, ...this.properties];
            }
           
        },
         error: () => {
            console.log(`Server error occured`);
        }
    })
  }

  orderBy(){
    if(this.sortByDirection == 'asc'){
         this.sortByDirection = 'desc';
    } else {
         this.sortByDirection = 'asc';
    }
  }
}
