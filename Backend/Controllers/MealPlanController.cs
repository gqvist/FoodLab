using System.Security.Claims;
using FoodLab.DTOs;
using FoodLab.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodLab.Controllers;

[ApiController]
[Route("api/meal-plan")]
[Authorize]
public class MealPlanController : ControllerBase
{
    private readonly MealPlanService _mealPlanService;

    public MealPlanController(MealPlanService mealPlanService)
    {
        _mealPlanService = mealPlanService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(MealPlanResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<MealPlanResponseDto>> Get(CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
        {
            return Unauthorized();
        }

        var mealPlan = await _mealPlanService.GetAsync(userId, cancellationToken);

        return Ok(mealPlan);
    }

    [HttpPost("randomize")]
    [ProducesResponseType(typeof(RandomizeMealPlanResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<RandomizeMealPlanResponseDto>> Randomize(RandomizeMealPlanRequestDto request, CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(
            ClaimTypes.NameIdentifier);

        if (userId is null)
        {
            return Unauthorized();
        }

        var (result, response) =
            await _mealPlanService.RandomizeAsync(
                userId,
                request,
                cancellationToken);

        if (result == RandomizeMealPlanResult.NoSourceSelected)
        {
            return BadRequest(new
            {
                message = "Välj minst en typ av recept."
            });
        }

        if (result == RandomizeMealPlanResult.NotEnoughRecipes)
        {
            var message = request.Count == 1
                ? "Det finns inget annat recept som matchar dina val."
                : "Det finns inte tillräckligt många unika recept för hela veckan.";

            return BadRequest(new
            {
                message
            });
        }

        return Ok(response);
    }

    [HttpGet("shopping-list")]
    [ProducesResponseType(typeof(ShoppingListResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<ShoppingListResponseDto>> GetShoppingList(CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(
            ClaimTypes.NameIdentifier);

        if (userId is null)
        {
            return Unauthorized();
        }

        var shoppingList =
            await _mealPlanService.GetShoppingListAsync(
                userId,
                cancellationToken);

        return Ok(shoppingList);
    }

    [HttpPut]
    [ProducesResponseType(typeof(MealPlanResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MealPlanResponseDto>> Save(SaveMealPlanRequestDto request, CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
        {
            return Unauthorized();
        }

        var (result, response) =
            await _mealPlanService.SaveAsync(
                userId,
                request,
                cancellationToken);

        if (result == SaveMealPlanResult.InvalidDays)
        {
            return BadRequest(new
            {
                message = "Planeringen måste innehålla veckans alla sju dagar."
            });
        }

        if (result == SaveMealPlanResult.EmptyPlan)
        {
            return BadRequest(new
            {
                message = "Minst en dag måste innehålla ett recept."
            });
        }

        if (result == SaveMealPlanResult.DuplicateRecipes)
        {
            return BadRequest(new
            {
                message = "Samma recept kan inte användas flera gånger i planeringen."
            });
        }

        if (result == SaveMealPlanResult.RecipeUnavailable)
        {
            return NotFound(new
            {
                message = "Ett eller flera recept finns inte längre tillgängliga."
            });
        }

        return Ok(response);
    }
}