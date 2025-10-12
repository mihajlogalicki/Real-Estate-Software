export interface IPropertyBase {
    id: number;
    name: string;
    price: number;
    propertyType: string;
    furnishingType: string;
    sellRentType: number;
    primaryPhoto?: string;
    builtArea: number;
    city: string;
    readyToMove: boolean;
    establishedPossesionOn?: Date;
}