using Microsoft.EntityFrameworkCore;

namespace FoodCartApi.Models
{
    [Index(nameof(Name), nameof(Price))]
    public class FoodItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public int Price { get; set; }
    }
}
