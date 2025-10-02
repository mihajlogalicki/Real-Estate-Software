import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPropertyBase } from '../../../model/IPropertyBase';
import { MessageService } from 'primeng/api';
import { Property } from '../../../model/Property';
import { HousingService } from '../../../services/housing.service';
import { take } from 'rxjs';
import { IKeyValuePair } from '../../../model/IKeyValuePair';

@Component({
  selector: 'app-add-property',
  standalone: false,
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})

export class AddPropertyComponent {

  // @ViewChild('Form') groupedFormControl : NgForm; -> Old, used for Template Driven Form
  public currentTab : number = 0;
  public propertyTypes : Array<IKeyValuePair>;
  public furnishingTypes : Array<IKeyValuePair>;
  public mainEntrances : Array<string> = ['East', 'West', 'South', 'North'];
  public addPropertyForm : FormGroup;
  public isNextButtonClicked : boolean;
  public property = new Property();
  public cityOptions : any[];

  public propertyView : IPropertyBase = 
  {
      id: null,
      name: '',
      price: null,
      propertyType: null,
      furnishingType: null,
      sellRentType: null,
      builtArea: null,
      city: null,
      readyToMove: null
  };

  constructor(private router: Router, 
    private formBuilder: FormBuilder, 
    private messageService: MessageService,
    private housingService: HousingService){}

  ngOnInit(){
    this.initAddPropertyForm();
    this.getCities();
    this.getPropertyTypes();
    this.getFurnishingTypes();
  }

  initAddPropertyForm(){
    this.addPropertyForm = this.formBuilder.group({
      BasicInfo: this.formBuilder.group({
        SellRentType: [1, Validators.required],
        PropertyType: [null, Validators.required],
        furnishingType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required],
      }),

      PricingInfo: this.formBuilder.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        Security:  [null],
        Maintenance: [null],
        CarpetArea: [null]
      }),

      Address: this.formBuilder.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address:  [null, Validators.required],
        Address2:  [null],
        Landmark: [null]
      }),

      OtherDetails: this.formBuilder.group({
        RTM: [null, Validators.required],
        AOP: [null],
        Possession: [null],
        Gated: [null],
        MainEntrance:  [null],
        Description: [null, Validators.required],
      }),

      Photos: this.formBuilder.group({}),
    })
  }

  getCities(){
    this.housingService
        .getAllCities()
        .pipe(take(1))
        .subscribe(data => {
          this.cityOptions = data;
    })
  }
  getPropertyTypes(){
    this.housingService
        .getPropertyTypes()
        .pipe(take(1))
        .subscribe(data => {
          this.propertyTypes = data;
        })
  }
  getFurnishingTypes(){
    this.housingService
        .getFurnishingTypes()
        .pipe(take(1))
        .subscribe(data => {
          this.furnishingTypes = data;
        })
  }

  Save(){
    if(this.addPropertyForm.valid) {
        this.prepareData();
        this.housingService.addPropertyToLocalStorage(this.property);
        this.messageService.add({ severity: 'success', summary: 'Property saved successfully!', life: 4000});
    } else {
        this.messageService.add({ severity: 'error', summary: 'Please review the form and provide all valid entries', life: 4000});
    }

    if(this.property.sellRentType == 2) {
       this.router.navigate(['/rent-property']);
    } else {
      this.router.navigate(['/'])
    }
  }

  private prepareData() {
    this.property.id = this.housingService.addPropertyId();
    this.property.sellRentType = this.SellRentType.value;
    this.property.propertyType = this.PropertyType.value;
    this.property.name = this.Name.value;
    this.property.city = this.City.value;
    this.property.furnishingType = this.FurnishingType.value;

    this.property.price = this.Price.value;
    this.property.builtArea = this.BuiltArea.value;
    this.property.security = this.Security.value;
    this.property.mainEntrance = this.Maintenance.value;
    this.property.carpetArea = this.CarpetArea.value;

    this.property.address = this.Address.value;
    this.property.floorNo = this.FloorNo.value;
    this.property.totalFloors = this.TotalFloor.value;

    this.property.readyToMove = this.RTM.value;
    this.property.age = this.AOP.value;
    this.property.establishedPossesionOn = this.Possession.value;
    this.property.gated = this.Gated.value;
    this.property.mainEntrance = this.MainEntrance.value;
    this.property.description = this.Description.value;
  }



  //getters for Basic Info tab Form Group and related Form Controls
  get BasicInfoFormGroup(){
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }
  get SellRentType(){
    return this.BasicInfoFormGroup.controls['SellRentType'] as FormControl;
  }
  get PropertyType(){
    return this.BasicInfoFormGroup.controls['PropertyType'] as FormControl;
  }
  get Name(){
    return this.BasicInfoFormGroup.controls['Name'] as FormControl;
  }
  get City(){
    return this.BasicInfoFormGroup.controls['City'] as FormControl;
  }
  get FurnishingType(){
    return this.BasicInfoFormGroup.controls['furnishingType'] as FormControl;
  }

  //getters for Pricing Info tab Form Group and related Form Controls
  get PricingInfoFormGroup(){
    return this.addPropertyForm.controls['PricingInfo'] as FormGroup;
  }
  get Price(){
    return this.PricingInfoFormGroup.controls['Price'] as FormControl;
  }
  get BuiltArea(){
    return this.PricingInfoFormGroup.controls['BuiltArea'] as FormControl;
  }
  get Security(){
    return this.PricingInfoFormGroup.controls['Security'] as FormControl;
  }
  get Maintenance(){
    return this.PricingInfoFormGroup.controls['Maintenance'] as FormControl;
  }
  get CarpetArea(){
    return this.PricingInfoFormGroup.controls['CarpetArea'] as FormControl;
  }

  //getters for Address tab Form Group and related Form Controls
  get AddressFormGroup(){
    return this.addPropertyForm.controls['Address'] as FormGroup;
  }
  get Address(){
    return this.AddressFormGroup.controls['Address'] as FormControl;
  }
  get FloorNo(){
    return this.AddressFormGroup.controls['FloorNo'] as FormControl;
  }
  get TotalFloor(){
    return this.AddressFormGroup.controls['TotalFloor'] as FormControl;
  }
  get Address2(){
    return this.AddressFormGroup.controls['Address2'] as FormControl;
  }
  get Landmark(){
    return this.AddressFormGroup.controls['Landmark'] as FormControl;
  }

  //getters for Other Details tab Form Group and related Form Controls
  get OtherDetailsFormGroup(){
    return this.addPropertyForm.controls['OtherDetails'] as FormGroup;
  }
  get RTM(){
    return this.OtherDetailsFormGroup.controls['RTM'] as FormControl;
  }
  get AOP(){
    return this.OtherDetailsFormGroup.controls['AOP'] as FormControl;
  }
  get Possession(){
    return this.OtherDetailsFormGroup.controls['Possession'] as FormControl;
  }
  get Gated(){
    return this.OtherDetailsFormGroup.controls['Gated'] as FormControl;
  }
  get MainEntrance(){
    return this.OtherDetailsFormGroup.controls['MainEntrance'] as FormControl;
  }
  get Description(){
    return this.OtherDetailsFormGroup.controls['Description'] as FormControl;
  }
}
