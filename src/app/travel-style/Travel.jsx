"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "../../../components/ui/Badge";
import { Users, Heart, Building2, User } from "lucide-react";
import { Carousel } from "../../../components/ui/carousel";
import { useRouter, useSearchParams } from "next/navigation";

// Image imports for the TravelStyle page - Corrected relative paths
import img1 from "../../../public/assets/images/an1 (1).jpeg";
import img2 from "../../../public/assets/images/an1 (10).jpeg";
import img3 from "../../../public/assets/images/an1 (12).jpeg";
import img4 from "../../../public/assets/images/an1 (18).jpeg";
import img5 from "../../../public/assets/images/an1 (15).jpeg";
import img6 from "../../../public/assets/images/an1 (2).jpeg";
import img7 from "../../../public/assets/images/an1 (7).jpeg";
import img8 from "../../../public/assets/images/an1 (9).jpeg";
import img9 from "../../../public/assets/images/an1 (8).jpeg";
import img10 from "../../../public/assets/images/an1 (3).jpeg";
import img11 from "../../../public/assets/images/an1 (4).jpeg";
import img12 from "../../../public/assets/images/an1 (5).jpeg";
import img13 from "../../../public/assets/images/an1 (6).jpeg";
import img14 from "../../../public/assets/images/an1 (11).jpeg";
import img15 from "../../../public/assets/images/an1 (13).jpeg";
import img16 from "../../../public/assets/images/an1 (14).jpeg";
import img17 from "../../../public/assets/images/an1 (16).jpeg";
import img18 from "../../../public/assets/images/an1 (17).jpeg";
import img19 from "../../../public/assets/images/an1 (19).jpeg";

const destinationsByCategory = {
  individual: [
    {
      id: 1,
      slug: "machame-route",
      name: "Kilimanjaro Routes To The Roof Of Africa",
      price: 1800,
      time: "6 Days Trip",
      images: [img1, img1, img1, img1, img1],
    },
    {
      id: 2,
      slug: "into-the-untamed-wilderness",
      name: "Into The Untamed Wilderness",
      price: 854,
      time: "2 Days Trip",
      images: [img2, img2, img2, img2, img2],
    },
    {
      id: 3,
      slug: "the-north-wonders-safari",
      name: "The North Wonders Safari",
      price: 3200,
      time: "6 Days Trip",
      images: [img3, img3, img3, img3, img3],
    },
    {
      id: 4,
      slug: "baobab-lakes-and-craters-safari",
      name: "From Baobab To Big Five",
      price: 1800,
      time: "3 Days Trip",
      images: [img4, img4, img4, img4, img4],
    },
    {
      id: 5,
      slug: "unzip-serengeti-and-ngorongoro",
      name: "Serengeti Roars, Ngorongoro Whispers",
      price: 2100,
      time: "4 Days Trip",
      images: [img5, img5, img5, img5, img5],
    },
    {
      id: 6,
      slug: "where-culture-meet-safari",
      name: "Where Culture Meets Safari",
      price: 1100,
      time: "2 Days Trip",
      images: [img6, img6, img6, img6, img6],
    },
  ],
  groups: [
    {
      id: 7,
      slug: "marangu-route",
      name: "Kilimanjaro Routes To The Roof Of Africa",
      price: 1650,
      time: "5 Days Trip",
      images: [img7, img7, img7, img7, img7],
    },
    {
      id: 8,
      slug: "ultimate-nothern-tanzania-safari",
      name: "Tanzania's Northern Magic, Unfolded",
      price: 4500,
      time: "6 Days Trip",
      images: [img8, img8, img8, img8, img8],
    },
    {
      id: 9,
      slug: "premier-nothern-safari",
      name: "Premier Northern Safari",
      price: 2800,
      time: "5 Days Trip",
      images: [img9, img9, img9, img9, img9],
    },
    {
      id: 10,
      slug: "baobab-lakes-and-craters-safari",
      name: "From Baobab To Big Five",
      price: 1800,
      time: "3 Days Trip",
      images: [img10, img10, img10, img10, img10],
    },
    {
      id: 11,
      slug: "serengeti-roars-ngorongoro-whispers",
      name: "Serengeti Roars, Ngorongoro Whispers",
      price: 1800,
      time: "3 Days Trip",
      images: [img11, img11, img11, img11, img11],
    },
    {
      id: 12,
      slug: "from-city-lights-to-safari-nights",
      name: "From City Lights To Safari Nights",
      price: 1600,
      time: "4 Days Trip",
      images: [img12, img12, img12, img12, img12],
    },
  ],
  family: [
    {
      id: 13,
      slug: "chasing-the-wild",
      name: "Chasing The Wild",
      price: 2500,
      time: "4 Days Trip",
      images: [img13, img13, img13, img13, img13],
    },
    {
      id: 14,
      slug: "mkomazi-national-park",
      name: "Mkomazi National Park",
      price: 506,
      time: "1 Day Trip",
      images: [img14, img14, img14, img14, img14],
    },
    {
      id: 15,
      slug: "from-flamingo-shores-to-crater-floors",
      name: "From Flamingo Shores to Crater Floors",
      price: 1210,
      time: "2 Days Trip",
      images: [img15, img15, img15, img15, img15],
    },
    {
      id: 16,
      slug: "premier-nothern-safari",
      name: "Premier Northern Safari",
      price: 2800,
      time: "5 Days Trip",
      images: [img16, img16, img16, img16, img16],
    },
    {
      id: 17,
      slug: "chasing-the-wild",
      name: "Chasing The Wild",
      price: 2500,
      time: "4 Days Trip",
      images: [img17, img17, img17, img17, img17],
    },
    {
      id: 18,
      slug: "skies-over-the-wild",
      name: "Dar to Drift: A sky safari",
      price: 2100,
      time: "3 Days Trip",
      images: [img18, img18, img18, img18, img18],
    },
  ],
  couples: [
    {
      id: 19,
      slug: "serengeti-roars-ngorongoro-whispers",
      name: "Serengeti Roars, Ngorongoro Whispers",
      price: 1800,
      time: "3 Days Trip",
      images: [img19, img19, img19, img19, img19],
    },
    {
      id: 20,
      slug: "where-the-bush-meets-the-beach",
      name: "where the Bush meets the beach",
      price: 854,
      time: "2 Days Trip",
      images: [img2, img2, img2, img2, img2],
    },
    {
      id: 21,
      slug: "skies-over-the-wild",
      name: "Dar to Drift: A Sky Safari",
      price: 2100,
      time: "3 Days Trip",
      images: [img3, img3, img3, img3, img3],
    },
  ],
  girls: [
    {
      id: 22,
      slug: "into-the-untamed-wilderness",
      name: "Into The Untamed Wilderness",
      price: 854,
      time: "2 Days Trip",
      images: [img4, img4, img4, img4, img4],
    },
    {
      id: 23,
      slug: "bongonyo-island",
      name: "Bongoyo: Island Life Awaits",
      price: 70,
      time: "1 Day Trip",
      images: [img5, img5, img5, img5, img5],
    },
    {
      id: 24,
      slug: "chasing-the-wild",
      name: "Chasing The Wild",
      price: 2500,
      time: "4 Days Trip",
      images: [img6, img6, img6, img6, img6],
    },
  ],
  corporates: [
    {
      id: 25,
      slug: "serengeti-roars-ngorongoro-whispers",
      name: "Serengeti Roars, Ngorongoro Whispers",
      price: 1800,
      time: "3 Days Trip",
      images: [img19, img19, img19, img19, img19],
    },
    {
      id: 26,
      slug: "into-the-untamed-wilderness",
      name: "Into The Untamed Wilderness",
      price: 854,
      time: "2 Days Trip",
      images: [img2, img2, img2, img2, img2],
    },
    {
      id: 27,
      slug: "ultimate-nothern-tanzania-safari",
      name: "Tanzania's Northern Magic, Unfolded",
      price: 4500,
      time: "6 Days Trip",
      images: [img8, img8, img8, img8, img8],
    },
    {
      id: 28,
      slug: "chasing-the-wild",
      name: "Chasing The Wild",
      price: 2500,
      time: "4 Days Trip",
      images: [img13, img13, img13, img13, img13],
    },
    {
      id: 29,
      slug: "into-the-untamed-wilderness",
      name: "Into The Untamed Wilderness",
      price: 854,
      time: "2 Days Trip",
      images: [img4, img4, img4, img4, img4],
    },
    {
      id: 30,
      slug: "serengeti-roars-ngorongoro-whispers",
      name: "Serengeti Roars, Ngorongoro Whispers",
      price: 1800,
      time: "3 Days Trip",
      images: [img5, img5, img5, img5, img5],
    },
  ],
};

const getAllPackagesByCategory = (category) => {
  return destinationsByCategory[category] || [];
};

const categories = [
  "individual",
  "family",
  "groups",
  "girls",
  "couples",
  "corporates",
];

const categoryIcons = {
  individual: User,
  family: Users,
  groups: Users,
  girls: Heart,
  couples: Heart,
  corporates: Building2,
};

const categoryLabels = {
  individual: "Individual",
  family: "Family",
  groups: "Groups",
  girls: "Girls",
  couples: "Couples",
  corporates: "Corporate",
};

export function TravelStyleClientContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "individual"; // Default to 'individual'
  const [activeTab, setActiveTab] = useState(initialTab);

  // Update activeTab if the URL search param changes
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && categories.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    } else if (!tabFromUrl && activeTab !== "individual") {
      // If no tab in URL and current tab is not default, reset to default
      setActiveTab("individual");
    }
  }, [searchParams, activeTab]);

  const handleTabClick = (category) => {
    setActiveTab(category);
    router.push(`/travel-style?tab=${category}`, { scroll: false }); // Update URL without scrolling
  };

  const currentPackages = getAllPackagesByCategory(activeTab);

  return (
    <div className="w-full max-w-7xl relative mx-auto p-6 bg-[#fff9f5]">
      {/* Header */}
      <div className="text-center mb-8">
        {activeTab === "family" && (
          <>
            <h1 className="md:text-5xl text-2xl mt-9 font-light mb-2 text-gray-800 md:py-9">
              Family Fun Starts With Us 🌍✨
            </h1>
          </>
        )}
        {activeTab === "groups" && (
          <>
            <h1 className="md:text-5xl text-2xl mt-9 font-light mb-2 text-gray-800 md:py-9">
              Group Escapes, Great Memories 🌍✨
            </h1>
          </>
        )}
        {activeTab === "girls" && (
          <>
            <h1 className="md:text-5xl text-2xl mt-9 font-light mb-2 text-gray-800 md:py-9">
              Unforgettable Getaways for the Soul Sisters 🌍✨
            </h1>
          </>
        )}
        {activeTab === "individual" && (
          <>
            <h1 className="md:text-5xl text-2xl mt-9 font-light mb-2 text-gray-800 md:py-9">
              Tailored Individual Packages 🌍✨
            </h1>
          </>
        )}
        {activeTab === "couples" && (
          <>
            <h1 className="md:text-5xl text-2xl mt-9 font-light mb-2 text-gray-800 md:py-9">
              Two Hearts, One Journey 🌍✨
            </h1>
          </>
        )}
        {activeTab === "corporates" && (
          <>
            <h1 className="md:text-5xl text-2xl mt-9 font-light mb-2 text-gray-800 md:py-9">
              Corporate Retreats Starts With Us 🌍✨
            </h1>
          </>
        )}
        <p className="md:text-lg text-gray-600 max-w-2xl mx-auto md:mb-4">
          Discover Tanzania's incredible destinations tailored to your unique
          travel preferences and group type.
        </p>
      </div>
      {/* Tab Navigation */}
      <div className="border-b bg-[#fff9f5] border-gray-200 sticky md:top-[72px] top-20 z-10 md:border-none pt-2 md:shadow-xl md:rounded-full md:my-9 md:mt-16 pb-3 md:pb-2 mb-6 md:px-5 w-full">
        <div className="relative">
          {/* Gradient overlays for scroll indication */}
          <div className="absolute left-0 top-0 md:hidden bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 md:hidden w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          {/* Scrollable container */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 md:justify-between min-w-max px-2 py-1 md:items-center">
              {categories.map((category) => {
                const IconComponent = categoryIcons[category];
                return (
                  <button
                    key={category}
                    onClick={() => handleTabClick(category)}
                    className={`flex items-center gap-2 md:px-6 px-3 md:py-1 py-1 rounded-full font-medium transition-all duration-200 ${
                      activeTab === category
                        ? "bg-slate-900 text-white shadow-md"
                        : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {categoryLabels[category]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Packages Grid */}
      <div className="grid md:px-7 px-0 relative z-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPackages.map((packageItem) => (
          <Link
            key={packageItem.id}
            href={`/routes/${packageItem.slug}`}
            className="block"
          >
            <div className="overflow-hidden transition-shadow duration-300 cursor-pointer">
              <div className="relative md:h-80 h-60 w-full">
                <Carousel
                  images={packageItem.images}
                  alt={packageItem.name}
                  className="rounded-3xl"
                />
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-slate-800 text-white">
                    {packageItem.time}
                  </Badge>
                </div>
              </div>
              <div className="pt-2">
                <h3 className="lg:text-lg font-semibold text-gray-900 mb-1">
                  {packageItem.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  <span className="font-bold">${packageItem.price}</span>/per
                  person
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Category Description */}
      <div className="mt-12 relative z-0 text-center bg-[#cf5622] md:w-[80%] md:mx-auto p-8 rounded-2xl">
        <div className="max-w-3xl mx-auto">
          {activeTab === "individual" && (
            <>
              <h3 className="text-2xl font-bold text-white/80 mb-4">
                Individual Adventures
              </h3>
              <p className="text-white/90">
                Perfect for solo travelers seeking personal discovery and
                freedom. Enjoy flexible schedules, private guides, and the
                ultimate safari experience tailored just for you.
              </p>
            </>
          )}
          {activeTab === "family" && (
            <>
              <h3 className="text-2xl font-bold text-white/80 mb-4">
                Family Safaris
              </h3>
              <p className="text-white/90">
                Create unforgettable memories with your loved ones. Our family
                packages include educational programs, child-friendly
                activities, and safe environments for all ages.
              </p>
            </>
          )}
          {activeTab === "groups" && (
            <>
              <h3 className="text-2xl font-bold text-white/80 mb-4">
                Group Adventures
              </h3>
              <p className="text-white/90">
                Share the excitement with friends and fellow travelers. Enjoy
                group discounts, shared experiences, and the camaraderie of
                exploring Tanzania together.
              </p>
            </>
          )}
          {activeTab === "girls" && (
            <>
              <h3 className="text-2xl font-bold text-white/80 mb-4">
                Girls Getaways
              </h3>
              <p className="text-white/90">
                Empowering adventures designed for women. Experience cultural
                immersion, wellness activities, and the support of like-minded
                female travelers.
              </p>
            </>
          )}
          {activeTab === "couples" && (
            <>
              <h3 className="text-2xl font-bold text-white/80 mb-4">
                Romantic Escapes
              </h3>
              <p className="text-white/90">
                Celebrate your love in Africa's most romantic settings. Enjoy
                private accommodations, sunset dinners, and intimate moments in
                Tanzania's stunning landscapes.
              </p>
            </>
          )}
          {activeTab === "corporates" && (
            <>
              <h3 className="text-2xl font-bold text-white/80 mb-4">
                Corporate Retreats
              </h3>
              <p className="text-white/90">
                Combine business with adventure. Our corporate packages include
                team building activities, conference facilities, and unique
                networking opportunities in the wild.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
