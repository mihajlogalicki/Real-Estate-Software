import { IPropertyBase } from "./IPropertyBase";
import { Photo } from "./Photo";

export class Property implements IPropertyBase {
    propertyTypeId: number;
    propertyType: string;
    furnishingTypeId: number;
    furnishingType: string;
    sellRentType: number;
    builtArea: number;
    id: number;
    name: string;
    price: number;
    carpetArea?: number;
    address: string;
    city: string;
    cityId: number;
    floorNo?: string;
    totalFloors?: string;
    readyToMove: boolean;
    age?: string;
    mainEntrance?: string;
    security?: number;
    gated?: boolean;
    maintenance?: number;
    establishedPossesionOn?: Date;
    image?: string;
    description?: string;
    photos?: Photo[]
}