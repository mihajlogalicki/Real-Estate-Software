import { Component, ViewChild, model } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { HousingService } from '../../../services/housing.service';
import { Property } from '../../../model/Property';

@Component({
  selector: 'app-property-detail',
  standalone: false,
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent {

  public propertyId: number;
  public property = new Property();
  public displayBasic: boolean;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private housingService: HousingService){}

  images: any[] = [
    {
    itemImageSrc: 'assets/prop-1.png',
    thumbnailImageSrc: 'assets/prop-1.png',
    alt: 'Description for Image 1',
    title: 'Title 1'
    },
    {
      itemImageSrc: 'assets/prop-2.png',
      thumbnailImageSrc: 'assets/prop-2.png',
      alt: 'Description for Image 2',
      title: 'Title 2'
    },
    {
        itemImageSrc: 'assets/prop-3.png',
        thumbnailImageSrc: 'assets/prop-3.png',
        alt: 'Description for Image 3',
        title: 'Title 3'
    },
];

  ngOnInit() {
    this.propertyId = Number(this.activatedRoute.snapshot.params['id']);

    this.activatedRoute.params
    .subscribe(
      (params) => {
        this.propertyId = Number(params['id']);

        this.activatedRoute.data
        .pipe(take(1))
        .subscribe(
          (property: Property) => {
            this.property = property['property_resolver'];
          });
      }
    )
  }
  
  nextPage(){
    this.propertyId++;
    this.router.navigate(['property-detail', this.propertyId]);
  }
}
