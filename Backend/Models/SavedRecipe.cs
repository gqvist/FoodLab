namespace FoodLab.Models;

public class SavedRecipe
{
    public string UserId { get; set; } = string.Empty;

    public ApplicationUser User { get; set; } = null!;

    public int RecipeId { get; set; }

    public Recipe Recipe { get; set; } = null!;

    public DateTimeOffset SavedAt { get; set; }
        = DateTimeOffset.UtcNow;
}