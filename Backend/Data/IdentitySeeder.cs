using FoodLab.Models;
using Microsoft.AspNetCore.Identity;

namespace FoodLab.Data;

public static class IdentitySeeder
{
    public static async Task SeedAsync(
        IServiceProvider services,
        IConfiguration configuration)
    {
        var userManager =
            services.GetRequiredService<UserManager<ApplicationUser>>();

        var roleManager =
            services.GetRequiredService<RoleManager<IdentityRole>>();

        // Create Roles
        foreach (var roleName in new[] { "User", "Admin" })
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                var result = await roleManager.CreateAsync(
                    new IdentityRole(roleName));

                CheckResult(result);
            }
        }

        // Create dev accounts
        await EnsureUserAsync(
            userManager,
            "user1@foodlab.test",
            configuration["SeedUsers:User1Password"],
            "User");

        await EnsureUserAsync(
            userManager,
            "user2@foodlab.test",
            configuration["SeedUsers:User2Password"],
            "User");

        await EnsureUserAsync(
            userManager,
            "admin@foodlab.test",
            configuration["SeedUsers:AdminPassword"],
            "User",
            "Admin");
    }

    private static async Task EnsureUserAsync(
        UserManager<ApplicationUser> userManager,
        string email,
        string? password,
        params string[] roles)
    {
        var user = await userManager.FindByEmailAsync(email);

        if (user is null)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new InvalidOperationException(
                    $"Missing seed password for {email}. Check User Secrets.");
            }

            user = new ApplicationUser
            {
                UserName = email,
                Email = email
            };

            var result = await userManager.CreateAsync(user, password);

            CheckResult(result);
        }

        // Add any missing role assignments.
        foreach (var role in roles)
        {
            if (!await userManager.IsInRoleAsync(user, role))
            {
                var result = await userManager.AddToRoleAsync(user, role);

                CheckResult(result);
            }
        }
    }

    private static void CheckResult(IdentityResult result)
    {
        if (!result.Succeeded)
        {
            var errors = string.Join(
                "; ",
                result.Errors.Select(error => error.Description));

            throw new InvalidOperationException(errors);
        }
    }
}