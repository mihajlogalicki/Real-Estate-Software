import { IPropertyBase } from "./IPropertyBase";

export class Property implements IPropertyBase {
    propertyType: string;
    furnishingType: string;
    sellRentType: number;
    builtArea: number;
    id: number;
    name: string;
    price: number;
    CarpetArea?: number;
    Address: string;
    Address2?: string;
    city: string;
    FloorNo?: string;
    TotalFloor?: string;
    readyToMove: number;
    AOP?: string;
    MainEntrance?: string;
    Security?: number;
    Gated?: number;
    Maintenance?: number;
    Possession?: string;
    image?: string;
    Description?: string;
    PostedOn: string;
    PostedBy: number;
}