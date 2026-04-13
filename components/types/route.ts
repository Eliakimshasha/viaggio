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
