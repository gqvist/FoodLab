using FoodLab.Data;
using FoodLab.DTOs;
using FoodLab.Models;
using FoodLab.Utilities;
using Microsoft.EntityFrameworkCore;

namespace FoodLab.Services;

public enum RandomizeMealPlanResult
{
    Success,
    NoSourceSelected,
    NotEnoughRecipes
}

public enum SaveMealPlanResult
{
    Success,
    InvalidDays,
    EmptyPlan,
    DuplicateRecipes,
    RecipeUnavailable
}

public class MealPlanService
{
    private readonly ApplicationDbContext _dbContext;

    public MealPlanService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<MealPlanResponseDto> GetAsync(
        string userId,
        CancellationToken cancellationToken = default)
    {
        var entries = await _dbContext.MealPlanEntries
            .AsNoTracking()
            .Where(entry => entry.UserId == userId)
            .Include(entry => entry.Recipe)
            .ThenInclude(recipe => recipe.Ratings)
            .ToDictionaryAsync(
                entry => entry.DayOfWeek,
                cancellationToken);

        var days = Enumerable
            .Range(1, 7)
            .Select(dayOfWeek =>
            {
                entries.TryGetValue(
                    dayOfWeek,
                    out var entry);

                return new MealPlanDayResponseDto
                {
                    DayOfWeek = dayOfWeek,

                    Recipe = entry is null
                        ? null
                        : MapRecipe(entry.Recipe)
                };
            })
            .ToList();

        return new MealPlanResponseDto
        {
            Days = days
        };
    }

    public async Task<(RandomizeMealPlanResult Result,
    RandomizeMealPlanResponseDto? Response)> RandomizeAsync(
        string userId,
        RandomizeMealPlanRequestDto request,
        CancellationToken cancellationToken = default)
    {
        var hasSelectedSource =
            request.IncludeOwn ||
            request.IncludeSaved ||
            request.IncludePublic;

        if (!hasSelectedSource)
        {
            return (
                RandomizeMealPlanResult.NoSourceSelected, null);
        }

        var excludedRecipeIds = request.ExcludedRecipeIds
            .Distinct()
            .ToList();

        var query = _dbContext.Recipes
            .AsNoTracking()
            .Where(recipe =>
                (
                    request.IncludeOwn &&
                    recipe.OwnerId == userId
                ) ||
                (
                    request.IncludeSaved &&
                    recipe.IsPublic &&
                    recipe.SavedRecipes.Any(
                        savedRecipe =>
                            savedRecipe.UserId == userId)
                ) ||
                (
                    request.IncludePublic &&
                    recipe.IsPublic
                ));

        if (excludedRecipeIds.Count > 0)
        {
            query = query.Where(
                recipe => !excludedRecipeIds.Contains(recipe.Id));
        }

        var candidates = await query
            .Include(recipe => recipe.Ratings)
            .ToListAsync(cancellationToken);

        if (candidates.Count < request.Count)
        {
            return (
                RandomizeMealPlanResult.NotEnoughRecipes,
                null);
        }

        var selectedRecipes = candidates
            .OrderBy(_ => Random.Shared.Next())
            .Take(request.Count)
            .Select(MapRecipe)
            .ToList();

        var response = new RandomizeMealPlanResponseDto
        {
            Recipes = selectedRecipes
        };

        return (
            RandomizeMealPlanResult.Success,
            response);
    }

    public async Task<(SaveMealPlanResult Result,
    MealPlanResponseDto? Response)> SaveAsync(
        string userId,
        SaveMealPlanRequestDto request,
        CancellationToken cancellationToken = default)
    {
        var dayNumbers = request.Days
            .Select(day => day.DayOfWeek)
            .ToList();

        var hasInvalidDays =
            dayNumbers.Count != 7 ||
            dayNumbers.Distinct().Count() != 7 ||
            dayNumbers.Any(day => day is < 1 or > 7);

        if (hasInvalidDays)
        {
            return (
                SaveMealPlanResult.InvalidDays,
                null);
        }

        var plannedDays = request.Days
            .Where(day => day.RecipeId.HasValue)
            .ToList();

        if (plannedDays.Count == 0)
        {
            return (
                SaveMealPlanResult.EmptyPlan,
                null);
        }

        var recipeIds = plannedDays
            .Select(day => day.RecipeId!.Value)
            .ToList();

        if (recipeIds.Distinct().Count() != recipeIds.Count)
        {
            return (
                SaveMealPlanResult.DuplicateRecipes,
                null);
        }

        var accessibleRecipeIds = await _dbContext.Recipes
            .AsNoTracking()
            .Where(recipe =>
                recipeIds.Contains(recipe.Id) &&
                (
                    recipe.IsPublic ||
                    recipe.OwnerId == userId
                ))
            .Select(recipe => recipe.Id)
            .ToListAsync(cancellationToken);

        if (accessibleRecipeIds.Count != recipeIds.Count)
        {
            return (
                SaveMealPlanResult.RecipeUnavailable,
                null);
        }

        var existingEntries = await _dbContext.MealPlanEntries
            .Where(entry => entry.UserId == userId)
            .ToListAsync(cancellationToken);

        var newEntries = plannedDays
            .Select(day => new MealPlanEntry
            {
                UserId = userId,
                DayOfWeek = day.DayOfWeek,
                RecipeId = day.RecipeId!.Value
            })
            .ToList();

        await using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);

        _dbContext.MealPlanEntries.RemoveRange(existingEntries);

        await _dbContext.SaveChangesAsync(cancellationToken);

        _dbContext.MealPlanEntries.AddRange(newEntries);

        await _dbContext.SaveChangesAsync(cancellationToken);

        await transaction.CommitAsync(cancellationToken);

        var savedPlan = await GetAsync(userId, cancellationToken);

        return (
            SaveMealPlanResult.Success,
            savedPlan);
    }

    public async Task<ShoppingListResponseDto> GetShoppingListAsync(string userId, CancellationToken cancellationToken = default)
    {
        var ingredients = await _dbContext.MealPlanEntries
            .AsNoTracking()
            .Where(entry => entry.UserId == userId)
            .SelectMany(entry => entry.Recipe.Ingredients)
            .Select(ingredient => new
            {
                ingredient.Name,
                ingredient.Amount,
                ingredient.Unit
            })
            .ToListAsync(cancellationToken);

        var convertedIngredients = ingredients
            .Select(ingredient =>
            {
                var converted =
                    MeasurementUnits.ConvertToBaseUnit(
                        ingredient.Amount,
                        ingredient.Unit);

                var displayName = ingredient.Name.Trim();

                return new
                {
                    DisplayName = displayName,
                    NormalizedName = displayName.ToLowerInvariant(),
                    converted.Amount,
                    converted.Unit
                };
            })
            .ToList();

        var items = convertedIngredients
            .GroupBy(ingredient => new
            {
                ingredient.NormalizedName,
                ingredient.Unit
            })
            .Select(group => new ShoppingListItemResponseDto
            {
                Name = group.First().DisplayName,
                Amount = group.Sum(ingredient => ingredient.Amount),
                Unit = group.Key.Unit
            })
            .OrderBy(
                item => item.Name,
                StringComparer.CurrentCultureIgnoreCase)
            .ToList();

        return new ShoppingListResponseDto
        {
            Items = items
        };
    }

    private static MealPlanRecipeResponseDto MapRecipe(Recipe recipe)
    {
        double? averageRating = recipe.Ratings.Count == 0
            ? null
            : Math.Round(
                recipe.Ratings.Average(rating => rating.Value),
                1);

        return new MealPlanRecipeResponseDto
        {
            Id = recipe.Id,
            Name = recipe.Name,
            CookingTimeMinutes = recipe.CookingTimeMinutes,
            AverageRating = averageRating
        };
    }
}