import { Component, Output, ViewChild, model } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '../../../services/housing.service';
import { Property } from '../../../model/Property';
import { Photo } from '../../../model/Photo';

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

  galleryImages: Photo[] = []; 
  primaryImage: string = null;

  ngOnInit() {
    this.propertyId = Number(this.activatedRoute.snapshot.params['id']);
    this.activatedRoute.data.subscribe(
      (data: Property) => {
        this.property = data['property_resolver'];
      }
    );
    this.property.age = this.housingService.getPropertyAge(this.property.establishedPossesionOn);
    this.galleryImages = this.GetPhotosByProperty();

    /*
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
    */
  }

  GetPhotosByProperty() : Photo[]{
    const photosUrls: Photo[] = [];
    for(let photo of this.property.photos){
      photosUrls.push(photo);
    }

    this.primaryImage = photosUrls.find(x => x.isPrimary).imageUrl; 
    return photosUrls;
  }

  primaryPhotoChanged(photo: string){
    this.primaryImage = photo;
  }

  nextPage(){
    this.propertyId++;
    this.router.navigate(['property-detail', this.propertyId]);
  }
}
