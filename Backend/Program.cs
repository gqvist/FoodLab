using FoodLab.Data;
using FoodLab.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using FoodLab.Services;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Applies auto antiforgery validation to unsafe controller actions
builder.Services.AddControllersWithViews(options =>
{
    options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
});

builder.Services.AddOpenApi();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? 
    throw new InvalidOperationException("Missing DefaultConnection connection string.");

// Reads dev or prod db connection and registers EF core with SQL server
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

// Configures Identity for cookie auth and stores user roles with EF core
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
    {
        options.User.RequireUniqueEmail = true;
        options.Password.RequiredLength = 8;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthorization();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<RecipeService>();
builder.Services.AddScoped<MealPlanService>();

var frontendOrigin = builder.Configuration["FrontendOrigin"];

if (string.IsNullOrWhiteSpace(frontendOrigin))
{
    throw new InvalidOperationException(
        "Missing FrontendOrigin configuration.");
}

// Configures auth cookie that expires after 2 hours of inactivity
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = "FoodLab.Auth";
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.Lax;

    options.ExpireTimeSpan = TimeSpan.FromHours(2);
    options.SlidingExpiration = true;
});

// Using custom header for CSRF protection on requests that change server data (X-csrf-token - copied name from tutorial)
builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "X-CSRF-TOKEN";
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins(frontendOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Dev only. Seeds users and recipes in dev enviroment
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();

    await IdentitySeeder.SeedAsync(scope.ServiceProvider, app.Configuration);
    await RecipeSeeder.SeedAsync(scope.ServiceProvider);
}

// Allow access to OpenAPI and Scalar API reference without authentication (for assignment purpose)
app.MapOpenApi().AllowAnonymous();
app.MapScalarApiReference("/scalar").AllowAnonymous();

app.UseHttpsRedirection();

app.UseRouting();
app.UseCors("Frontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
