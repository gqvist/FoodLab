using FoodLab.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FoodLab.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Recipe> Recipes => Set<Recipe>();

    public DbSet<RecipeIngredient> RecipeIngredients => Set<RecipeIngredient>();

    public DbSet<SavedRecipe> SavedRecipes => Set<SavedRecipe>();

    public DbSet<RecipeRating> RecipeRatings => Set<RecipeRating>();

    public DbSet<MealPlanEntry> MealPlanEntries => Set<MealPlanEntry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        ConfigureRecipe(modelBuilder);
        ConfigureRecipeIngredient(modelBuilder);
        ConfigureSavedRecipe(modelBuilder);
        ConfigureRecipeRating(modelBuilder);
        ConfigureMealPlanEntry(modelBuilder);
    }

    private static void ConfigureRecipe(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Recipe>(entity =>
        {
            entity.HasKey(recipe => recipe.Id);

            entity.Property(recipe => recipe.Name)
                .IsRequired()
                .HasMaxLength(150);

            entity.Property(recipe => recipe.Description)
                .HasMaxLength(1000);

            entity.Property(recipe => recipe.Instructions)
                .IsRequired()
                .HasMaxLength(10000);

            entity.Property(recipe =>
                    recipe.CookingTimeMinutes)
                .IsRequired();

            entity.Property(recipe => recipe.IsPublic)
                .HasDefaultValue(false);

            entity.Property(recipe => recipe.CreatedAt)
                .IsRequired();

            entity.Property(recipe => recipe.OwnerId)
                .IsRequired();

            entity.HasOne(recipe => recipe.Owner)
                .WithMany(user => user.Recipes)
                .HasForeignKey(recipe => recipe.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasMany(recipe => recipe.Ingredients)
                .WithOne(ingredient => ingredient.Recipe)
                .HasForeignKey(ingredient => ingredient.RecipeId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(recipe => new
            {
                recipe.IsPublic,
                recipe.CreatedAt
            });

            entity.ToTable(table =>
            {
                table.HasCheckConstraint(
                    "CK_Recipes_CookingTimeMinutes",
                    "[CookingTimeMinutes] > 0");
            });
        });
    }

    private static void ConfigureRecipeIngredient(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RecipeIngredient>(entity =>
        {
            entity.HasKey(ingredient => ingredient.Id);

            entity.Property(ingredient => ingredient.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(ingredient => ingredient.Amount)
                .HasPrecision(10, 2)
                .IsRequired();

            entity.Property(ingredient => ingredient.Unit)
                .IsRequired()
                .HasMaxLength(20);

            entity.ToTable(table =>
            {
                table.HasCheckConstraint(
                    "CK_RecipeIngredients_Amount",
                    "[Amount] > 0");
            });
        });
    }

    private static void ConfigureSavedRecipe(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SavedRecipe>(entity =>
        {
            entity.HasKey(savedRecipe => new
            {
                savedRecipe.UserId,
                savedRecipe.RecipeId
            });

            entity.Property(savedRecipe => savedRecipe.SavedAt)
                .IsRequired();

            entity.HasOne(savedRecipe => savedRecipe.User)
                .WithMany(user => user.SavedRecipes)
                .HasForeignKey(savedRecipe => savedRecipe.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(savedRecipe => savedRecipe.Recipe)
                .WithMany(recipe => recipe.SavedRecipes)
                .HasForeignKey(savedRecipe => savedRecipe.RecipeId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }

    private static void ConfigureRecipeRating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RecipeRating>(entity =>
        {
            entity.HasKey(rating => new
            {
                rating.UserId,
                rating.RecipeId
            });

            entity.Property(rating => rating.Value)
                .IsRequired();

            entity.HasOne(rating => rating.User)
                .WithMany(user => user.Ratings)
                .HasForeignKey(rating => rating.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(rating => rating.Recipe)
                .WithMany(recipe => recipe.Ratings)
                .HasForeignKey(rating => rating.RecipeId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(rating => rating.RecipeId);

            entity.ToTable(table =>
            {
                table.HasCheckConstraint(
                    "CK_RecipeRatings_Value",
                    "[Value] BETWEEN 1 AND 5");
            });
        });
    }

    private static void ConfigureMealPlanEntry(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MealPlanEntry>(entity =>
        {
            entity.HasKey(entry => new
            {
                entry.UserId,
                entry.DayOfWeek
            });

            entity.Property(entry => entry.DayOfWeek)
                .IsRequired();

            entity.Property(entry => entry.RecipeId)
                .IsRequired();

            entity.HasOne(entry => entry.User)
                .WithMany(user => user.MealPlanEntries)
                .HasForeignKey(entry => entry.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(entry => entry.Recipe)
                .WithMany(recipe => recipe.MealPlanEntries)
                .HasForeignKey(entry => entry.RecipeId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(entry => entry.RecipeId);

            entity.HasIndex(entry => new
            {
                entry.UserId,
                entry.RecipeId
            })
                .IsUnique();

            entity.ToTable(table =>
            {
                table.HasCheckConstraint(
                    "CK_MealPlanEntries_DayOfWeek",
                    "[DayOfWeek] BETWEEN 1 AND 7");
            });
        });
    }
}