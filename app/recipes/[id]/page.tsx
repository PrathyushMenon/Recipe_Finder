import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, Users, ExternalLink, ArrowLeft, ChefHat, Bookmark } from "lucide-react"
import { getRecipeDetails } from "@/lib/api"
import { NutritionFacts } from "@/components/nutrition-facts"
import { Ingredients } from "@/components/ingredients"
import { CookingInstructions } from "@/components/cooking-instructions"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"

export default async function RecipeDetailsPage({ params }: { params: { id: string } }) {
  const recipeId = Number.parseInt(params.id)

  if (isNaN(recipeId)) {
    notFound()
  }

  const recipe = await getRecipeDetails(recipeId)

  if (!recipe) {
    notFound()
  }

  return (
    <PageTransition>
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to search
        </Link>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
            <Image
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {recipe.diets &&
                recipe.diets.map((diet, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {diet}
                  </span>
                ))}
            </div>

            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

            <div className="flex flex-wrap gap-6 mb-6">
              {recipe.readyInMinutes && (
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>{recipe.readyInMinutes} minutes</span>
                </div>
              )}

              {recipe.servings && (
                <div className="flex items-center text-muted-foreground">
                  <Users className="mr-2 h-5 w-5" />
                  <span>{recipe.servings} servings</span>
                </div>
              )}

              {recipe.healthScore && (
                <div className="flex items-center text-muted-foreground">
                  <ChefHat className="mr-2 h-5 w-5" />
                  <span>Health Score: {recipe.healthScore}</span>
                </div>
              )}
            </div>

            {recipe.summary && (
              <div className="prose prose-sm max-w-none mb-6" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            )}

            <div className="flex flex-wrap gap-3">
              {recipe.sourceUrl && (
                <Button asChild variant="outline">
                  <Link
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    View original recipe
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}

              <Button variant="secondary">
                <Bookmark className="mr-2 h-4 w-4" />
                Save recipe
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Ingredients ingredients={recipe.extendedIngredients} />
            <CookingInstructions instructions={recipe.analyzedInstructions} />
          </div>

          <div>
            <NutritionFacts nutrition={recipe.nutrition} />
          </div>
        </div>
      </main>
    </PageTransition>
  )
}

