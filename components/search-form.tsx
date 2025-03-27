"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Search, ChevronRight } from "lucide-react"

interface SearchFormProps {
  searchAction: (ingredients: string) => Promise<{ id: number }[]>
}

export function SearchForm({ searchAction }: SearchFormProps) {
  const [ingredients, setIngredients] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recipes, setRecipes] = useState<{ id: number }[]>([])
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const results = await searchAction(ingredients)
      setRecipes(results)

      if (results.length === 0) {
        setError("No recipes found with those ingredients. Try adding more ingredients or using different ones.")
      } else if (results.length === 1) {
        // If only one recipe is found, redirect to its details page
        router.push(`/recipes/${results[0].id}`)
      }
    } catch (err) {
      setError("Failed to search recipes. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <motion.form onSubmit={handleSubmit} className="space-y-4" variants={itemVariants}>
        <motion.div variants={itemVariants}>
          <label htmlFor="ingredients" className="block text-sm font-medium mb-2">
            Enter ingredients you have (separated by commas)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              id="ingredients"
              placeholder="e.g., chicken, rice, onions"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="pl-10 pr-20"
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button type="submit" disabled={isLoading} size="sm" className="mr-1 rounded-l-none">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    Find Recipes
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">For best results, enter at least 3 ingredients</p>
        </motion.div>
      </motion.form>

      {error && (
        <motion.div
          className="p-4 bg-destructive/10 text-destructive rounded-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}

      {recipes.length > 1 && (
        <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h2 className="text-xl font-semibold" variants={itemVariants}>
            Found {recipes.length} recipes
          </motion.h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" variants={itemVariants}>
            {recipes.map((recipe) => (
              <motion.div key={recipe.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  onClick={() => router.push(`/recipes/${recipe.id}`)}
                  className="h-auto py-3 justify-start w-full"
                >
                  View Recipe #{recipe.id}
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

