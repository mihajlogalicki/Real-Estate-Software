using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Property : BaseEntity
    {
        public string Name { get; set; }
        public int SellRentType { get; set; }
        public int PropertyTypeId { get; set; } // FK
        public PropertyType PropertyType { get; set; } // Navigation Property
        public int FurnishingTypeId { get; set; } // FK
        public FurnishingType FurnishingType { get; set; } // Navigation Property
        public int Price { get; set; }
        public int BuiltArea { get; set; }
        public int CarpetArea { get; set; }
        public string Address { get; set; }
        public int CityId { get; set; } // FK
        public City City { get; set; } // Navigation property
        public int FloorNo { get; set; }
        public int TotalFloors { get; set; }
        public bool ReadyToMove { get; set; }
        public string MainEntrance { get; set; }
        public int Security { get; set; }
        public bool Gated { get; set; }
        public int Maintenance { get; set; }
        public DateTime EstablishedPossesionOn { get; set; }
        public int Age { get; set; }
        public string Description { get; set; }
        public ICollection<Photo> Photos { get; set; } // Collection navigation (one-to-many)
        public DateTime PostedOn { get; set; } = DateTime.Now;

        [ForeignKey("User")]
        public int PostedBy { get; set; } // FK
        public User User { get; set; } // Navigation property
    }
}
