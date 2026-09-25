namespace FoodLab.Models;

public class RecipeRating
{
    public string UserId { get; set; } = string.Empty;

    public ApplicationUser User { get; set; } = null!;

    public int RecipeId { get; set; }

    public Recipe Recipe { get; set; } = null!;

    public int Value { get; set; }
}