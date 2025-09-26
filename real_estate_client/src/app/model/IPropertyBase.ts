export interface IPropertyBase {
    id: number;
    name: string;
    price: number;
    propertyType: string;
    furnishingType: string;
    sellRentType: number;
    image?: string;
    builtArea: number;
    city: string;
    readyToMove: number;
    establishedPossesionOn?: Date;
}