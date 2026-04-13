"use client"

import React, { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { routeData } from "../components/data/routeData" // Import routeData object
import BookingCard from "./booking-card"
import ExperienceContentDisplay from "./experience-content-display"


export default function DsmExperienceTabs() {
  // Use the keys from routeData for Football and Cycling experiences
  const whereCulture = routeData["where-culture-meet-safari"]
  const exploringCulture = routeData["exploring-culture-and-wildlife"]

const getContentTabs = (experience) => {
    const tabs = []
    if (experience.showTabDescription !== false) {
      tabs.push("Description")
    }
    tabs.push("Itinerary")
    if (experience.showPriceTab !== false) {
      tabs.push("Price")
    }
    tabs.push("Inclusion")
    tabs.push("Exclusion")
    return tabs
  }
  const footballContentTabs = getContentTabs(whereCulture)
  const cyclingContentTabs = getContentTabs(exploringCulture)

  

  const [contentTabValue, setContentTabValue] = useState(0)

  if (!whereCulture || !exploringCulture) {
    return <div className="text-center text-red-500">Experience data not found.</div>
  }





  return (
    <Tabs defaultValue="football" className="w-full  max-w-7xl mx-auto ">
      <div className="border-b-1 border-gray-300  md:mb-20 pb-4 md:mt-6">
         <TabsList className="flex items-center md:py-7 md:px-3  bg-gray-50  w-fit mx-auto rounded-full ">
        <TabsTrigger value="football" className='py-2 text-gray-600 rounded-full text-md w-fit px-9' onClick={() => setContentTabValue(0)}>
          {whereCulture.name}
        </TabsTrigger>
        <TabsTrigger value="cycling" className='py-2 text-gray-600 rounded-full text-md w-fit px-9' onClick={() => setContentTabValue(0)}>
          {exploringCulture.name}
        </TabsTrigger>
      </TabsList>
      </div>
     

      <TabsContent value="football" className='md:px-6'>
        <div className="flex flex-col gap-6">
          {/* Header and Description with Booking Card */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
            {/* Header and Description Container */}
            <div className="flex-1">
              <div className="flex items-center gap-8">
                <p className="text-white  bg-[#78D8FF]  md:px-5 px-6 rounded-full leading-relaxed mb-8 max-w-4xl md:leading-[40px] md:text-lg">
                  {whereCulture.blackBg} 
                </p> 
                
              </div>
              <p className="text-black leading-relaxed mb-8 max-w-4xl md:leading-[40px] md:text-lg">
                {whereCulture.description}
              </p>
            </div>
            
            {/* Booking Card */}
            <BookingCard
              experienceId={"dsm-experience"} // Use the key from routeData
              experienceName={whereCulture.name}
              duration={whereCulture.duration}
              pricing={whereCulture.pricing}
             
            />
          </div>

           {/* Itinerary Navigation and Content */}
          <div className="w-full">
            <div className="border-b border-gray-200 md:border-none md:pt-2 md:bg-white md:shadow-xl md:rounded-full md:my-9 md:mt-16 pb-3 md:pb-2 mb-6 md:px-5 w-full">
              <div className="relative">
                <div className="absolute left-0 top-0 md:hidden bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 md:hidden w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-2 md:justify-between min-w-max px-2 py-1 md:items-center">
                    {footballContentTabs.map((tab, index) => (
                      <button
                        key={index}
                        onClick={() => setContentTabValue(index)}
                        className={`px-6 md:px-14 py-1 text-base font-medium rounded-full transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                          contentTabValue === index
                            ? "bg-gray-800 text-white shadow-lg transform scale-105"
                            : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <ExperienceContentDisplay
              experience={whereCulture}
              contentTabValue={contentTabValue}
              contentTabs={footballContentTabs}
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
                  {exploringCulture.blackBg} 
                </p> 
                <p className="text-white bg-gray-800 md:px-6 md:rounded-full leading-relaxed mb-8 max-w-4xl md:leading-[40px] md:text-lg">
                  
                </p>
              </div>
              <p className="text-black leading-relaxed mb-8 max-w-4xl md:leading-[40px] md:text-lg">
                {exploringCulture.description}
              </p>
            </div>
            
            {/* Booking Card */}
            <BookingCard
              experienceId={"cycling-experience"} // Use the key from routeData
              experienceName={exploringCulture.name}
              duration={exploringCulture.duration}
              pricing={exploringCulture.pricing}
            />
          </div>

          {/* Itinerary Navigation and Content */}
          <div className="w-full">
            <div className="border-b border-gray-200 md:border-none md:pt-2 md:bg-white md:shadow-xl md:rounded-full md:my-9 md:mt-16 pb-3 md:pb-2 mb-6 md:px-5 w-full">
              <div className="relative">
                <div className="absolute left-0 top-0 md:hidden bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 md:hidden w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-2 md:justify-between min-w-max px-2 py-1 md:items-center">
                    {cyclingContentTabs.map((tab, index) => (
                      <button
                        key={index}
                        onClick={() => setContentTabValue(index)}
                        className={`px-6 md:px-14 py-1 text-base font-medium rounded-full transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                          contentTabValue === index
                            ? "bg-gray-800 text-white shadow-lg transform scale-105"
                            : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <ExperienceContentDisplay
              experience={exploringCulture}
              contentTabValue={contentTabValue}
              contentTabs={cyclingContentTabs}
            />
          </div>
        
        </div>
      </TabsContent>
    </Tabs>
  )
}