// Utility functions for destination handling

export const createDestinationSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export const getDisplayName = (slug: string): string => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const getDestinationKeywords = (destinationName: string): string[] => {
  const name = destinationName.toLowerCase()
  const keywordMap: { [key: string]: string[] } = {
    serengeti: ["serengeti"],
    ngorongoro: ["ngorongoro", "crater"],
    tarangire: ["tarangire"],
    "lake manyara": ["manyara", "lake manyara"],
    manyara: ["manyara", "lake manyara"],
    bongonyo: ["bongonyo", "island"],
    bongoyo: ["bongoyo", "bongonyo", "island"], // Alternative spelling
    mkomazi: ["mkomazi"],
    saadani: ["saadani"],
    nyerere: ["nyerere", "selous"],
    mikumi: ["mikumi"],
    sinda: ["sinda", "island"],
    arusha: ["arusha"],
    pugu: ["pugu", "hills"],
    kilimanjaro: ["kilimanjaro", "machame", "lemosho", "rongai", "marangu", "umbwe", "shira", "northern circuit"],
    meru: ["meru", "mount meru"],
  }

  // Find matching keywords
  for (const [key, keywords] of Object.entries(keywordMap)) {
    if (name.includes(key)) {
      return keywords
    }
  }

  // Fallback: extract main word and handle "national park" suffix
  const cleanName = name.replace(/national park|island|hills/g, "").trim()
  return [cleanName.split(" ")[0]]
}

// Updated function to only consider route key and whiteBg
export const getRelatedRoutes = (destinationName: string, routeData: any) => {
  const keywords = getDestinationKeywords(destinationName)

  return Object.entries(routeData).filter(([routeKey, route]: [string, any]) => {
    // Only search in route key and whiteBg
    const searchText = [routeKey, route.whiteBg || ""].join(" ").toLowerCase()

    // Check if ANY keyword appears as a whole word (not just substring)
    return keywords.some((keyword) => {
      // Use word boundary regex to match whole words only
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i")
      return regex.test(searchText)
    })
  })
}

// Route type definitions
export interface RoutePricing {
  group: string
  price: number
}

export interface RouteData {
  name: string
  duration: string
  description: string
  image: string
  difficulty: string
  success_rate: string
  pricing: RoutePricing[]
  tabDescription?: string
  whiteBg?: string
  blackBg?: string
  // Add other properties that might exist in your actual route data
  [key: string]: any // For any additional dynamic properties
}

export type RouteDataCollection = Record<string, RouteData>
