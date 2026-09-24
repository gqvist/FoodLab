import { ProfileIcon, SaveIcon } from "../../assets/icons/icons";
import { useRecipes } from "../../lib/recipes/recipeContext";
import "./RecipeCard.css";

export default function RecipeSaveButton({ recipe }) {
  const { currentUserId, savedIds, toggleSaved } = useRecipes();
  if (recipe.isOwner || recipe.ownerId === currentUserId) {
    return (
      <span
        className="recipe-owner"
        role="img"
        aria-label="Ditt recept"
        title="Ditt recept"
      >
        <ProfileIcon size={20} aria-hidden="true" />
      </span>
    );
  }
  if (!recipe.isPublic) return null;
  const saved = savedIds.includes(recipe.id);

  return (
    <button
      type="button"
      className="recipe-save"
      aria-pressed={saved}
      aria-label={`Spara ${recipe.name}`}
      title={saved ? "Ta bort sparat recept" : "Spara recept"}
      onClick={() => toggleSaved(recipe.id)}
    >
      <SaveIcon
        size={20}
        fill={saved ? "currentColor" : "none"}
        aria-hidden="true"
      />
    </button>
  );
}
