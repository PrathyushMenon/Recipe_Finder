import { render, screen } from "@testing-library/react"
import { RecipeCard } from "./recipe-card"

// Mock recipe data
const mockRecipe = {
  id: 1,
  title: "Test Recipe",
  image: "/placeholder.svg",
  readyInMinutes: 30,
  servings: 4,
  summary: "This is a test recipe summary",
}

describe("RecipeCard Component", () => {
  it("renders recipe information correctly", () => {
    render(<RecipeCard recipe={mockRecipe} />)

    // Check if the title is rendered
    expect(screen.getByText("Test Recipe")).toBeInTheDocument()

    // Check if cooking time is rendered
    expect(screen.getByText("30 min")).toBeInTheDocument()

    // Check if the View Recipe button is rendered
    expect(screen.getByText("View Recipe")).toBeInTheDocument()
  })
})

