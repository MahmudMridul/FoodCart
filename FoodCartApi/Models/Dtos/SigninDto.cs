using System.ComponentModel.DataAnnotations;

namespace FoodCartApi.Models.Dtos
{
    public class SigninDto
    {
        [Required]
        public string NameOrEmail { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
