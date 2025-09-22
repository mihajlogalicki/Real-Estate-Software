export interface IPropertyBase {
    Id: number;
    Name: string;
    Price: number;
    PropertyType: number;
    FurnishingType: string;
    SellRentType: number;
    Image?: string;
    BuiltArea: number;
    City: string;
    RTM: number;
}