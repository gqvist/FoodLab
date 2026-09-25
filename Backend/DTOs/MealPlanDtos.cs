using System.ComponentModel.DataAnnotations;

namespace FoodLab.DTOs;

public class MealPlanRecipeResponseDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public int CookingTimeMinutes { get; set; }

    public double? AverageRating { get; set; }
}

public class MealPlanDayResponseDto
{
    public int DayOfWeek { get; set; }

    public MealPlanRecipeResponseDto? Recipe { get; set; }
}

public class MealPlanResponseDto
{
    public List<MealPlanDayResponseDto> Days { get; set; } = [];
}

public class RandomizeMealPlanRequestDto
{
    public bool IncludeOwn { get; set; }

    public bool IncludeSaved { get; set; }

    public bool IncludePublic { get; set; }

    [Range(1, 7)]
    public int Count { get; set; }

    public List<int> ExcludedRecipeIds { get; set; } = [];
}

public class RandomizeMealPlanResponseDto
{
    public List<MealPlanRecipeResponseDto> Recipes { get; set; } = [];
}

public class SaveMealPlanRequestDto
{
    [Required]
    [MinLength(7)]
    [MaxLength(7)]
    public List<SaveMealPlanDayRequestDto> Days { get; set; } = [];
}

public class SaveMealPlanDayRequestDto
{
    [Range(1, 7)]
    public int DayOfWeek { get; set; }

    [Range(1, int.MaxValue)]
    public int? RecipeId { get; set; }
}

public class ShoppingListItemResponseDto
{
    public string Name { get; set; } = string.Empty;

    public decimal Amount { get; set; }

    public string Unit { get; set; } = string.Empty;
}

public class ShoppingListResponseDto
{
    public List<ShoppingListItemResponseDto> Items { get; set; } = [];
}