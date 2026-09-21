using FoodLab.DTOs;
using FoodLab.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using FoodLab.Data;

namespace FoodLab.Services;

public class AuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ApplicationDbContext _dbContext;

    public AuthService(
    UserManager<ApplicationUser> userManager,
    SignInManager<ApplicationUser> signInManager,
    ApplicationDbContext dbContext)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _dbContext = dbContext;
    }

    public async Task<UserResponseDto?> LoginAsync(
        LoginRequestDto request)
    {
        var user = await _userManager.FindByEmailAsync(
            request.Email.Trim());

        if (user is null)
        {
            return null;
        }

        var result = await _signInManager.PasswordSignInAsync(
            user,
            request.Password,
            isPersistent: false,
            lockoutOnFailure: true);

        if (!result.Succeeded)
        {
            return null;
        }

        var roles = await _userManager.GetRolesAsync(user);

        return new UserResponseDto
        {
            Id = user.Id,
            Email = user.Email ?? string.Empty,
            Roles = roles.ToArray()
        };
    }

    public async Task<UserResponseDto?> GetCurrentUserAsync(
    ClaimsPrincipal principal)
    {
        var user = await _userManager.GetUserAsync(principal);

        if (user is null)
        {
            return null;
        }

        var roles = await _userManager.GetRolesAsync(user);

        return new UserResponseDto
        {
            Id = user.Id,
            Email = user.Email ?? string.Empty,
            Roles = roles.ToArray()
        };
    }

    public async Task<(IdentityResult Result, UserResponseDto? User)>
        RegisterAsync(RegisterRequestDto request)
    {
        await using var transaction =
            await _dbContext.Database.BeginTransactionAsync();

        var email = request.Email.Trim();

        var user = new ApplicationUser
        {
            UserName = email,
            Email = email
        };

        var createResult = await _userManager.CreateAsync(
            user,
            request.Password);

        if (!createResult.Succeeded)
        {
            return (createResult, null);
        }

        var roleResult = await _userManager.AddToRoleAsync(
            user,
            "User");

        if (!roleResult.Succeeded)
        {
            return (roleResult, null);
        }

        await transaction.CommitAsync();

        var response = new UserResponseDto
        {
            Id = user.Id,
            Email = email,
            Roles = ["User"]
        };

        return (IdentityResult.Success, response);
    }

    public async Task LogoutAsync()
    {
        await _signInManager.SignOutAsync();
    }
}