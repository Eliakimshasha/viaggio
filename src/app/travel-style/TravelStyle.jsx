"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import img6 from "../../../public/assets/images/an1 (2).jpeg"
import img7 from "../../../public/assets/images/an1 (7).jpeg"
import img8 from "../../../public/assets/images/an1 (9).jpeg"
import img9 from "../../../public/assets/images/an1 (18).jpeg"
import img10 from "../../../public/assets/images/an1 (3).jpeg"
import img11 from "../../../public/assets/images/an1 (4).jpeg"
import img12 from "../../../public/assets/images/an1 (5).jpeg"
import img13 from "../../../public/assets/images/an1 (6).jpeg"
import img1 from "../../../public/assets/images/an1 (1).jpeg"
import img2 from "../../../public/assets/images/an1 (10).jpeg"
import img4 from "../../../public/assets/images/an1 (18).jpeg"
import img14 from "../../../public/assets/images/an1 (11).jpeg"
import img15 from "../../../public/assets/images/an1 (13).jpeg"
import img16 from "../../../public/assets/images/an1 (14).jpeg"
import img17 from "../../../public/assets/images/an1 (16).jpeg"
import img18 from "../../../public/assets/images/an1 (17).jpeg"
import img19 from "../../../public/assets/images/an1 (19).jpeg"
import img5 from "../../../public/assets/images/an1 (15).jpeg"

import Link from "next/link";
import { duration } from "@mui/material";

const adventureTypes = [
  {
    id: "family",
    name: "Family Adventures",
    href: "/family-adventures",
    images: [
      {
        id: "chasing-the-wild",
        src: img6,
        alt: "Family safari adventure",
       title: "Chasing The Wild",
      price: "$2500 / person",
      duration: "4 Days Trip",
      },
      {
        id: "mkomazi-national-park",
        src: img7,
        alt: "Family mountain adventure",
        title: "Mkomazi National Park",
      price: "$506 / person",
      duration: "1 Day Trip",
      },
      {
        id: "from-flamingo-shores-to-crater-floors",
        src: img8,
        alt: "Family camping adventure",
        title: "From Flamingo Shores to Crater Floors",
      price: "$1210 / person",
      duration: "2 Days Trip",
      },
    ],
  },
  {
    id: "couples", // Corrected to match home page categories
    name: "Couple Adventures",
    href: "/couple-adventures",
    images: [
      {
        id: "serengeti-roars-ngorongoro-whispers",
        src: img9,
        alt: "Romantic sunset adventure",
        title: "Serengeti Roars, Ngorongoro Whispers",
      price: "$1800 / person",
      duration: "3 Days Trip",
      },
      {
        id: "where-the-bush-meets-the-beach",
        src: img10,
        alt: "Couple hiking adventure",
        title: "where the Bush meets the beach",
      price: "$854 / person",
      duration: "2 Days Trip",
      },
      {id:"skies-over-the-wild",
        src: img11,
        alt: "Couple beach adventure",
        title: "Dar to Drift: A Sky Safari",
      price: "$2100 / person",
      duration: "3 Days Trip",
      },
    ],
  },
  {
    id: "groups", // Corrected to match home page categories
    name: "Group Adventures",
    href: "/group-adventures",
    images: [
      {
        id: "marangu-route",
        src: img12,
        alt: "Group safari adventure",
         title: "Kilimanjaro Routes To The Roof Of Africa",
      price: "$1650 / person",
      duration: "6 Days Trip",
      },
      {id:"ultimate-nothern-tanzania-safari",
        src: img13,
        alt: "Group camping adventure",
        title: "Tanzania's Northern Magic, Unfolded",
      price: "$4500 / person",
      duration: "6 Days Trip",
      },
      {
        id: "premier-northern-safari",
        src: img14,
        alt: "Group hiking adventure",
        title: "Premier Northern Safari",
      price: "$2800 / person",
      duration: "5 Days Trip",
      },
    ],
  },
  {
    id: "girls",
    name: "Girls Adventures",
    href: "/girls-adventures",
    images: [
      {id:"into-the-untamed-wilderness",
        src: img15,
        alt: "Girls safari adventure",
        title: "Into The Untamed Wilderness",
      price: "$854 / person",
      duration: "2 Days Trip",
      },
      {
        id: "bongoyo-island",
        src: img16,
        alt: "Girls beach adventure",
        title: "Bongoyo: Island Life Awaits",
      price: "$70 / person",
      duration: "1 Day Trip",
      },
      {
        id: "chasing-the-wild",
        src: img17,
        alt: "Girls cultural adventure",
        title: "Chasing The Wild",
      price: "$2500 / person",
      duration: "4 Days Trip",
      },
    ],
  },
  {
    id: "individual",
    name: "Individual Adventures",
    href: "/individual-adventures",
    images: [
      {id:"into-the-untamed-wilderness",
        src: img18,
        alt: "Solo safari adventure",
        title: "Into The Untamed Wilderness",
      price: "$854 / person",
      duration: "2 Days Trip",
      },
      {
        id: "the-north-wonders-safari",
        src: img19,
        alt: "Solo hiking adventure",
        title: "The North Wonders Safari",
      price: "$3200 / person",
      duration: "6 Days Trip",
      },
      {
        id: "baobab-lakes-and-craters-safari",
        src: img5,
        alt: "Solo cultural adventure",
        title: "From Baobab To Big Five",
      price: "$1800 / person",
      duration: "3 Days Trip",
      },
    ],
  },
  {
    id: "corporates",
    name: "Corporates Adventures",
    href: "/corporates-adventures",
    images: [
      {id:"serengeti-roars-ngorongoro-whispers",
        src: img1,
        alt: "Corporate team building safari",
        title: "Serengeti Roars, Ngorongoro Whispers",
      price: "$1800 / person",
      duration: "3 Days Trip",
      },
      {id:"into-the-untamed-wilderness",
        src: img2,
        alt: "Corporate retreat adventure",
       title: "Into The Untamed Wilderness",
      price: "$854 / person",
      duration: "2 Days Trip",
      },
      {id:"ultimate-nothern-tanzania-safari",
        src: img13,
        alt: "Corporate conference adventure",
        title: "Tanzania's Northern Magic, Unfolded ",
      price: "$4500 / person",
      duration: "6 Days Trip",
      },
    ],
  },
];

export default function TravelShowcase() {

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % adventureTypes.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentAdventure = adventureTypes[activeIndex];

  return (
    <div className="min-h-[640px] bg-green-506/60 h-fit p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-1  items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8 md:w-[60%]">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find Your Perfect Travel Style
              </h1>
            </div>

            {/* Adventure Types */}
            <div className="space-y-3">
              {adventureTypes.map((adventure, index) => (
                <Link
                  key={adventure.id}
                  href={`/travel-style?tab=${adventure.id}`}
                  className={`block text-2xl md:text-3xl font-bold transition-all duration-500 hover:text-[#bf895a] ${
                    index === activeIndex
                      ? "text-[#F4A460] opacity-100"
                      : "text-black opacity-7"
                  }`}
                >
                  {adventure.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - Images Grid */}
          <div className="grid grid-cols-2 gap-4 md:h-[600px] relative overflow-hidden h-[400px]">
            {/* Left Column - Two Small Images Stacked */}
            <div className="flex flex-col gap-4 h-[400px] md:h-[600px]">
              {/* First Image */}
              <Link href={`/routes/${currentAdventure.images[0].id}`} className="relative group rounded-2xl flex-1 overflow-hidden">
                <Image
                  src={currentAdventure.images[0].src || "/placeholder.svg"}
                  alt={currentAdventure.images[0].alt}
                  width={300}
                  height={280}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />
                <div className="absolute md:top-4 top-2 md:left-4 left-2">
                  <span className="bg-white/90 backdrop-blur-sm px-3 md:py-1 py-[2px] rounded-full md:text-sm text-xs font-medium text-gray-700">
                    {currentAdventure.images[0].duration}
                  </span>
                </div>
                <div className="absolute bottom-0 w-full left-0">
                  <div className="bg-white/20 backdrop-blur-md  p-3 text-white">
                    <h3 className="font-semibold text-sm mb-1 hidden md:block">
                      {currentAdventure.images[0].title}
                    </h3>
                    <p className="text-xs opacity-90">
                      {currentAdventure.images[0].price}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Second Image */}
              <Link href={`/routes/${currentAdventure.images[1].id}`} className="relative group overflow-hidden rounded-2xl flex-1">
                <Image
                  src={currentAdventure.images[1].src || "/placeholder.svg"}
                  alt={currentAdventure.images[1].alt}
                  width={300}
                  height={280}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />
                <div className="absolute md:top-4 top-2 md:left-4 left-2">
                  <span className="bg-white/90 backdrop-blur-sm px-3 md:py-1 py-[2px] rounded-full md:text-sm text-xs font-medium text-gray-700">
                    {currentAdventure.images[1].duration}
                  </span>
                </div>
                <div className="absolute bottom-0 w-full left-0">
                  <div className="bg-white/20 backdrop-blur-md  p-3 text-white">
                    <h3 className="font-semibold text-sm mb-1 hidden md:block">
                      {currentAdventure.images[1].title}
                    </h3>
                    <p className="text-xs opacity-90">
                      {currentAdventure.images[1].price}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Column - Large Image */}
            <Link href={`/routes/${currentAdventure.images[2].id}`} className="group rounded-2xl md:h-[600px] relative overflow-hidden h-[400px]">
              <Image
                src={currentAdventure.images[2].src || "/placeholder.svg"}
                alt={currentAdventure.images[2].alt}
                width={400}
                height={600}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
              />
              <div className="absolute md:top-4 top-2 md:left-4 left-2">
                <span className="bg-white/90 backdrop-blur-sm px-3 md:py-1 py-[2px] rounded-full md:text-sm text-xs font-medium text-gray-700">
                  {currentAdventure.images[2].duration}
                </span>
              </div>
              <div className="absolute bottom-0 w-full left-0">
                <div className="bg-white/20 backdrop-blur-md  p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1 hidden md:block">
                    {currentAdventure.images[2].title}
                  </h3>
                  <p className="text-sm opacity-90">
                    {currentAdventure.images[2].price}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}