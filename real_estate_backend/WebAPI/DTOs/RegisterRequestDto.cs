using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class RegisterRequestDto
    {
        [Required]
        [StringLength(15, MinimumLength = 5)]
        public string Username { get; set; }

        [Required]
        [RegularExpression(@"^(?=(.*\d))(?=(.*[a-zA-Z]))(?=(.*[\W_]))[a-zA-Z\d\W_]{7,20}$", ErrorMessage="Password is not valid.")]
        public string Password { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$", ErrorMessage = "Email is not valid.")]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^\+([1-9]\d{1,4})[\s\(\)-]?\d{1,4}[\s\(\)-]?\d{1,4}[\s\(\)-]?\d{1,4}$", ErrorMessage = "Mobile phone is not valid.")]
        public string Mobile { get; set; }
    }
}
