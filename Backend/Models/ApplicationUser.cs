using Microsoft.AspNetCore.Identity;

namespace FoodLab.Models;

public class ApplicationUser : IdentityUser
{
    public List<Recipe> Recipes { get; set; } = [];
    public List<SavedRecipe> SavedRecipes { get; set; } = [];
}