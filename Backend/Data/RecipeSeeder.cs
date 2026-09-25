using FoodLab.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FoodLab.Data;

public static class RecipeSeeder
{
    private static readonly RecipeTemplate[] Templates =
    [
        new(
            "Krämig tomatpasta med basilika",
            "En snabb och krämig vardagspasta med tomat, vitlök och färsk basilika.",
            30,
            "1. Koka pastan enligt anvisningarna på förpackningen och spara 1 dl pastavatten.\n2. Finhacka lök och vitlök. Fräs dem mjuka i olivolja utan att de tar färg.\n3. Tillsätt krossade tomater och låt såsen sjuda i 10 minuter.\n4. Rör ner grädde och smaka av med salt och svartpeppar.\n5. Vänd ner pastan i såsen. Späd med lite pastavatten om det behövs.\n6. Toppa med parmesan och färsk basilika vid servering.",
            [
                new("Penne", 400m, "g"),
                new("Krossade tomater", 500m, "g"),
                new("Gul lök", 1m, "st"),
                new("Vitlöksklyftor", 2m, "st"),
                new("Matlagningsgrädde", 2m, "dl"),
                new("Olivolja", 1m, "msk"),
                new("Parmesan", 75m, "g"),
                new("Färsk basilika", 1m, "st"),
                new("Salt", 1m, "tsk"),
                new("Svartpeppar", 2m, "krm")
            ]),

        new(
            "Krämig kycklinggryta med curry",
            "En mild och smakrik kycklinggryta med paprika, curry och ris.",
            40,
            "1. Koka riset enligt anvisningarna på förpackningen.\n2. Skär kycklingen i bitar och bryn den i smör tills den har fått fin färg.\n3. Hacka löken och strimla paprikan. Låt grönsakerna steka med i några minuter.\n4. Strö över curry och rör om så att kryddan rostas lätt.\n5. Häll i grädde och kycklingbuljong. Låt grytan sjuda i 15 minuter.\n6. Kontrollera att kycklingen är genomstekt och smaka av med salt och peppar. Servera med ris.",
            [
                new("Kycklingfilé", 600m, "g"),
                new("Basmatiris", 3m, "dl"),
                new("Matlagningsgrädde", 3m, "dl"),
                new("Gul lök", 1m, "st"),
                new("Röd paprika", 1m, "st"),
                new("Curry", 2m, "tsk"),
                new("Kycklingbuljong", 1m, "st"),
                new("Smör", 1m, "msk"),
                new("Salt", 1m, "tsk"),
                new("Svartpeppar", 2m, "krm")
            ]),

        new(
            "Svenska fredagstacos med ananas",
            "Goda svenska tacos med kryddig köttfärs, krispiga grönsaker och söt ananas.",
            30,
            "1. Bryn köttfärsen i olja på medelhög värme tills den är genomstekt.\n2. Tillsätt tacokrydda och vatten. Låt puttra tills vätskan nästan har kokat in.\n3. Strimla salladen och skär tomat, gurka och ananas i mindre bitar.\n4. Värm tortillabröden enligt anvisningarna på förpackningen.\n5. Fyll bröden med köttfärs, grönsaker, ananas och riven ost.\n6. Toppa med salsa och gräddfil och servera direkt.",
            [
                new("Köttfärs", 500m, "g"),
                new("Tortillabröd", 8m, "st"),
                new("Tacokrydda", 1m, "st"),
                new("Isbergssallad", 0.5m, "st"),
                new("Tomater", 2m, "st"),
                new("Gurka", 0.5m, "st"),
                new("Ananasringar", 4m, "st"),
                new("Riven ost", 150m, "g"),
                new("Salsa", 2m, "dl"),
                new("Gräddfil", 2m, "dl")
            ]),

        new(
            "Linsgryta med kokosmjölk",
            "En värmande vegetarisk gryta med röda linser, kokosmjölk och ingefära.",
            35,
            "1. Skölj linserna noggrant i kallt vatten.\n2. Hacka lök och vitlök. Riv ingefäran fint.\n3. Fräs lök, vitlök, ingefära och curry i olja i ett par minuter.\n4. Tillsätt linser, krossade tomater, kokosmjölk och grönsaksbuljong.\n5. Låt grytan sjuda utan lock i cirka 20 minuter, tills linserna är mjuka. Rör om då och då.\n6. Smaka av med limejuice och salt. Servera gärna med bröd eller ris.",
            [
                new("Röda linser", 3m, "dl"),
                new("Kokosmjölk", 4m, "dl"),
                new("Krossade tomater", 400m, "g"),
                new("Gul lök", 1m, "st"),
                new("Vitlöksklyftor", 2m, "st"),
                new("Färsk ingefära", 20m, "g"),
                new("Curry", 2m, "tsk"),
                new("Grönsaksbuljong", 1m, "st"),
                new("Lime", 1m, "st"),
                new("Rapsolja", 1m, "msk"),
                new("Salt", 1m, "tsk")
            ]),

        new(
            "Klassiska svenska pannkakor",
            "Tunna, gyllene pannkakor som passar lika bra till middag som till efterrätt.",
            30,
            "1. Vispa ihop mjölet med hälften av mjölken till en slät smet.\n2. Vispa ner resten av mjölken, äggen och saltet.\n3. Låt smeten vila i 10 minuter så blir pannkakorna lättare att steka.\n4. Smält lite smör i en varm stekpanna.\n5. Häll i ett tunt lager smet och stek pannkakan gyllene på båda sidor.\n6. Servera pannkakorna med sylt och vispad grädde.",
            [
                new("Vetemjöl", 3m, "dl"),
                new("Mjölk", 6m, "dl"),
                new("Ägg", 3m, "st"),
                new("Salt", 0.5m, "tsk"),
                new("Smör", 50m, "g"),
                new("Jordgubbssylt", 2m, "dl"),
                new("Vispgrädde", 2m, "dl")
            ]),

        new(
            "Ugnsbakad lax med citron och dill",
            "Saftig lax med rostad potatis, citron och en enkel kall dillsås.",
            45,
            "1. Sätt ugnen på 225 grader.\n2. Dela potatisen och blanda den med olja och salt på en plåt. Rosta i ugnen i 20 minuter.\n3. Lägg laxen i en ugnsform. Krydda med salt och peppar och pressa över hälften av citronen.\n4. Sänk temperaturen till 200 grader och baka laxen tillsammans med potatisen i 15–20 minuter.\n5. Blanda crème fraiche med hackad dill och resten av citronjuicen.\n6. Servera laxen med den rostade potatisen, dillsåsen och citronklyftor.",
            [
                new("Laxfilé", 600m, "g"),
                new("Potatis", 1m, "kg"),
                new("Citron", 1m, "st"),
                new("Crème fraiche", 2m, "dl"),
                new("Färsk dill", 1m, "st"),
                new("Rapsolja", 2m, "msk"),
                new("Salt", 1m, "tsk"),
                new("Svartpeppar", 2m, "krm")
            ]),

        new(
            "Grönsakswok med nudlar",
            "En färgglad och snabb wok med krispiga grönsaker, äggnudlar och sesam.",
            25,
            "1. Koka nudlarna en minut kortare än anvisningen på förpackningen. Häll av vattnet.\n2. Skär broccoli, paprika och morot i tunna, jämnstora bitar.\n3. Finhacka vitlöken och stek den snabbt i olja i en het wok eller stor stekpanna.\n4. Tillsätt grönsakerna och woka i 5–6 minuter. De ska mjukna men fortfarande ha tuggmotstånd.\n5. Rör ner nudlar, soja och sweet chilisås. Blanda tills allt är varmt.\n6. Strö över sesamfrön och servera med limeklyftor.",
            [
                new("Äggnudlar", 300m, "g"),
                new("Broccoli", 1m, "st"),
                new("Röd paprika", 1m, "st"),
                new("Morötter", 2m, "st"),
                new("Vitlöksklyftor", 2m, "st"),
                new("Soja", 3m, "msk"),
                new("Sweet chilisås", 2m, "msk"),
                new("Sesamolja", 1m, "msk"),
                new("Sesamfrön", 1m, "msk"),
                new("Lime", 1m, "st")
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

        for (var userIndex = 0; userIndex < userEmails.Length; userIndex++)
        {
            var email = userEmails[userIndex];
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

            var recipes = CreateRecipes(user.Id, userIndex)
                .Where(recipe => !existingNames.Contains(recipe.Name))
                .ToList();

            dbContext.Recipes.AddRange(recipes);
        }

        await dbContext.SaveChangesAsync();
    }

    private static IEnumerable<Recipe> CreateRecipes(
        string ownerId,
        int userIndex)
    {
        for (var index = 0; index < Templates.Length; index++)
        {
            var template = Templates[index];

            yield return CreateRecipe(
                template,
                ownerId,
                isPublic: (index + userIndex) % 2 == 0,
                createdDaysAgo: index);
        }
    }

    private static Recipe CreateRecipe(
        RecipeTemplate template,
        string ownerId,
        bool isPublic,
        int createdDaysAgo)
    {
        return new Recipe
        {
            Name = template.Name,
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
