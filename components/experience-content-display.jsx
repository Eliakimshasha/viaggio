"use client";

import Image from "next/image";
import {
  Users,
  Plane,
  Navigation,
  DollarSign,
  Home,
  FileText,
} from "lucide-react";

// Import all images from route-data.jsx as they are referenced in itinerary
import distance from "../public/assets/images/distance.png";
import machame1 from "../public/assets/images/machame (1).png";
import machame2 from "../public/assets/images/machame (2).png";
import machame3 from "../public/assets/images/machame (3).png";
import machame4 from "../public/assets/images/machame (4).png";
import machame5 from "../public/assets/images/machame (5).png";
import machame6 from "../public/assets/images/machame (6).png";
import machame7 from "../public/assets/images/machame7 (1).png";
import machame8 from "../public/assets/images/machame7 (2).png";
import machame9 from "../public/assets/images/machame7 (3).png";
import machame10 from "../public/assets/images/machame7 (4).png";
import machame11 from "../public/assets/images/machame7 (5).png";
import machame12 from "../public/assets/images/machame7 (6).png";
import machame13 from "../public/assets/images/machame7 (7).png";
import lemosho1 from "../public/assets/images/lemosho7 (1).png";
import lemosho2 from "../public/assets/images/lemosho7 (2).png";
import lemosho3 from "../public/assets/images/lemosho7 (3).png";
import lemosho4 from "../public/assets/images/lemosho7 (4).png";
import lemosho5 from "../public/assets/images/lemosho7 (5).png";
import lemosho6 from "../public/assets/images/lemosho7 (6).png";
import lemosho7 from "../public/assets/images/lemosho7 (7).png";
import lemosho8 from "../public/assets/images/lemosho8 (1).png";
import lemosho9 from "../public/assets/images/lemosho8 (2).png";
import lemosho10 from "../public/assets/images/lemosho8 (3).png";
import lemosho11 from "../public/assets/images/lemosho8 (4).png";
import lemosho12 from "../public/assets/images/lemosho8 (5).png";
import lemosho13 from "../public/assets/images/lemosho8 (6).png";
import lemosho14 from "../public/assets/images/lemosho8 (7).png";
import lemosho15 from "../public/assets/images/lemosho8 (8).png";
import marangu1 from "../public/assets/images/marangu5 (1).png";
import marangu2 from "../public/assets/images/marangu5 (2).png";
import marangu3 from "../public/assets/images/marangu5 (3).png";
import marangu4 from "../public/assets/images/marangu5 (4).png";
import marangu5 from "../public/assets/images/marangu5 (5).png";
import marangu6 from "../public/assets/images/marangu6 (1).png";
import marangu7 from "../public/assets/images/marangu6 (2).png";
import marangu8 from "../public/assets/images/marangu6 (3).png";
import marangu9 from "../public/assets/images/marangu6 (4).png";
import marangu10 from "../public/assets/images/marangu6 (5).png";
import marangu11 from "../public/assets/images/marangu6 (6).png";
import rongai1 from "../public/assets/images/rongai6 (1).png";
import rongai2 from "../public/assets/images/rongai6 (2).png";
import rongai3 from "../public/assets/images/rongai6 (3).png";
import rongai4 from "../public/assets/images/rongai6 (4).png";
import rongai5 from "../public/assets/images/rongai6 (5).png";
import rongai6 from "../public/assets/images/rongai6 (6).png";
import rongai7 from "../public/assets/images/rongai7 (1).png";
import rongai8 from "../public/assets/images/rongai7 (2).png";
import rongai9 from "../public/assets/images/rongai7 (3).png";
import rongai10 from "../public/assets/images/rongai7 (4).png";
import rongai11 from "../public/assets/images/rongai7 (5).png";
import rongai12 from "../public/assets/images/rongai7 (6).png";
import rongai13 from "../public/assets/images/rongai7 (7).png";
import umbwe1 from "../public/assets/images/umbwe6 (1).png";
import umbwe2 from "../public/assets/images/umbwe6 (2).png";
import umbwe3 from "../public/assets/images/umbwe6 (3).png";
import umbwe4 from "../public/assets/images/umbwe6 (4).png";
import umbwe5 from "../public/assets/images/umbwe6 (5).png";
import umbwe6 from "../public/assets/images/umbwe6 (6).png";

// Map image paths to imported image objects
const imageMap = {
  "/public/assets/images/distance.png": distance,
  "/public/assets/images/machame (1).png": machame1,
  "/public/assets/images/machame (2).png": machame2,
  "/public/assets/images/machame (3).png": machame3,
  "/public/assets/images/machame (4).png": machame4,
  "/public/assets/images/machame (5).png": machame5,
  "/public/assets/images/machame (6).png": machame6,
  "/public/assets/images/machame7 (1).png": machame7,
  "/public/assets/images/machame7 (2).png": machame8,
  "/public/assets/images/machame7 (3).png": machame9,
  "/public/assets/images/machame7 (4).png": machame10,
  "/public/assets/images/machame7 (5).png": machame11,
  "/public/assets/images/machame7 (6).png": machame12,
  "/public/assets/images/machame7 (7).png": machame13,
  "/public/assets/images/lemosho7 (1).png": lemosho1,
  "/public/assets/images/lemosho7 (2).png": lemosho2,
  "/public/assets/images/lemosho7 (3).png": lemosho3,
  "/public/assets/images/lemosho7 (4).png": lemosho4,
  "/public/assets/images/lemosho7 (5).png": lemosho5,
  "/public/assets/images/lemosho7 (6).png": lemosho6,
  "/public/assets/images/lemosho7 (7).png": lemosho7,
  "/public/assets/images/lemosho8 (1).png": lemosho8,
  "/public/assets/images/lemosho8 (2).png": lemosho9,
  "/public/assets/images/lemosho8 (3).png": lemosho10,
  "/public/assets/images/lemosho8 (4).png": lemosho11,
  "/public/assets/images/lemosho8 (5).png": lemosho12,
  "/public/assets/images/lemosho8 (6).png": lemosho13,
  "/public/assets/images/lemosho8 (7).png": lemosho14,
  "/public/assets/images/lemosho8 (8).png": lemosho15,
  "/public/assets/images/marangu5 (1).png": marangu1,
  "/public/assets/images/marangu5 (2).png": marangu2,
  "/public/assets/images/marangu5 (3).png": marangu3,
  "/public/assets/images/marangu5 (4).png": marangu4,
  "/public/assets/images/marangu5 (5).png": marangu5,
  "/public/assets/images/marangu6 (1).png": marangu6,
  "/public/assets/images/marangu6 (2).png": marangu7,
  "/public/assets/images/marangu6 (3).png": marangu8,
  "/public/assets/images/marangu6 (4).png": marangu9,
  "/public/assets/images/marangu6 (5).png": marangu10,
  "/public/assets/images/marangu6 (6).png": marangu11,
  "/public/assets/images/rongai6 (1).png": rongai1,
  "/public/assets/images/rongai6 (2).png": rongai2,
  "/public/assets/images/rongai6 (3).png": rongai3,
  "/public/assets/images/rongai6 (4).png": rongai4,
  "/public/assets/images/rongai6 (5).png": rongai5,
  "/public/assets/images/rongai6 (6).png": rongai6,
  "/public/assets/images/rongai7 (1).png": rongai7,
  "/public/assets/images/rongai7 (2).png": rongai8,
  "/public/assets/images/rongai7 (3).png": rongai9,
  "/public/assets/images/rongai7 (4).png": rongai10,
  "/public/assets/images/rongai7 (5).png": rongai11,
  "/public/assets/images/rongai7 (6).png": rongai12,
  "/public/assets/images/rongai7 (7).png": rongai13,
  "/public/assets/images/umbwe6 (1).png": umbwe1,
  "/public/assets/images/umbwe6 (2).png": umbwe2,
  "/public/assets/images/umbwe6 (3).png": umbwe3,
  "/public/assets/images/umbwe6 (4).png": umbwe4,
  "/public/assets/images/umbwe6 (5).png": umbwe5,
  "/public/assets/images/umbwe6 (6).png": umbwe6,
};

export default function ExperienceContentDisplay({
  experience,
  contentTabValue,
  contentTabs,
}) {
  if (!experience) {
    return (
      <div className="text-center text-red-500">
        Experience data not available.
      </div>
    );
  }

  const getImagePath = (path) => {
    // Adjust path to match the keys in imageMap if necessary
    // For example, if path is "machame (1).png" and key is "/public/assets/images/machame (1).png"
    const fullPath = path.startsWith("/public/assets/images/")
      ? path
      : `/public/assets/images/${path}`;
    return imageMap[fullPath] || "/placeholder.svg";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Description Tab */}
      {/* {experience.showTabDescription !== false && contentTabValue === contentTabs.indexOf("Description") && (
        <div className="py-4 sm:py-6">
          <p className="text-base sm:text-lg md:text-lg text-gray-800 leading-relaxed md:leading-[40px] md:mb-16">
            {experience.tabDescription || experience.description}
          </p>
        </div>
      )} */}

      {/* Itinerary Tab */}
      {contentTabValue === contentTabs.indexOf("Itinerary") && (
        <div className="py-4 sm:py-6">
          {experience.itinerary?.map((day, index) => {
            return (
              <div
                key={index}
                className="relative bg-[#fff9f5] h-fit overflow-hidden rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 p-4 py-11 sm:p-6 lg:p-8 xl:p-10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-6 lg:gap-8 relative z-10 h-full">
                  <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 flex-1 min-h-0">
                    <div className="flex gap-3 sm:gap-4 items-center">
                      <span className=" items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-[#2E492E] text-white rounded-full text-sm sm:text-base font-bold whitespace-nowrap">
                        Day {day.day}
                      </span>
                      <div className="bg-[#f1f7f1] max-w-fit  backdrop-blur-sm rounded-full px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 flex-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Image
                            src={distance || "/placeholder.svg"}
                            alt="Distance"
                            className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                          />
                          <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-900 leading-tight truncate">
                            {day.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex items-start lg:items-center overflow-hidden">
                      <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                        <p className="text-[#2E492E] md:leading-[40px] md:mt-7 text-sm lg:text-md lg:text-base  leading-relaxed font-medium  ">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  {day.image && (
                    <div className="w-full lg:w-[45%] xl:w-[50%] flex-shrink-0">
                      <div className="h-full flex flex-col justify-center lg:justify-end">
                        <div className="h-[320px] sm:h-[320px] z-20 md:h-[400px] lg:h-[400px] xl:h-[400px] relative">
                          <Image
                            src={getImagePath(day.image) || "/placeholder.svg"}
                            alt={`Day ${day.day} illustration`}
                            fill
                            className="h-full w-auto"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 40vw"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Price Tab */}
      {experience.showPriceTab !== false &&
        contentTabValue === contentTabs.indexOf("Price") && (
          <div className="py-4 sm:py-6 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-2 text-gray-900">
              The more you climb together, the more rewarding it becomes
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 px-2">
              Our pricing is designed to encourage shared adventure.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
              {experience.pricing?.map((pricing, index) => (
                <div
                  key={index}
                  className={`p-4 sm:p-6 text-center rounded-lg shadow-sm ${
                    index === 0
                      ? "bg-orange-50"
                      : index === 1
                      ? "bg-blue-50"
                      : index === 2
                      ? "bg-pink-50"
                      : index === 3
                      ? "bg-purple-50"
                      : "bg-green-50"
                  }`}
                >
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600" />
                    <span className="text-gray-600 text-xs sm:text-sm">
                      {pricing.group}
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    ${pricing.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Inclusion Tab */}
      {contentTabValue === contentTabs.indexOf("Inclusion") && (
        <div className="py-4 sm:py-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-gray-900">
            Package Includes
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {experience.inclusions?.map((item, index) => (
              <div key={index} className="flex items-start gap-3 sm:gap-4">
                <div className="bg-green-100 rounded-full p-2 sm:p-3 flex items-center justify-center min-w-10 h-10 sm:min-w-12 sm:h-12 flex-shrink-0">
                  {index === 0 && (
                    <Plane className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                  )}
                  {index === 1 && (
                    <Navigation className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                  )}
                  {index === 2 && (
                    <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                  )}
                  {index === 3 && (
                    <Home className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                  )}
                  {/* Add more icons as needed based on your data */}
                </div>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exclusion Tab */}
      {contentTabValue === contentTabs.indexOf("Exclusion") && (
        <div className="py-4 sm:py-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-gray-900">
            Package Excludes
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {experience.exclusions?.map((item, index) => (
              <div key={index} className="flex items-start gap-3 sm:gap-4">
                <div className="bg-red-100 rounded-full p-2 sm:p-3 flex items-center justify-center min-w-10 h-10 sm:min-w-12 sm:h-12 flex-shrink-0">
                  {index === 0 && (
                    <Plane className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
                  )}
                  {index === 1 && (
                    <Home className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
                  )}
                  {index === 2 && (
                    <FileText className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
                  )}
                  {index === 3 && (
                    <Navigation className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
                  )}
                  {/* Add more icons as needed based on your data */}
                </div>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
