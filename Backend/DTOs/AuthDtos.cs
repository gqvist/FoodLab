using System.ComponentModel.DataAnnotations;

namespace FoodLab.DTOs;

public class LoginRequestDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}

public class UserResponseDto
{
    public string Id { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string[] Roles { get; set; } = [];
}

public class CsrfTokenResponseDto
{
    public string Token { get; set; } = string.Empty;
}

public class RegisterRequestDto
{
    [Required]
    [EmailAddress]
    [StringLength(256)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(8)]
    public string Password { get; set; } = string.Empty;

    [Required]
    [Compare(nameof(Password),
        ErrorMessage = "Lösenordet och bekräftelsen matcha inte.")]
    public string ConfirmPassword { get; set; } = string.Empty;
}