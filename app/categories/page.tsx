import { PageTransition } from "@/components/page-transition"

export default function CategoriesPage() {
  const categories = [
    { name: "Breakfast", image: "/placeholder.svg?height=200&width=300" },
    { name: "Lunch", image: "/placeholder.svg?height=200&width=300" },
    { name: "Dinner", image: "/placeholder.svg?height=200&width=300" },
    { name: "Desserts", image: "/placeholder.svg?height=200&width=300" },
    { name: "Vegetarian", image: "/placeholder.svg?height=200&width=300" },
    { name: "Vegan", image: "/placeholder.svg?height=200&width=300" },
    { name: "Gluten-Free", image: "/placeholder.svg?height=200&width=300" },
    { name: "Quick & Easy", image: "/placeholder.svg?height=200&width=300" },
  ]

  return (
    <PageTransition>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Recipe Categories</h1>
          <p className="text-lg text-muted-foreground">
            Browse recipes by category to find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg aspect-[4/3] group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 z-10" />
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-white text-xl font-semibold">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </PageTransition>
  )
}

