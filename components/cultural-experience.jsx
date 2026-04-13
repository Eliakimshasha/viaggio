import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import Image from "next/image"

export default function Experience({ experience }) {
  const isDsmExperience = experience.name === "DSM Experience"
  const href = isDsmExperience ? "/dsm-experiences" : `/experiences/${experience.id}`

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{experience.name}</CardTitle>
        <CardDescription>{experience.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        {experience.image && (
          <Image
            alt={experience.name}
            className="mb-4 rounded-md object-cover w-full h-48"
            src={experience.image || "/placeholder.svg"}
            style={{
              aspectRatio: "400/200",
              objectFit: "cover",
            }}
          />
        )}
        <div className="mt-auto">
          <Link href={href} passHref>
            <Button className="w-full">{isDsmExperience ? "View DSM Experiences" : "View Details"}</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
