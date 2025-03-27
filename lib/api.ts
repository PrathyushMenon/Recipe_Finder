import type { Recipe } from "./types"

const API_KEY = process.env.SPOONACULAR_API_KEY
const BASE_URL = "https://api.spoonacular.com"

/**
 * Fetches random recipes from the Spoonacular API
 */
export async function getRandomRecipes(number = 6): Promise<Recipe[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/random?apiKey=${API_KEY}&number=${number}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data.recipes
  } catch (error) {
    console.error("Error fetching random recipes:", error)
    return []
  }
}

/**
 * Fetches detailed information about a specific recipe
 */
export async function getRecipeDetails(id: number): Promise<Recipe | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`,
      { next: { revalidate: 86400 } }, // Cache for 24 hours
    )

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`API returned ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching recipe details for ID ${id}:`, error)
    return null
  }
}

/**
 * Searches for recipes by ingredients
 */
export async function searchRecipesByIngredients(ingredients: string): Promise<Recipe[]> {
  try {
    const formattedIngredients = ingredients
      .split(",")
      .map((i) => i.trim())
      .join(",+")

    const response = await fetch(
      `${BASE_URL}/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${formattedIngredients}&number=10&ranking=1&ignorePantry=false`,
      { cache: "no-store" }, // Don't cache search results
    )

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error searching recipes by ingredients:", error)
    return []
  }
}

