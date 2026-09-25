import "./NewRecipePage.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../components/ui/button.jsx";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../components/ui/combobox.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import { Switch } from "../../components/ui/switch.jsx";
import { Textarea } from "../../components/ui/textarea.jsx";
import { RemoveIcon } from "../../assets/icons/icons.jsx";
import { createRecipe } from "../../lib/recipes/createRecipe.js";
import { getRecipeById } from "../../lib/recipes/getRecipeById.js";
import TopNav from "../../components/top-nav/TopNav.jsx";
import DashboardCard from "../../components/dashboard-card/DashBoardCard.jsx";
import { updateRecipe } from "../../lib/recipes/updateRecipe.js";

const measurementUnits = [
  "st",
  "krm",
  "tsk",
  "msk",
  "ml",
  "cl",
  "dl",
  "l",
  "g",
  "hg",
  "kg",
];

function NewRecipePage({ editMode = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [existingRecipe, setExistingRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(editMode);
  const [ingredients, setIngredients] = useState([{ id: 1, unit: null }]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  function addIngredient() {
    setIngredients((currentIngredients) => {
      const nextId = Math.max(0, ...currentIngredients.map(({ id }) => id)) + 1;

      return [...currentIngredients, { id: nextId, unit: null }];
    });
  }

  useEffect(() => {
    if (!editMode) {
      return;
    }

    let active = true;

    async function loadRecipe() {
      try {
        const result = await getRecipeById(id);

        if (!result) {
          throw new Error("Receptet hittades inte.");
        }

        if (!result.isOwner) {
          throw new Error("Du får inte redigera det här receptet.");
        }

        if (active) {
          setExistingRecipe(result);
          setIsPrivate(!result.isPublic);

          setIngredients(
            result.ingredients.map((ingredient, index) => ({
              id: index + 1,
              name: ingredient.name,
              amount: ingredient.amount,
              unit: ingredient.unit,
            })),
          );
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Kunde inte hämta receptet.",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadRecipe();

    return () => {
      active = false;
    };
  }, [editMode, id]);

  function updateIngredientUnit(id, unit) {
    setIngredients((currentIngredients) =>
      currentIngredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, unit } : ingredient,
      ),
    );
  }

  function removeIngredient(id) {
    setIngredients((currentIngredients) =>
      currentIngredients.length === 1
        ? currentIngredients
        : currentIngredients.filter((ingredient) => ingredient.id !== id),
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (ingredients.some((ingredient) => !ingredient.unit)) {
      setError("Välj en måttenhet för varje ingrediens.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const recipe = {
      name: formData.get("name").trim(),
      description: formData.get("description").trim(),
      cookingTimeMinutes: Number(formData.get("cookingTimeMinutes")),
      isPrivate,
      instructions: formData.get("instructions").trim(),
      ingredients: ingredients.map((ingredient, index) => ({
        name: formData.get(`ingredients[${index}].name`).trim(),
        amount: Number(formData.get(`ingredients[${index}].amount`)),
        unit: ingredient.unit,
      })),
    };

    setError("");
    setIsSaving(true);

    try {
      const savedRecipe = editMode
        ? await updateRecipe(id, recipe)
        : await createRecipe(recipe);

      navigate(`/recipe/${savedRecipe.id}`, { replace: true });
    } catch (submitError) {
      setError(
        submitError instanceof TypeError
          ? "Kunde inte ansluta till servern. Försök igen."
          : submitError.message,
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <>
        <TopNav />

        <main className="new-recipe-page">
          <div className="new-recipe-container">
            <DashboardCard>
              <p>Hämtar receptet...</p>
            </DashboardCard>
          </div>
        </main>
      </>
    );
  }

  if (editMode && !existingRecipe) {
    return (
      <>
        <TopNav />

        <main className="new-recipe-page">
          <div className="new-recipe-container">
            <DashboardCard>
              <h1>Kunde inte redigera receptet</h1>
              <p role="alert">{error}</p>
            </DashboardCard>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <TopNav />

      <main className="new-recipe-page">
        <form onSubmit={handleSubmit}>
          <div className="new-recipe-container">
            <DashboardCard className="new-recipe-details">
              <div className="new-recipe-fields">
                <div className="new-recipe-field">
                  <Input
                    className="h-10 text-lg md:text-lg"
                    id="recipe-name"
                    name="name"
                    type="text"
                    defaultValue={existingRecipe?.name ?? ""}
                    minLength="2"
                    maxLength="150"
                    placeholder="Namnet på ditt recept..."
                    required
                  />
                </div>

                <div className="new-recipe-field">
                  <Textarea
                    id="recipe-description"
                    name="description"
                    defaultValue={existingRecipe?.description ?? ""}
                    maxLength="1000"
                    placeholder="Beskriv receptet kort..."
                  />
                </div>

                <div className="new-recipe-options">
                  <div className="new-recipe-cooking-time">
                    <Input
                      id="recipe-cooking-time"
                      name="cookingTimeMinutes"
                      type="number"
                      defaultValue={existingRecipe?.cookingTimeMinutes ?? ""}
                      min="1"
                      max="1440"
                      step="1"
                      placeholder="Tillagningstid"
                      aria-label="Tillagningstid i minuter"
                      aria-describedby="recipe-cooking-time-unit"
                      required
                    />

                    <span id="recipe-cooking-time-unit">minuter</span>
                  </div>

                  <div className="new-recipe-private">
                    <Label htmlFor="private-recipe">Gör receptet privat</Label>
                    <Switch
                      id="private-recipe"
                      name="isPrivate"
                      size="sm"
                      checked={isPrivate}
                      onCheckedChange={setIsPrivate}
                    />
                  </div>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard className="new-recipe-instructions">
              <Textarea
                className="new-recipe-instructions-input"
                id="recipe-instructions"
                name="instructions"
                defaultValue={existingRecipe?.instructions ?? ""}
                maxLength="10000"
                placeholder="Beskriv hur man tillagar ditt recept"
                required
              />
            </DashboardCard>

            <DashboardCard className="new-recipe-ingredients">
              <div className="new-recipe-card-header">
                <h2>Ingredienser</h2>
                <p>Lägg till ingredienser.</p>
              </div>

              <div className="new-recipe-ingredient-list">
                {ingredients.map((ingredient, index) => (
                  <div className="new-recipe-ingredient" key={ingredient.id}>
                    <Input
                      name={`ingredients[${index}].name`}
                      type="text"
                      defaultValue={ingredient.name ?? ""}
                      maxLength="100"
                      placeholder="Ingrediens"
                      aria-label={`Ingrediens ${index + 1}`}
                      required
                    />

                    <Input
                      name={`ingredients[${index}].amount`}
                      type="number"
                      defaultValue={ingredient.amount ?? ""}
                      min="0.01"
                      step="any"
                      placeholder="Mängd"
                      aria-label={`Mängd för ingrediens ${index + 1}`}
                      required
                    />

                    <Combobox
                      items={measurementUnits}
                      name={`ingredients[${index}].unit`}
                      value={ingredient.unit}
                      onValueChange={(unit) =>
                        updateIngredientUnit(ingredient.id, unit)
                      }
                    >
                      <ComboboxInput
                        className="new-recipe-unit"
                        placeholder="Enhet"
                        aria-label={`Måttenhet för ingrediens ${index + 1}`}
                        required
                      />
                      <ComboboxContent>
                        <ComboboxEmpty>Ingen enhet hittades.</ComboboxEmpty>
                        <ComboboxList>
                          {(unit) => (
                            <ComboboxItem value={unit} key={unit}>
                              {unit}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>

                    <Button
                      className="new-recipe-remove-ingredient"
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Ta bort ingrediens ${index + 1}`}
                      onClick={() => removeIngredient(ingredient.id)}
                      disabled={ingredients.length === 1}
                    >
                      <RemoveIcon aria-hidden="true" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                className="new-recipe-add-ingredient"
                type="button"
                variant="outline"
                onClick={addIngredient}
              >
                + Lägg till fler
              </Button>
            </DashboardCard>
          </div>

          <div className="new-recipe-actions">
            {error && (
              <p className="new-recipe-error" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" disabled={isSaving}>
              {isSaving
                ? editMode
                  ? "Uppdaterar..."
                  : "Sparar..."
                : editMode
                  ? "Spara ändringar"
                  : "Spara recept"}
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}

export default NewRecipePage;
