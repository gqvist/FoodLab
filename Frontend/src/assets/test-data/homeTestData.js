// Random skräpdata medan jag bygger frontend

export const weekPlan = [
  { day: "Måndag", recipeId: 1 },
  { day: "Tisdag", recipeId: 7 },
  { day: "Onsdag", recipeId: 8 },
  { day: "Torsdag", recipeId: 3 },
  { day: "Fredag", recipeId: 9 },
  { day: "Lördag", recipeId: 10 },
  { day: "Söndag", recipeId: 2 },
];

export const shoppingList = [
  { id: 1, name: "Kyckling", amount: 800, unit: "g" },
  { id: 2, name: "Pasta", amount: 500, unit: "g" },
  { id: 3, name: "Tomater", amount: 8, unit: "st" },
  { id: 4, name: "Potatis", amount: 1.5, unit: "kg" },
  { id: 5, name: "Mjölk", amount: 1, unit: "l" },
  { id: 6, name: "Gul lök", amount: 4, unit: "st" },
];

export const myRecipes = [
  {
    id: 1,
    name: "Kycklingpasta",
    description: "En enkel och krämig kycklingpasta med vitlök.",
    cookingTimeMinutes: 30,
    rating: 4.5,
    instructions: [
      "1. Koka pastan enligt anvisningarna på förpackningen.",
      "2. Skär kycklingen i bitar och stek i oljan tills den är genomstekt.",
      "3. Tillsätt finhackad vitlök och stek kort.",
      "4. Häll i grädden och låt sjuda i några minuter.",
      "5. Blanda med pastan och servera.",
    ].join("\n"),
    ingredients: [
      { id: 1, name: "Kycklingfilé", amount: 400, unit: "g" },
      { id: 2, name: "Pasta", amount: 300, unit: "g" },
      { id: 3, name: "Matlagningsgrädde", amount: 2, unit: "dl" },
      { id: 4, name: "Vitlöksklyftor", amount: 2, unit: "st" },
      { id: 5, name: "Olivolja", amount: 1, unit: "msk" },
    ],
  },
  {
    id: 2,
    name: "Lasagne",
    cookingTimeMinutes: 60,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Tomatsoppa",
    cookingTimeMinutes: 25,
    rating: 4.2,
  },
];

export const savedRecipes = [
  {
    id: 4,
    name: "Krämig laxpasta",
    cookingTimeMinutes: 35,
    rating: 4.7,
  },
  {
    id: 5,
    name: "Chili con carne",
    cookingTimeMinutes: 45,
    rating: 4.4,
  },
  {
    id: 6,
    name: "Koreanska tacos",
    cookingTimeMinutes: 40,
    rating: 4.9,
  },
];

// All recipes available to the calendar and recipe detail page.
export const recipes = [
  ...myRecipes.map((recipe) => ({ ...recipe, ownerId: "demo-user", isPublic: recipe.id !== 3 })),
  ...savedRecipes.map((recipe) => ({ ...recipe, ownerId: "demo-other", isPublic: true })),
  { id: 7, name: "Tacos", cookingTimeMinutes: 25, rating: 4.3, ownerId: "demo-other", isPublic: true },
  { id: 8, name: "Lax med potatis", cookingTimeMinutes: 40, rating: 4.6, ownerId: "demo-other", isPublic: true },
  { id: 9, name: "Hemmagjord pizza", cookingTimeMinutes: 60, rating: 4.8, ownerId: "demo-other", isPublic: true },
  { id: 10, name: "Burgare", cookingTimeMinutes: 30, rating: 4.2, ownerId: "demo-other", isPublic: true },
];
