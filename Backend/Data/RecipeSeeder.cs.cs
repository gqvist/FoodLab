using FoodLab.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FoodLab.Data;

public static class RecipeSeeder
{
    private static readonly RecipeTemplate[] Templates =
    [
        new(
            "Pasta med tomatsås",
            "En enkel pasta med tomatsås.",
            25,
            "Koka pastan. Stek löken. Tillsätt tomaterna och låt såsen sjuda. Blanda med pastan.",
            [
                new("Pasta", 400m, "g"),
                new("Krossade tomater", 500m, "g"),
                new("Gul lök", 1m, "st")
            ]),

        new(
            "Kycklinggryta",
            "En krämig kycklinggryta med curry.",
            40,
            "Skär och stek kycklingen. Tillsätt grädde och curry. Låt grytan sjuda tills kycklingen är klar.",
            [
                new("Kyckling", 600m, "g"),
                new("Matlagningsgrädde", 3m, "dl"),
                new("Curry", 2m, "tsk")
            ]),

        new(
            "Tacos",
            "Klassiska tacos med köttfärs.",
            30,
            "Stek köttfärsen. Tillsätt tacokrydda. Servera med tortillas och salsa.",
            [
                new("Köttfärs", 500m, "g"),
                new("Tortillabröd", 8m, "st"),
                new("Salsa", 2m, "dl")
            ]),

        new(
            "Linsgryta",
            "En vegetarisk gryta med röda linser.",
            35,
            "Hacka och stek löken. Tillsätt linser och kokosmjölk. Låt grytan sjuda tills linserna är mjuka.",
            [
                new("Röda linser", 4m, "dl"),
                new("Kokosmjölk", 4m, "dl"),
                new("Gul lök", 1m, "st")
            ]),

        new(
            "Pannkakor",
            "Klassiska tunna pannkakor.",
            30,
            "Vispa ihop mjöl, mjölk och ägg. Stek pannkakorna i en varm stekpanna.",
            [
                new("Vetemjöl", 3m, "dl"),
                new("Mjölk", 6m, "dl"),
                new("Ägg", 3m, "st")
            ]),

        new(
            "Ugnsbakad lax",
            "Lax med potatis och citron.",
            45,
            "Lägg laxen i en ugnsform. Skär potatisen och lägg den bredvid. Tillaga i ugnen och servera med citron.",
            [
                new("Lax", 600m, "g"),
                new("Potatis", 1m, "kg"),
                new("Citron", 1m, "st")
            ]),

        new(
            "Vegetarisk wok",
            "En snabb wok med grönsaker och nudlar.",
            20,
            "Koka nudlarna. Woka grönsakerna. Tillsätt nudlar och soja och blanda ordentligt.",
            [
                new("Wokgrönsaker", 700m, "g"),
                new("Nudlar", 400m, "g"),
                new("Soja", 3m, "msk")
            ])
    ];

    public static async Task SeedAsync(IServiceProvider services)
    {
        var dbContext =
            services.GetRequiredService<ApplicationDbContext>();

        var userManager =
            services.GetRequiredService<UserManager<ApplicationUser>>();

        string[] userEmails =
        [
            "user1@foodlab.test",
            "user2@foodlab.test"
        ];

        foreach (var email in userEmails)
        {
            var user = await userManager.FindByEmailAsync(email);

            if (user is null)
            {
                throw new InvalidOperationException(
                    $"Kunde inte hitta testanvändaren {email}.");
            }

            var existingRecipeNames = await dbContext.Recipes
                .AsNoTracking()
                .Where(recipe => recipe.OwnerId == user.Id)
                .Select(recipe => recipe.Name)
                .ToListAsync();

            var existingNames = new HashSet<string>(
                existingRecipeNames,
                StringComparer.OrdinalIgnoreCase);

            var recipes = CreateRecipes(user.Id)
                .Where(recipe => !existingNames.Contains(recipe.Name))
                .ToList();

            dbContext.Recipes.AddRange(recipes);
        }

        await dbContext.SaveChangesAsync();
    }

    private static IEnumerable<Recipe> CreateRecipes(string ownerId)
    {
        for (var index = 0; index < Templates.Length; index++)
        {
            var template = Templates[index];

            yield return CreateRecipe(
                template,
                ownerId,
                isPublic: true,
                nameSuffix: "publik",
                createdDaysAgo: index);

            yield return CreateRecipe(
                template,
                ownerId,
                isPublic: false,
                nameSuffix: "privat",
                createdDaysAgo: index + Templates.Length);
        }
    }

    private static Recipe CreateRecipe(
        RecipeTemplate template,
        string ownerId,
        bool isPublic,
        string nameSuffix,
        int createdDaysAgo)
    {
        return new Recipe
        {
            Name = $"[Test] {template.Name} ({nameSuffix})",
            Description = template.Description,
            CookingTimeMinutes = template.CookingTimeMinutes,
            Instructions = template.Instructions,
            IsPublic = isPublic,
            OwnerId = ownerId,
            CreatedAt = DateTimeOffset.UtcNow.AddDays(-createdDaysAgo),

            Ingredients = template.Ingredients
                .Select(ingredient => new RecipeIngredient
                {
                    Name = ingredient.Name,
                    Amount = ingredient.Amount,
                    Unit = ingredient.Unit
                })
                .ToList()
        };
    }

    private sealed record RecipeTemplate(
        string Name,
        string Description,
        int CookingTimeMinutes,
        string Instructions,
        RecipeIngredientTemplate[] Ingredients);

    private sealed record RecipeIngredientTemplate(
        string Name,
        decimal Amount,
        string Unit);
}