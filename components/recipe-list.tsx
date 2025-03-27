import { getRandomRecipes } from "@/lib/api"
import { RecipeCard } from "@/components/recipe-card"
import { RecipeCardSkeleton } from "@/components/recipe-card-skeleton"

export async function RecipeList() {
  const recipes = await getRandomRecipes(6)

  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg">
        <p className="text-muted-foreground">
          No recipes available at the moment. Try searching for specific ingredients.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, index) => (
        <RecipeCard key={recipe.id} recipe={recipe} index={index} />
      ))}
    </div>
  )
}

export function RecipeListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  )
}

