using System.ComponentModel.DataAnnotations;

namespace FoodLab.DTOs;

public class CreateRecipeRequestDto
{
    [Required]
    [StringLength(150, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }

    [Range(1, 1440)]
    public int CookingTimeMinutes { get; set; }

    public bool IsPrivate { get; set; }

    [Required]
    [StringLength(10000, MinimumLength = 1)]
    public string Instructions { get; set; } = string.Empty;

    [Required]
    [MinLength(1)]
    public List<CreateRecipeIngredientRequestDto> Ingredients { get; set; } = [];
}

public class CreateRecipeIngredientRequestDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Range(typeof(decimal), "0.01", "99999999.99", ParseLimitsInInvariantCulture = true)]
    public decimal Amount { get; set; }

    [Required]
    [StringLength(20)]
    public string Unit { get; set; } = string.Empty;
}

public class RecipeResponseDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public int CookingTimeMinutes { get; set; }

    public bool IsPublic { get; set; }

    public string Instructions { get; set; } = string.Empty;

    public DateTimeOffset CreatedAt { get; set; }

    public bool IsOwner { get; set; }

    public List<RecipeIngredientResponseDto> Ingredients { get; set; } = [];

    public bool IsSaved { get; set; }
}

public class RecipeIngredientResponseDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public decimal Amount { get; set; }

    public string Unit { get; set; } = string.Empty;
}