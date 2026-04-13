"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { routeData } from "../components/data/routeData"; // Import routeData object
import BookingCard from "./booking-card";
import { CiGrid41 } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function DsmExperienceTabs() {
  const router = useRouter()
  // Use the keys from routeData for Football and Cycling experiences
  const footballExperienceData = routeData["dsm-experience"];
  const cyclingExperienceData = routeData["cycling-experience"];
const navigateToGallery = ()=>{
  router.push('/gallery')
}
  const [contentTabValue, setContentTabValue] = useState(0);

  if (!footballExperienceData || !cyclingExperienceData) {
    return (
      <div className="text-center text-red-500">Experience data not found.</div>
    );
  }

  return (
    <Tabs defaultValue="football" className="w-full  max-w-7xl mx-auto ">
      <div className="border-b-1 border-gray-300  md:mb-20 pb-4 md:mt-6">
        <TabsList className="flex items-center md:py-7 md:px-3  bg-gray-50  w-fit mx-auto rounded-full ">
          <TabsTrigger
            value="football"
            className="py-2 text-gray-600 rounded-full text-md w-fit px-9"
            onClick={() => setContentTabValue(0)}
          >
            {footballExperienceData.name}
          </TabsTrigger>
          <TabsTrigger
            value="cycling"
            className="py-2 text-gray-600 rounded-full text-md w-fit px-9"
            onClick={() => setContentTabValue(0)}
          >
            {cyclingExperienceData.name}
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="football" className="md:px-6">
        <div className="flex flex-col gap-6">
          {/* Header and Description with Booking Card */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
            {/* Header and Description Container */}
            <div className="flex-1">
              <div className="flex items-center gap-8">
                <p className="text-white  bg-[#78D8FF]  md:px-5 px-6 rounded-full leading-relaxed mb-8 max-w-4xl md:leading-[40px] md:text-lg">
                  {footballExperienceData.duration}
                </p>
              </div>
              <p className="text-black leading-relaxed mb-8 max-w-4xl md:leading-[40px] md:text-lg">
                {footballExperienceData.description}
              </p>
              {/* Button below the image */}
              <div className=" mt-4 ">
                <button onClick={navigateToGallery} className="text-white bg-[#946626] hover:bg-[#7a4f1f]  px-6 py-3 w-full md:w-auto rounded-2xl flex items-center justify-center md:justify-normal gap-2 transition-all duration-200 text-sm">
                  <CiGrid41 size={22} />
                  <span className="whitespace-nowrap text-xl">
                    View the Gallery
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Booking Card */}
            <BookingCard
              experienceId={"dsm-experience"} // Use the key from routeData
              experienceName={footballExperienceData.name}
              duration={footballExperienceData.duration}
              pricing={`${footballExperienceData.pricing}`}
              isFootball={true}
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="cycling">
        <div className="flex flex-col gap-6">
          {/* Header and Description with Booking Card */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
            {/* Header and Description Container */}
            <div className="flex-1">
              <div className="flex items-center gap-8">
                <p className="text-white bg-[#F4A460] md:px-5 px-6 rounded-full leading-relaxed mb-8 max-w-4xl md:leading-[40px] md:text-lg">
                  {cyclingExperienceData.duration}
                </p>
                <p className="text-white bg-gray-800 md:px-6 md:rounded-full leading-relaxed mb-8 max-w-4xl md:leading-[40px] md:text-lg">
                  {cyclingExperienceData.whiteBg}
                </p>
              </div>
              <p className="text-black leading-relaxed mb-8 max-w-4xl md:leading-[40px] md:text-lg">
                {cyclingExperienceData.description}
              </p>
            </div>

            {/* Booking Card */}
            <BookingCard
              experienceId={"cycling-experience"} // Use the key from routeData
              experienceName={cyclingExperienceData.name}
              duration={cyclingExperienceData.duration}
              pricing={cyclingExperienceData.pricing}
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
