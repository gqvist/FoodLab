import "./NewRecipePage.css";

import { useState } from "react";
import TopNav from "../../components/top-nav/TopNav.jsx";
import DashboardCard from "../../components/dashboard-card/DashBoardCard.jsx";
import BackLink from "@/components/back-link/BackLink";
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
];

function NewRecipePage() {
  const [ingredients, setIngredients] = useState([{ id: 1, unit: null }]);

  function addIngredient() {
    setIngredients((currentIngredients) => {
      const nextId = Math.max(0, ...currentIngredients.map(({ id }) => id)) + 1;

      return [...currentIngredients, { id: nextId, unit: null }];
    });
  }

  function updateIngredientUnit(id, unit) {
    setIngredients((currentIngredients) =>
      currentIngredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, unit } : ingredient,
      ),
    );
  }

  function removeIngredient(id) {
    setIngredients((currentIngredients) =>
      currentIngredients.filter((ingredient) => ingredient.id !== id),
    );
  }

  return (
    <>
      <TopNav />

      <main className="new-recipe-page">
        <div className="new-recipe-container">
          <DashboardCard className="new-recipe-details">
            <div className="new-recipe-fields">
              <div className="new-recipe-field">
                <Input
                  className="h-10 text-lg md:text-lg"
                  id="recipe-name"
                  name="name"
                  type="text"
                  placeholder="Namnet på ditt recept..."
                />
              </div>

              <div className="new-recipe-field">
                <Textarea
                  id="recipe-description"
                  name="description"
                  placeholder="Beskriv receptet kort..."
                />
              </div>

              <div className="new-recipe-private">
                <Label htmlFor="private-recipe">Gör receptet privat</Label>
                <Switch id="private-recipe" name="isPrivate" size="sm" />
              </div>
            </div>
          </DashboardCard>

          <DashboardCard className="new-recipe-steps">
            <Textarea
              className="new-recipe-steps-input"
              id="recipe-steps"
              name="steps"
              placeholder="Beskriv hur man tillagar ditt recept"
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
                    placeholder="Ingrediens"
                    aria-label={`Ingrediens ${index + 1}`}
                  />

                  <Input
                    name={`ingredients[${index}].amount`}
                    type="number"
                    min="0"
                    step="any"
                    placeholder="Mängd"
                    aria-label={`Mängd för ingrediens ${index + 1}`}
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
          <Button type="button">Spara recept</Button>
        </div>
      </main>
    </>
  );
}

export default NewRecipePage;
