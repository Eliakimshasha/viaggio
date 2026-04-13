import { Suspense } from "react"
import { TravelStyleClientContent } from "./Travel"
import Loading from "./Loading"
export default function TravelStylePage() {
  return (
    <Suspense fallback={<Loading />}>
      <TravelStyleClientContent />
    </Suspense>
  )
}
