using FoodLab.Data;
using FoodLab.DTOs;
using FoodLab.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodLab.Services;

public enum SaveRecipeResult
{
    Success,
    RecipeNotFound,
    OwnRecipe
}

public class RecipeService
{
    private readonly ApplicationDbContext _dbContext;

    public RecipeService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<RecipeResponseDto> CreateAsync(CreateRecipeRequestDto request,string ownerId, CancellationToken cancellationToken = default)
    {
        var recipe = new Recipe
        {
            Name = request.Name.Trim(),

            Description = string.IsNullOrWhiteSpace(request.Description)
                ? null
                : request.Description.Trim(),

            CookingTimeMinutes = request.CookingTimeMinutes,

            IsPublic = !request.IsPrivate,

            Instructions = request.Instructions.Trim(),

            OwnerId = ownerId,

            CreatedAt = DateTimeOffset.UtcNow,

            Ingredients = request.Ingredients
                .Select(ingredient => new RecipeIngredient
                    {
                        Name = ingredient.Name.Trim(),
                        Amount = ingredient.Amount,
                        Unit = ingredient.Unit.Trim()
                    })
                .ToList()
        };

        _dbContext.Recipes.Add(recipe);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return MapToResponse(recipe, isOwner: true, isSaved: false);
    }

    public async Task<RecipeResponseDto?> UpdateAsync(int recipeId, string ownerId, UpdateRecipeRequestDto request, CancellationToken cancellationToken = default)
    {
        var recipe = await _dbContext.Recipes
            .Include(recipe => recipe.Ingredients)
            .SingleOrDefaultAsync(
                recipe =>
                    recipe.Id == recipeId &&
                    recipe.OwnerId == ownerId,
                cancellationToken);

        if (recipe is null)
        {
            return null;
        }

        recipe.Name = request.Name.Trim();

        recipe.Description = string.IsNullOrWhiteSpace(
            request.Description)
            ? null
            : request.Description.Trim();

        recipe.CookingTimeMinutes =
            request.CookingTimeMinutes;

        recipe.IsPublic = !request.IsPrivate;

        recipe.Instructions =
            request.Instructions.Trim();

        _dbContext.RecipeIngredients.RemoveRange(
            recipe.Ingredients);

        recipe.Ingredients = request.Ingredients
            .Select(ingredient =>
                new RecipeIngredient
                {
                    Name = ingredient.Name.Trim(),
                    Amount = ingredient.Amount,
                    Unit = ingredient.Unit.Trim()
                })
            .ToList();

        await _dbContext.SaveChangesAsync(
            cancellationToken);

        return MapToResponse(
            recipe,
            isOwner: true,
            isSaved: false);
    }

    public async Task<List<RecipeResponseDto>> GetMineAsync(string ownerId, CancellationToken cancellationToken = default)
    {
        var recipes = await _dbContext.Recipes
            .AsNoTracking()
            .Where(recipe => recipe.OwnerId == ownerId)
            .Include(recipe => recipe.Ingredients)
            .OrderByDescending(recipe => recipe.CreatedAt)
            .ToListAsync(cancellationToken);

        return recipes
            .Select(recipe =>
                MapToResponse(
                    recipe,
                    isOwner: true,
                    isSaved: false))
            .ToList();
    }

    public async Task<List<RecipeResponseDto>> GetPublicAsync(string? currentUserId, CancellationToken cancellationToken = default)
    {
        var recipes = await _dbContext.Recipes
            .AsNoTracking()
            .Where(recipe => recipe.IsPublic)
            .Include(recipe => recipe.Ingredients)
            .OrderByDescending(recipe => recipe.CreatedAt)
            .ToListAsync(cancellationToken);

        var savedRecipeIds = new HashSet<int>();

        if (currentUserId is not null)
        {
            savedRecipeIds = (
                await _dbContext.SavedRecipes
                    .AsNoTracking()
                    .Where(savedRecipe => savedRecipe.UserId == currentUserId)
                    .Select(savedRecipe => savedRecipe.RecipeId)
                    .ToListAsync(cancellationToken)
            ).ToHashSet();
        }

        return recipes
            .Select(recipe =>
            {
                var isOwner =
                    currentUserId != null &&
                    recipe.OwnerId == currentUserId;

                return MapToResponse(
                    recipe,
                    isOwner,
                    isSaved: savedRecipeIds.Contains(recipe.Id));
            })
            .ToList();
    }

    public async Task<RecipeResponseDto?> GetByIdAsync(int id, string? currentUserId, CancellationToken cancellationToken = default)
    {
        var recipe = await _dbContext.Recipes
            .AsNoTracking()
            .Include(recipe => recipe.Ingredients)
            .SingleOrDefaultAsync(recipe =>
                recipe.Id == id &&(recipe.IsPublic || (currentUserId != null && recipe.OwnerId == currentUserId)),cancellationToken);

        if (recipe is null)
        {
            return null;
        }

        var isOwner = currentUserId != null && recipe.OwnerId == currentUserId;

        var isSaved = currentUserId is not null && !isOwner &&

            await _dbContext.SavedRecipes
                .AsNoTracking()
                .AnyAsync(
                    savedRecipe =>
                        savedRecipe.UserId == currentUserId &&
                        savedRecipe.RecipeId == recipe.Id,
                    cancellationToken);

        return MapToResponse(
            recipe,
            isOwner,
            isSaved);
    }

    public async Task<List<RecipeResponseDto>> GetSavedAsync(string userId, CancellationToken cancellationToken = default)
    {
        var savedRecipes = await _dbContext.SavedRecipes
            .AsNoTracking()
            .Where(savedRecipe => savedRecipe.UserId == userId && savedRecipe.Recipe.IsPublic)
            .Include(savedRecipe => savedRecipe.Recipe)
            .ThenInclude(recipe => recipe.Ingredients)
            .OrderByDescending(savedRecipe => savedRecipe.SavedAt)
            .ToListAsync(cancellationToken);

        return savedRecipes
            .Select(savedRecipe =>
                MapToResponse(
                    savedRecipe.Recipe,
                    isOwner: false,
                    isSaved: true))
            .ToList();
    }

    public async Task<SaveRecipeResult> SaveAsync(int recipeId, string userId, CancellationToken cancellationToken = default)
    {
        var recipe = await _dbContext.Recipes
            .AsNoTracking()
            .SingleOrDefaultAsync(
                recipe => recipe.Id == recipeId,
                cancellationToken);

        if (recipe is null || !recipe.IsPublic)
        {
            return SaveRecipeResult.RecipeNotFound;
        }

        if (recipe.OwnerId == userId)
        {
            return SaveRecipeResult.OwnRecipe;
        }

        var alreadySaved = await _dbContext.SavedRecipes
            .AnyAsync(savedRecipe => savedRecipe.UserId == userId && savedRecipe.RecipeId == recipeId, cancellationToken);

        if (alreadySaved)
        {
            return SaveRecipeResult.Success;
        }

        var savedRecipe = new SavedRecipe
        {
            UserId = userId,
            RecipeId = recipeId,
            SavedAt = DateTimeOffset.UtcNow
        };

        _dbContext.SavedRecipes.Add(savedRecipe);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return SaveRecipeResult.Success;
    }

    public async Task UnsaveAsync(int recipeId, string userId, CancellationToken cancellationToken = default)
    {
        var savedRecipe = await _dbContext.SavedRecipes
            .SingleOrDefaultAsync(savedRecipe => savedRecipe.UserId == userId && savedRecipe.RecipeId == recipeId, cancellationToken);

        if (savedRecipe is null)
        {
            return;
        }

        _dbContext.SavedRecipes.Remove(savedRecipe);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<bool> DeleteAsync(int recipeId, string ownerId, CancellationToken cancellationToken = default)
    {
        var recipe = await _dbContext.Recipes
            .SingleOrDefaultAsync(
                recipe =>
                    recipe.Id == recipeId &&
                    recipe.OwnerId == ownerId,
                cancellationToken);

        if (recipe is null)
        {
            return false;
        }

        _dbContext.Recipes.Remove(recipe);

        await _dbContext.SaveChangesAsync(
            cancellationToken);

        return true;
    }

    private static RecipeResponseDto MapToResponse(
        Recipe recipe,
        bool isOwner,
        bool isSaved)
    {
        return new RecipeResponseDto
        {
            Id = recipe.Id,
            Name = recipe.Name,
            Description = recipe.Description,
            CookingTimeMinutes = recipe.CookingTimeMinutes,
            IsPublic = recipe.IsPublic,
            Instructions = recipe.Instructions,
            CreatedAt = recipe.CreatedAt,
            IsOwner = isOwner,
            IsSaved = isSaved,

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