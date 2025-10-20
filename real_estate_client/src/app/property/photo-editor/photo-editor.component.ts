import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Property } from '../../model/Property';
import { Photo } from '../../model/Photo';
import { HousingService } from '../../services/housing.service';
import { take } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-photo-editor',
  standalone: false,
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})

export class PhotoEditorComponent {
  @Input() property: Property;
  @Output() photoChangedEvent = new EventEmitter<string>();

  constructor(private housingService: HousingService, private messageService: MessageService){}

  setPrimaryPhoto(targetPhoto: Photo) {
    this.housingService
        .setPrimaryPhoto(targetPhoto.propertyId, targetPhoto.publicId)
        .pipe(take(1))
        .subscribe(data => {

        this.primaryPhotoChanged(targetPhoto.imageUrl);
          
        this.property.photos.forEach(photo => {
            if(photo.isPrimary){
               photo.isPrimary = false;
            }
            if(photo.publicId === targetPhoto.publicId) {
               photo.isPrimary = true;
            }
        })
    });
  }

  onFileUploadClicked(event: any) {
    const formData = new FormData();
    for(let file of event.files){
      formData.append('files', file);
    }

    this.housingService
        .addPhotos(formData, this.property.id)
        .pipe(take(1))
        .subscribe(uploadedFilesResponse => {
          this.property.photos.push(...uploadedFilesResponse);
          this.messageService.add({ severity: 'success', summary: 'Photos added successfully.', life: 4000});
        })
  }

  primaryPhotoChanged(url: string){
    this.photoChangedEvent.emit(url);
  }

  deletePhoto(targetPhoto: Photo) {
    this.housingService
        .deletePhoto(targetPhoto.propertyId, targetPhoto.publicId)
        .pipe(take(1))
        .subscribe(response => {
          this.property.photos = this.property.photos.filter(p => p.publicId != targetPhoto.publicId);
        })
  }
}
