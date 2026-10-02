import "./RecipePage.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getRecipeById } from "../../lib/recipes/getRecipeById";
import { deleteRecipe } from "@/lib/recipes/deleteRecipe";
import { Button } from "@/components/ui/button";
import { EditIcon, RemoveIcon } from "../../assets/icons/icons";
import { Alert, AlertDescription } from "../../components/ui/alert.jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog.jsx";
import { Skeleton } from "../../components/ui/skeleton.jsx";
import { Spinner } from "../../components/ui/spinner.jsx";
import TopNav from "../../components/top-nav/TopNav";
import DashboardCard from "../../components/dashboard-card/DashBoardCard";
import BackLink from "../../components/back-link/BackLink";
import RecipeSaveButton from "../../components/recipe-card/RecipeSaveButton";
import RecipeRating from "../../components/recipe-rating/RecipeRating";

export default function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    let shouldUpdate = true;
    // Fetches selected recipe
    async function loadRecipe() {
      try {
        setIsLoading(true);
        setError("");

        const fetchedRecipe = await getRecipeById(id);

        if (shouldUpdate) {
          setRecipe(fetchedRecipe);
        }
      } catch (requestError) {
        if (shouldUpdate) {
          setError(requestError.message);
        }
      } finally {
        if (shouldUpdate) {
          setIsLoading(false);
        }
      }
    }

    loadRecipe();

    return () => {
      shouldUpdate = false;
    };
  }, [id]);

  // Reloads the recipe after a rating change
  async function refreshRecipe() {
    const refreshedRecipe = await getRecipeById(id);
    setRecipe(refreshedRecipe);
  }

  // Deletes recipe and redirects to users recipe list
  async function handleDelete() {
    if (!recipe?.isOwner || isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);
      setDeleteError("");

      await deleteRecipe(recipe.id);

      navigate("/my-recipes", {
        replace: true,
      });
    } catch (deleteRequestError) {
      setDeleteError(
        deleteRequestError instanceof Error
          ? deleteRequestError.message
          : "Kunde inte ta bort receptet.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <>
        <TopNav />
        <main className="recipe-page">
          <div className="recipe-container">
            <DashboardCard>
              <Skeleton className="h-40" aria-label="Hämtar receptet" />
            </DashboardCard>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <TopNav />
        <main className="recipe-page">
          <div className="recipe-container">
            <DashboardCard>
              <h1>Något gick fel</h1>
              <Alert className="mt-4" variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </DashboardCard>
            <BackLink />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <TopNav />

      <main className="recipe-page">
        <div className="recipe-container">
          {recipe ? (
            <>
              <article className="recipe-details">
                <DashboardCard className="recipe-summary">
                  <div className="recipe-summary-heading">
                    <h1>{recipe.name}</h1>
                    <RecipeSaveButton key={recipe.id} recipe={recipe} />
                  </div>

                  <p>{recipe.description || "Beskrivning saknas."}</p>
                  <RecipeRating recipe={recipe} onRated={refreshRecipe} />
                </DashboardCard>

                <DashboardCard className="recipe-ingredients-card">
                  <h2>Ingredienser</h2>
                  {recipe.ingredients?.length ? (
                    <ul className="recipe-ingredients">
                      {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient.id}>
                          {ingredient.amount} {ingredient.unit}{" "}
                          {ingredient.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Ingredienser saknas.</p>
                  )}
                </DashboardCard>

                <DashboardCard className="recipe-instructions-card">
                  <h2>Gör så här</h2>
                  <p className="recipe-instructions">
                    {recipe.instructions || "Instruktioner saknas."}
                  </p>
                </DashboardCard>
              </article>

              {recipe.isOwner && (
                <div className="recipe-owner-actions">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Redigera recept"
                    title="Redigera recept"
                    onClick={() => navigate(`/recipe/${recipe.id}/edit`)}
                  >
                    <EditIcon aria-hidden="true" />
                  </Button>

                  <AlertDialog
                    open={isDeleteModalOpen}
                    onOpenChange={(open) => {
                      if (!isDeleting) {
                        setDeleteError("");
                        setIsDeleteModalOpen(open);
                      }
                    }}
                  >
                    <AlertDialogTrigger
                      render={
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          aria-label="Ta bort recept"
                          title="Ta bort recept"
                        />
                      }
                    >
                      <RemoveIcon aria-hidden="true" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Ta bort recept?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Vill du verkligen ta bort &quot;{recipe.name}&quot;?
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      {deleteError && (
                        <Alert variant="destructive">
                          <AlertDescription>{deleteError}</AlertDescription>
                        </Alert>
                      )}

                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>
                          Avbryt
                        </AlertDialogCancel>
                        <AlertDialogAction
                          type="button"
                          variant="destructive"
                          disabled={isDeleting}
                          onClick={handleDelete}
                        >
                          {isDeleting && <Spinner />}
                          {isDeleting ? "Tar bort..." : "Ta bort"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </>
          ) : (
            <DashboardCard>
              <h1>Receptet hittades inte.</h1>
            </DashboardCard>
          )}
          <BackLink />
        </div>
      </main>
    </>
  );
}
