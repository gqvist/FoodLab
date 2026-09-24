using FoodLab.Data;
using FoodLab.DTOs;
using FoodLab.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodLab.Services;

public class RecipeService
{
    private readonly ApplicationDbContext _dbContext;

    public RecipeService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<RecipeResponseDto> CreateAsync(
        CreateRecipeRequestDto request,
        string ownerId,
        CancellationToken cancellationToken = default)
    {
        var recipe = new Recipe
        {
            Name = request.Name.Trim(),

            Description = string.IsNullOrWhiteSpace(
                request.Description)
                ? null
                : request.Description.Trim(),

            CookingTimeMinutes =
                request.CookingTimeMinutes,

            IsPublic = !request.IsPrivate,

            Instructions = request.Instructions.Trim(),

            OwnerId = ownerId,

            CreatedAt = DateTimeOffset.UtcNow,

            Ingredients = request.Ingredients
                .Select(ingredient =>
                    new RecipeIngredient
                    {
                        Name = ingredient.Name.Trim(),
                        Amount = ingredient.Amount,
                        Unit = ingredient.Unit.Trim()
                    })
                .ToList()
        };

        _dbContext.Recipes.Add(recipe);

        await _dbContext.SaveChangesAsync(
            cancellationToken);

        return MapToResponse(
            recipe,
            isOwner: true);
    }

    public async Task<List<RecipeResponseDto>> GetMineAsync(
        string ownerId,
        CancellationToken cancellationToken = default)
    {
        var recipes = await _dbContext.Recipes
            .AsNoTracking()
            .Where(recipe =>
                recipe.OwnerId == ownerId)
            .Include(recipe =>
                recipe.Ingredients)
            .OrderByDescending(recipe =>
                recipe.CreatedAt)
            .ToListAsync(cancellationToken);

        return recipes
            .Select(recipe =>
                MapToResponse(
                    recipe,
                    isOwner: true))
            .ToList();
    }

    public async Task<List<RecipeResponseDto>> GetPublicAsync(
        string? currentUserId,
        CancellationToken cancellationToken = default)
    {
        var recipes = await _dbContext.Recipes
            .AsNoTracking()
            .Where(recipe => recipe.IsPublic)
            .Include(recipe => recipe.Ingredients)
            .OrderByDescending(recipe => recipe.CreatedAt)
            .ToListAsync(cancellationToken);

        return recipes
            .Select(recipe =>
            {
                var isOwner =
                    currentUserId != null &&
                    recipe.OwnerId == currentUserId;

                return MapToResponse(
                    recipe,
                    isOwner);
            })
            .ToList();
    }

    public async Task<RecipeResponseDto?> GetByIdAsync(
        int id,
        string? currentUserId,
        CancellationToken cancellationToken = default)
    {
        var recipe = await _dbContext.Recipes
            .AsNoTracking()
            .Include(recipe =>
                recipe.Ingredients)
            .SingleOrDefaultAsync(
                recipe =>
                    recipe.Id == id &&
                    (
                        recipe.IsPublic ||
                        (
                            currentUserId != null &&
                            recipe.OwnerId ==
                                currentUserId
                        )
                    ),
                cancellationToken);

        if (recipe is null)
        {
            return null;
        }

        var isOwner =
            currentUserId != null &&
            recipe.OwnerId == currentUserId;

        return MapToResponse(
            recipe,
            isOwner);
    }

    private static RecipeResponseDto MapToResponse(
        Recipe recipe,
        bool isOwner)
    {
        return new RecipeResponseDto
        {
            Id = recipe.Id,
            Name = recipe.Name,
            Description = recipe.Description,

            CookingTimeMinutes =
                recipe.CookingTimeMinutes,

            IsPublic = recipe.IsPublic,
            Instructions = recipe.Instructions,
            CreatedAt = recipe.CreatedAt,
            IsOwner = isOwner,

            Ingredients = recipe.Ingredients
                .Select(ingredient =>
                    new RecipeIngredientResponseDto
                    {
                        Id = ingredient.Id,
                        Name = ingredient.Name,
                        Amount = ingredient.Amount,
                        Unit = ingredient.Unit
                    })
                .ToList()
        };
    }
}