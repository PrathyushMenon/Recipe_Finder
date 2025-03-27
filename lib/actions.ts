"use server"

import { searchRecipesByIngredients as searchApi } from "./api"

/**
 * Server action to search for recipes by ingredients
 */
export async function searchRecipesByIngredients(ingredients: string) {
  try {
    const recipes = await searchApi(ingredients)
    return recipes.map((recipe) => ({ id: recipe.id }))
  } catch (error) {
    console.error("Error in searchRecipesByIngredients action:", error)
    throw new Error("Failed to search recipes")
  }
}

