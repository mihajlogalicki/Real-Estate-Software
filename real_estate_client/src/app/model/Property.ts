import { IPropertyBase } from "./IPropertyBase";

export class Property implements IPropertyBase {
    propertyType: string;
    furnishingType: string;
    sellRentType: number;
    builtArea: number;
    id: number;
    name: string;
    price: number;
    carpetArea?: number;
    address: string;
    city: string;
    floorNo?: string;
    totalFloors?: string;
    readyToMove: number;
    age?: string;
    mainEntrance?: string;
    security?: number;
    gated?: boolean;
    maintenance?: number;
    establishedPossesionOn?: string;
    image?: string;
    description?: string;
}