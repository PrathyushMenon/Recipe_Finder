import { render, screen } from "@testing-library/react"
import { Navbar } from "./navbar"

// Mock usePathname hook
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

describe("Navbar Component", () => {
  it("renders the logo and navigation links", () => {
    render(<Navbar />)

    // Check if the logo text is rendered
    expect(screen.getByText("Recipe Finder")).toBeInTheDocument()

    // Check if navigation links are rendered
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Categories")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("Contact")).toBeInTheDocument()
  })
})

