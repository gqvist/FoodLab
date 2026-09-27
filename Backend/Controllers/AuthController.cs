using FoodLab.DTOs;
using FoodLab.Services;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodLab.Controllers;

[ApiController]
[Route("api/auth")]
[Authorize]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly IAntiforgery _antiforgery;

    public AuthController(AuthService authService, IAntiforgery antiforgery)
    {
        _authService = authService;
        _antiforgery = antiforgery;
    }

    [AllowAnonymous]
    [HttpGet("csrf")]
    [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
    // Creates and returns the antiforgery token
    public ActionResult<CsrfTokenResponseDto> GetCsrfToken()
    {
        var tokens = _antiforgery.GetAndStoreTokens(HttpContext);

        return Ok(new CsrfTokenResponseDto
        {
            Token = tokens.RequestToken!
        });
    }

    [AllowAnonymous]
    [HttpPost("login")]
    // Validates credentials and creates the users auth cookie
    public async Task<ActionResult<UserResponseDto>> Login(LoginRequestDto request)
    {
        var user = await _authService.LoginAsync(request);

        if (user is null)
        {
            return Problem(
                statusCode: StatusCodes.Status401Unauthorized,
                title: "Inloggning misslyckades",
                detail: "Felaktiga inloggningsuppgifter.");
        }

        return Ok(user);
    }

    [HttpGet("me")]
    [ResponseCache( NoStore = true, Location = ResponseCacheLocation.None)]
    // Returns the authenticated user or 401 when no valid session exists
    public async Task<ActionResult<UserResponseDto>> GetMe()
    {
        var user = await _authService.GetCurrentUserAsync(User);

        if (user is null)
        {
            return Unauthorized();
        }

        return Ok(user);
    }

    [HttpPost("logout")]
    // Signs out the current user and removes the session
    public async Task<IActionResult> Logout()
    {
        await _authService.LogoutAsync();

        return NoContent();
    }

    [AllowAnonymous]
    [HttpPost("register")]
    [ProducesResponseType(typeof(UserResponseDto), StatusCodes.Status201Created)]
    // Creates a new user and converts Identity errors to API validation responses
    public async Task<ActionResult<UserResponseDto>> Register(RegisterRequestDto request)
    {
        var (result, user) = await _authService.RegisterAsync(request);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(
                    string.Empty,
                    error.Description);
            }

            var duplicateAccount = result.Errors.Any(error =>
                error.Code == "DuplicateEmail" ||
                error.Code == "DuplicateUserName");

            return ValidationProblem(
                statusCode: duplicateAccount
                    ? StatusCodes.Status409Conflict
                    : StatusCodes.Status400BadRequest,

                modelStateDictionary: ModelState);
        }

        return StatusCode(
            StatusCodes.Status201Created,
            user);
    }
}