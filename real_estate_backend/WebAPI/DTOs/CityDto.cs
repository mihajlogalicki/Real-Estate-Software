using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class CityDto
    {
        public int Id { get; set; }


        [Required(ErrorMessage = "Name is mandatory field")]
        [StringLength(15, MinimumLength = 2)]
        [RegularExpression(".*[a-zA-Z]+.*", ErrorMessage ="Only numerics are not allowed for Name")]
        public string Name { get; set; }


        [Required(ErrorMessage = "Country is mandatory field")]
        [StringLength(15, MinimumLength = 2)]
        [RegularExpression(".*[a-zA-Z]+.*", ErrorMessage = "Only numerics are not allowed for Country")]
        public string Country { get; set; }
    }
}
