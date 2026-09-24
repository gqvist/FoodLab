namespace FoodLab.Models;

public class Recipe
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public int CookingTimeMinutes { get; set; }

    public bool IsPublic { get; set; }

    public string Instructions { get; set; } = string.Empty;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public string OwnerId { get; set; } = string.Empty;

    public ApplicationUser Owner { get; set; } = null!;

    public List<RecipeIngredient> Ingredients { get; set; } = [];

    public List<SavedRecipe> SavedRecipes { get; set; } = [];
}