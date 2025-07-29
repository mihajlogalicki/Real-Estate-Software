import { Component, Input } from "@angular/core";
import { IPropertyBase } from "../../model/IPropertyBase";

@Component({
    selector: 'app-property-card',
    standalone: false,
    templateUrl: 'property-card.component.html',
    styleUrls: ['property-card.component.css']
})

export class PropertyCardComponent {
    @Input() property: IPropertyBase;
    @Input() showIcons: boolean = true;
}