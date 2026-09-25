namespace FoodLab.Models;

public class MealPlanEntry
{
    public string UserId { get; set; } = string.Empty;

    public ApplicationUser User { get; set; } = null!;

    public int DayOfWeek { get; set; }

    public int RecipeId { get; set; }

    public Recipe Recipe { get; set; } = null!;
}