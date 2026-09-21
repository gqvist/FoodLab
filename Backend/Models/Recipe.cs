namespace FoodLab.Models;

public class Recipe
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Instructions { get; set; } = string.Empty;

    public int CookingTimeMinutes { get; set; }

    public int Servings { get; set; }

    public bool IsPublic { get; set; } = false;

    public DateTimeOffset CreatedAt { get; set; }
        = DateTimeOffset.UtcNow;

    public string OwnerId { get; set; } = string.Empty;

    public List<RecipeIngredient> Ingredients { get; set; } = [];
}