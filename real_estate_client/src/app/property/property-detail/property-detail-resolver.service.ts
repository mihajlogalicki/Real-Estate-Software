import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Property } from '../../model/Property';
import { Observable, catchError, of } from 'rxjs';
import { HousingService } from '../../services/housing.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

  constructor(private housingService: HousingService, private router: Router) { }

  resolve(routeSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Property> {
    const propertyId = routeSnapshot.params['id'];
    return this.housingService.getProperty(propertyId).pipe(
      catchError(err => {
        this.router.navigate(['/property-not-found']);
        return of(null);
      })
    );
  }
}
