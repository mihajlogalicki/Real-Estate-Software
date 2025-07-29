import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPropertyBase } from '../../../model/IPropertyBase';
import { MessageService } from 'primeng/api';
import { Property } from '../../../model/Property';
import { HousingService } from '../../../services/housing.service';

@Component({
  selector: 'app-add-property',
  standalone: false,
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
/* TODO: 
    1) Display validation errors for each control (improve using <p-message>)
    2) Remove ngModel for previewing property, use fully reactive form approach
*/
export class AddPropertyComponent {

  // @ViewChild('Form') groupedFormControl : NgForm; -> Old, used for Template Driven Form
  public currentTab : number = 0;
  public propertyTypes : Array<string> = ['House', 'Villa', 'Apartment', 'Building'];
  public furnishingTypes : Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  public mainEntrances : Array<string> = ['East', 'West', 'South', 'North'];
  public addPropertyForm : FormGroup;
  public isNextButtonClicked : boolean;
  public property = new Property();

  public propertyView : IPropertyBase = 
  {
      Id: null,
      Name: '',
      Price: null,
      PropertyType: null,
      FurnishingType: null,
      RealEstateType: null,
      TotalArea: null,
      City: null,
      RTM: null
  };

  constructor(private router: Router, 
    private formBuilder: FormBuilder, 
    private messageService: MessageService,
    private housingService: HousingService){}

  ngOnInit(){
    this.initAddPropertyForm();
  }

  initAddPropertyForm(){
    this.addPropertyForm = this.formBuilder.group({
      BasicInfo: this.formBuilder.group({
        RealEstateType: [1, Validators.required],
        PropertyType: [null, Validators.required],
        furnishingType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required],
      }),

      PricingInfo: this.formBuilder.group({
        Price: [null, Validators.required],
        TotalArea: [null, Validators.required],
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

  Save(){
    if(this.addPropertyForm.valid) {
        this.prepareData();
        this.housingService.addProperty(this.property);
        this.messageService.add({ severity: 'success', summary: 'Property saved successfully!', life: 4000});
    } else {
        this.messageService.add({ severity: 'error', summary: 'Please review the form and provide all valid entries', life: 4000});
    }

    if(this.property.RealEstateType == 2) {
       this.router.navigate(['/rent-property']);
    } else {
      this.router.navigate(['/'])
    }
  }

  private prepareData() {
    this.property.Id = this.housingService.addPropertyId();
    this.property.RealEstateType = this.RealEstateType.value;
    this.property.PropertyType = this.PropertyType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FurnishingType = this.FurnishingType.value;

    this.property.Price = this.Price.value;
    this.property.TotalArea = this.TotalArea.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.CarpetArea = this.CarpetArea.value;

    this.property.Address = this.Address.value;
    this.property.Address2 = this.Landmark.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;

    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Possession = this.Possession.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }



  //getters for Basic Info tab Form Group and related Form Controls
  get BasicInfoFormGroup(){
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }
  get RealEstateType(){
    return this.BasicInfoFormGroup.controls['RealEstateType'] as FormControl;
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
  get TotalArea(){
    return this.PricingInfoFormGroup.controls['TotalArea'] as FormControl;
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
