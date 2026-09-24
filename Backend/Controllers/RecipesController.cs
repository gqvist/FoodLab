using System.Security.Claims;
using FoodLab.DTOs;
using FoodLab.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodLab.Controllers;

[ApiController]
[Route("api/recipes")]
[Authorize]
public class RecipesController : ControllerBase
{
    private readonly RecipeService _recipeService;

    public RecipesController(RecipeService recipeService)
    {
        _recipeService = recipeService;
    }

    [AllowAnonymous]
    [HttpGet]
    [ProducesResponseType(
    typeof(List<RecipeResponseDto>),
    StatusCodes.Status200OK)]
    public async Task<ActionResult<List<RecipeResponseDto>>> GetPublic(
    CancellationToken cancellationToken)
    {
        var currentUserId = User.FindFirstValue(
            ClaimTypes.NameIdentifier);

        var recipes = await _recipeService.GetPublicAsync(
            currentUserId,
            cancellationToken);

        return Ok(recipes);
    }

    [HttpGet("mine")]
    [ProducesResponseType(
        typeof(List<RecipeResponseDto>),
        StatusCodes.Status200OK)]
    public async Task<ActionResult<List<RecipeResponseDto>>> GetMine(
        CancellationToken cancellationToken)
    {
        var ownerId = User.FindFirstValue(
            ClaimTypes.NameIdentifier);

        if (ownerId is null)
        {
            return Unauthorized();
        }

        var recipes = await _recipeService.GetMineAsync(
            ownerId,
            cancellationToken);

        return Ok(recipes);
    }

    [AllowAnonymous]
    [HttpGet("{id:int}")]
    [ProducesResponseType(
    typeof(RecipeResponseDto),
    StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RecipeResponseDto>> GetById(
    int id,
    CancellationToken cancellationToken)
    {
        var currentUserId = User.FindFirstValue(
            ClaimTypes.NameIdentifier);

        var recipe = await _recipeService.GetByIdAsync(
            id,
            currentUserId,
            cancellationToken);

        if (recipe is null)
        {
            return NotFound();
        }

        return Ok(recipe);
    }

    [HttpPost]
    [ProducesResponseType(
        typeof(RecipeResponseDto),
        StatusCodes.Status201Created)]
    public async Task<ActionResult<RecipeResponseDto>> Create(
        CreateRecipeRequestDto request,
        CancellationToken cancellationToken)
    {
        var ownerId = User.FindFirstValue(
            ClaimTypes.NameIdentifier);

        if (ownerId is null)
        {
            return Unauthorized();
        }

        var recipe = await _recipeService.CreateAsync(
            request,
            ownerId,
            cancellationToken);

        return Created(
            $"/api/recipes/{recipe.Id}",
            recipe);
    }
}
