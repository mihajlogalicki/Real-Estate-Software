namespace WebAPI.DTOs
{
    public class PropertyAddDto
    {
        public int SellRentType { get; set; }
        public string Name { get; set; }
        public int PropertyTypeId { get; set; }
        public int FurnishingTypeId { get; set; }
        public int Price { get; set; }
        public int BuiltArea { get; set; }
        public int CityId { get; set; }
        public bool ReadyToMove { get; set; }

        public int CarpetArea { get; set; }
        public string Address { get; set; }
        public int FloorNo { get; set; }
        public int TotalFloors { get; set; }
        public string MainEntrance { get; set; }
         public int Security { get; set; }
        public bool Gated { get; set; }
        public int Maintenance { get; set; }
        public DateTime EstablishedPossesionOn { get; set; }
        public int Age { get; set; }
        public string Description { get; set; }
    }
}
