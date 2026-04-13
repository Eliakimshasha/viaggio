"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import curve1 from "../../public/assets/images/nyumbuz (5).jpg";
import curve2 from "../../public/assets/images/nyumbuz (3).jpg";
import curve3 from "../../public/assets/images/ti1.jpg";
import hom1 from "../../public/assets/images/tour2.jpg";
import hom2 from "../../public/assets/images/tourist.png";
import makachu from "../../public/assets/images/makachu2.webp";
import masai from "../../public/assets/images/masai.jpg";
import tour2 from "../../public/assets/images/tour3.jpg";
import Image from "next/image";
import { destinations } from "../../components/Packages";
import { ArrowRight } from "lucide-react";
import TravelStyle from "./travel-style/TravelStyle";
import { ChevronLeft, ChevronRight } from "lucide-react";

function App() {
  const router = useRouter();
  const [activeSlides, setActiveSlides] = useState({});
  const [currentMainIndex, setCurrentMainIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Hero section images
  const heroImages = [
    {
      id: 1,
      src: curve1,
      alt: "African Safari Landscape",
    },
    {
      id: 2,
      src: curve2,
      alt: "Elephant in savanna",
    },
    {
      id: 3,
      src: curve3,
      alt: "Lion in the wild",
    },
  ];

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      handleImageChange((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Auto-rotate destination images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlides((prev) => {
        const newSlides = { ...prev };
        destinations.forEach((destination) => {
          const currentSlide = newSlides[destination.id] || 0;
          newSlides[destination.id] =
            (currentSlide + 1) % destination.images.length;
        });
        return newSlides;
      });
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleImageChange = (indexOrFunction) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (typeof indexOrFunction === "function") {
      setCurrentMainIndex(indexOrFunction);
    } else {
      setCurrentMainIndex(indexOrFunction);
    }
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (destinationId, index) => {
    setActiveSlides((prev) => ({
      ...prev,
      [destinationId]: index,
    }));
  };

  const handleBookNow = (routeId) => {
    router.push(`/routes/${routeId}`);
  };

  const navigateToDestinations = () => {
    router.push("/destinations");
  };

  const navigateToContact = () => {
    router.push("/contact");
  };

  return (
    <div className="md:min-h-screen">
      {/* Hero Section */}
      <div className="md:min-h-screen md:h-fit lg:min-h-screen lg:h-fit h-screen mx-auto px-4 py-12 md:pt-24 bg-[#fff9f5] relative overflow-hidden lg:px-12">
        <div className="min-h-screen p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Desktop View */}
            <div className="hidden lg:flex items-center justify-between">
              {/* Left Side - Text Content */}
              <div className="flex-1 max-w-xl pr-8">
                <h1 className="text-5xl lg:text-[60px] md:leading-[80px] font-bold text-gray-900 leading-tight mb-6 animate-float-in">
                  Explore Tanzania.
                  <br /> The Land Of Unlimited Experiences & Joy!
                </h1>
                <p
                  className="text-lg text-gray-900 mb-10 md:text-xl max-w-md animate-float-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  Discover The Beauty Of Tanzania - Safaris, Beaches &
                  Adventures
                </p>
                <button
                  className="bg-[#946626] hover:bg-[#7a4f1f] text-white px-8 py-4 rounded-full text-lg flex items-center gap-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-float-in"
                  style={{ animationDelay: "0.6s" }}
                  onClick={navigateToDestinations}
                >
                  View all destinations
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              {/* Right Side - Enhanced Image Layout */}
              <div className="flex-1 relative h-[400px] w-full max-w-2xl">
                {/* Enhanced Background Animation */}
                <div className="absolute -left-48 inset-0 z-20 md:w-[800px] md:h-[600px] -top-20 h-full w-full overflow-hidden">
                  <svg
                    className="w-full h-full opacity-60"
                    viewBox="0 0 600 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <g
                      className="animate-spin"
                      style={{
                        transformOrigin: "300px 200px",
                        animation: "spin 20s linear infinite",
                      }}
                    >
                      <circle
                        cx="300"
                        cy="200"
                        r="80"
                        stroke="#946626"
                        strokeWidth="0.4"
                        fill="none"
                        strokeDasharray="8,8"
                      />
                      <circle
                        cx="300"
                        cy="200"
                        r="120"
                        stroke="#946626"
                        strokeWidth="0.4"
                        fill="none"
                        strokeDasharray="12,12"
                      />
                    </g>
                    <g
                      className="animate-spin"
                      style={{
                        transformOrigin: "300px 200px",
                        animation: "spin 30s linear infinite reverse",
                      }}
                    >
                      <circle
                        cx="300"
                        cy="200"
                        r="160"
                        stroke="#946626"
                        strokeWidth="0.4"
                        fill="none"
                        strokeDasharray="16,16"
                      />
                      <circle
                        cx="300"
                        cy="200"
                        r="200"
                        stroke="#946626"
                        strokeWidth="0.4"
                        fill="none"
                        strokeDasharray="20,20"
                      />
                    </g>
                    <circle
                      cx="300"
                      cy="200"
                      r="50"
                      stroke="#946626"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="4,4"
                      opacity="0.5"
                    />
                    <circle
                      cx="300"
                      cy="200"
                      r="240"
                      stroke="#946626"
                      strokeWidth="0.8"
                      fill="none"
                      strokeDasharray="24,24"
                      opacity="0.3"
                    />
                  </svg>
                </div>
                <div className="bg-[#fff9f5] relative z-40">
                  {/* Main Image Container with Fade Effect */}
                  <div className="w-[85%] h-full md:h-[400px] mx-auto relative">
                    <div className="relative w-full z-20 h-full image-container rounded-4xl overflow-hidden shadow-2xl">
                      {heroImages.map((image, index) => (
                        <div
                          key={`main-${image.id}`}
                          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                            index === currentMainIndex
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        >
                          <Image
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            className="w-full h-full object-cover transition-all duration-1000 ease-in-out transform hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Left Small Image */}
                  <div className="absolute -top-36 -left-6 w-44 h-44 z-10 transition-container animate-slide-in-top-left">
                    <div className="relative w-full h-full overflow-hidden image-container rounded-t-full shadow-xl">
                      <div className="relative w-full h-full">
                        {heroImages.map((image, index) => (
                          <div
                            key={`top-left-${image.id}`}
                            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                              index ===
                              (currentMainIndex + 1) % heroImages.length
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            <Image
                              src={image.src || "/placeholder.svg"}
                              alt={image.alt}
                              className="w-full h-full object-cover transition-all duration-1000 ease-in-out transform hover:scale-110"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                    </div>
                  </div>

                  {/* Bottom Right Small Image */}
                  <div className="absolute -bottom-24 -right-3 w-44 h-44 z-30 transition-container animate-slide-in-bottom-right">
                    <div className="relative w-full h-full overflow-hidden image-container rounded-t-full shadow-xl">
                      <div className="relative w-full h-full">
                        {heroImages.map((image, index) => (
                          <div
                            key={`bottom-right-${image.id}`}
                            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                              index ===
                              (currentMainIndex + 2) % heroImages.length
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            <Image
                              src={image.src || "/placeholder.svg"}
                              alt={image.alt}
                              className="w-full h-full object-cover transition-all duration-1000 ease-in-out transform hover:scale-110"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-[-50px] right-[-50px] w-[300px] h-[300px] bg-white bg-opacity-10 rounded-full blur-3xl -z-10 animate-pulse-gentle"></div>
              </div>
            </div>
            {/* Mobile View */}
            <div className="lg:hidden ">
              <div className="text-center mb-8">
                <h1 className="text-3xl mt-9 max-[900px]:mt-5 md:text-4xl font-bold text-gray-900 leading-tight mb-4 animate-float-in">
                  Explore Tanzania
                </h1>
                <p
                  className="text-base md:text-lg text-gray-900 mb-6 animate-float-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  The Land Of Unlimited Experiences & Joy!
                </p>
              </div>
              <div className="relative mb-8">
                <div className="relative h-[350px] md:h-[300px] w-full max-w-md mx-auto">
                  <div className="absolute inset-0 -z-10 overflow-hidden">
                    <svg
                      className="w-full h-full opacity-50"
                      viewBox="0 0 300 300"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid slice"
                    >
                      <g
                        className="animate-spin"
                        style={{
                          transformOrigin: "150px 150px",
                          animation: "spin 15s linear infinite",
                        }}
                      >
                        <circle
                          cx="150"
                          cy="150"
                          r="60"
                          stroke="#946626"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="6,6"
                          className="animate-pulse-gentle"
                        />
                        <circle
                          cx="150"
                          cy="150"
                          r="90"
                          stroke="#946626"
                          strokeWidth="1.5"
                          fill="none"
                          strokeDasharray="10,10"
                        />
                      </g>
                      <g
                        className="animate-spin"
                        style={{
                          transformOrigin: "150px 150px",
                          animation: "spin 25s linear infinite reverse",
                        }}
                      >
                        <circle
                          cx="150"
                          cy="150"
                          r="120"
                          stroke="#946626"
                          strokeWidth="1"
                          fill="none"
                          strokeDasharray="14,14"
                        />
                      </g>
                    </svg>
                  </div>
                  {/* Mobile Main Image with Fade Effect */}
                  <div className="relative w-full h-full image-container rounded-3xl overflow-hidden shadow-2xl">
                    {heroImages.map((image, index) => (
                      <div
                        key={`mobile-main-${image.id}`}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                          index === currentMainIndex
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-all duration-1000 ease-in-out transform hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Top Right Small Image */}
                  <div className="absolute -top-8 -right-4 w-28 h-28 lg:w-20 lg:h-20 z-10 animate-slide-in-top-left">
                    <div className="relative w-full h-full overflow-hidden image-container rounded-t-full shadow-lg">
                      {heroImages.map((image, index) => (
                        <div
                          key={`mobile-top-${image.id}`}
                          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                            index === (currentMainIndex + 1) % heroImages.length
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        >
                          <Image
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            className="w-full h-full object-cover opacity-80 transition-all duration-500 hover:opacity-100 hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Bottom Left Small Image */}
                  <div className="absolute -bottom-8 -left-4 w-28 h-28 md:w-20 md:h-20 z-10 animate-slide-in-bottom-right">
                    <div className="relative w-full h-full overflow-hidden image-container rounded-t-full shadow-lg">
                      {heroImages.map((image, index) => (
                        <div
                          key={`mobile-bottom-${image.id}`}
                          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                            index === (currentMainIndex + 2) % heroImages.length
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        >
                          <Image
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            className="w-full h-full object-cover opacity-80 transition-all duration-500 hover:opacity-100 hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mb-8">
                <p
                  className="text-sm md:text-base text-gray-700 mt-16 mb-6 max-w-sm mx-auto animate-float-in"
                  style={{ animationDelay: "0.6s" }}
                >
                  Discover The Beauty Of Tanzania - Safaris, Beaches &
                  Adventures
                </p>
                <button
                  className="bg-[#946626] hover:bg-[#7a4f1f] text-white px-6 py-3 rounded-full text-base flex items-center gap-3 transition-all duration-300 mx-auto transform hover:scale-105 hover:shadow-lg animate-float-in"
                  style={{ animationDelay: "0.9s" }}
                  onClick={navigateToDestinations}
                >
                  View all destinations
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Control buttons for manual navigation */}
            <div className="flex relative z-40 justify-center mt-8 gap-4">
              <button
                onClick={() =>
                  setCurrentMainIndex(
                    (prev) => (prev - 1 + heroImages.length) % heroImages.length
                  )
                }
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full transition-colors duration-300 flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>
              <button
                onClick={() =>
                  setCurrentMainIndex((prev) => (prev + 1) % heroImages.length)
                }
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full transition-colors duration-300 flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            {/* Dots indicator */}
            <div className="flex justify-center mt-4 gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMainIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentMainIndex ? "bg-[#946626]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Popular Packages Section */}
      <div className="min-h-screen">
        <div className="text-center md:py-16 py-9 px-6">
          <h1 className="md:text-6xl font-bold text-3xl text-gray-800 mb-8">
            Popular Packages
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.slice(0, 6).map((destination) => {
              const currentSlide = activeSlides[destination.id] || 0;
              return (
                <div
                  key={destination.id}
                  className="overflow-hidden transition-shadow"
                >
                  {/* Image Carousel */}
                  <div className="relative h-80 overflow-hidden">
                    <div
                      className="flex transition-transform duration-500 cursor-pointer ease-in-out h-full"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                      }}
                      onClick={() => handleBookNow(destination.id)}
                    >
                      {destination.images.map((image, index) => (
                        <div
                          key={index}
                          className="w-full h-full flex-shrink-0"
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${destination.name} - Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-3xl hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {destination.days} Days Trip
                      </span>
                    </div>
                    {/* Navigation Arrows */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const prevIndex =
                          currentSlide === 0
                            ? destination.images.length - 1
                            : currentSlide - 1;
                        goToSlide(destination.id, prevIndex);
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextIndex =
                          (currentSlide + 1) % destination.images.length;
                        goToSlide(destination.id, nextIndex);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {destination.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            goToSlide(destination.id, index);
                          }}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            index === currentSlide
                              ? "bg-[#946626]"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Card Content */}
                  <div className="p-6 pl-0 group">
                    <h3 className="md:text-lg font-medium text-gray-800 mb-1 group-hover:text-[#946626] transition-colors duration-300">
                      {destination.name}
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <span className="text-black font-bold mb-2">
                        ${destination.price}
                      </span>{" "}
                      / Person
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-center mt-3 md:py-16 items-center">
            <button
              className="bg-[#946626] cursor-pointer hover:bg-[#7a4f1f] text-white px-8 py-4 rounded-full text-lg flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
              onClick={navigateToDestinations}
            >
              Explore More Popular Destinations
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {/* Travel Style Section */}
      <div className="h-fit bg-[#fff8f3] mb-9 min-h-[760px]">
        <TravelStyle />
      </div>
      {/* Corporate Retreats Section */}
      <div className="min-h-screen flex flex-col lg:flex-row md:justify-between md:items-start md:pl-9 md:pr-0 px-4">
        <div className="flex-1 relative h-[300px] sm:h-80 md:h-[615px]">
          <Image
            src={hom1 || "/placeholder.svg"}
            alt="Corporate retreat by the lake"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="md:flex-1 md:py-0 py-9 flex flex-col md:justify-center px-2 md:px-12">
          <div className="max-w-lg mx-auto lg:mx-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-950 mb-6 sm:mb-8 leading-tight">
              Corporate Retreats
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-950 mb-8 sm:mb-10 md:mb-12 leading-relaxed">
              Get your team off the desk and away from the office with our
              stunning, amazing corporate retreats
            </p>
            <button
              className="bg-[#946626] hover:bg-[#7a4f1f] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium flex items-center gap-3 transition-all duration-300 mb-8 sm:mb-12 md:mb-16 group w-full sm:w-auto justify-center sm:justify-start transform hover:scale-105"
              onClick={navigateToContact}
            >
              Get the team to experience the best
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="relative h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={hom2 || "/placeholder.svg"}
                alt="Mountain retreat landscape"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Trip Planning Section */}
      <div className="bg-[#fff9f5] rounded-3xl p-8 lg:p-12 relative overflow-hidden mx-4 lg:mx-12 mb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 z-10 relative flex flex-col items-center lg:items-start">
            <div className="md:space-y-1 space-y-3">
              <h2 className="md:text-[59px] text-[40px] font-medium text-center md:text-start text-gray-900 leading-tight">
                Let's Plan Your trip
              </h2>
              <p className="md:text-[24px] text-center md:text-start text-gray-700 leading-relaxed">
                Tell us a bit about your dream getaway, and we'll handle the
                rest.
              </p>
            </div>
            <button
              className="inline-flex items-center gap-3 bg-[#946626] hover:bg-[#7a4f1f] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-sm hover:scale-105"
              onClick={navigateToContact}
            >
              Customize My Trip
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 relative">
            <div className="relative max-w-md ml-auto h-96">
              <div className="absolute top-0 md:left-8 left-16 z-30">
                <div className="w-[118px] h-[242px] overflow-hidden">
                  <Image
                    src={makachu || "/placeholder.svg"}
                    alt="Rock Formation"
                    className="w-full h-full object-cover rounded-[80px]"
                  />
                </div>
              </div>
              <div className="absolute top-4 md:right-4 right-16 z-20">
                <div className="w-[118px] h-[242px] overflow-hidden">
                  <Image
                    src={masai || "/placeholder.svg"}
                    alt="Architecture"
                    className="w-full h-full object-cover rounded-[80px]"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-[118px] h-[242px] overflow-hidden">
                  <Image
                    src={tour2 || "/placeholder.svg"}
                    alt="Lake & Boats"
                    className="w-full h-full object-cover rounded-[80px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CSS Styles */}
      <style jsx>{`
        @keyframes floatIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          50% {
            opacity: 0.7;
            transform: translateY(-10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes slideInMain {
          0% {
            opacity: 0;
            transform: translateX(100px) rotate(5deg) scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: translateX(-20px) rotate(-2deg) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) rotate(0deg) scale(1);
          }
        }
        @keyframes slideInTopLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px) translateY(-50px) rotate(-45deg)
              scale(0.5);
          }
          60% {
            opacity: 0.8;
            transform: translateX(10px) translateY(10px) rotate(10deg)
              scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0) rotate(0deg) scale(1);
          }
        }
        @keyframes slideInBottomRight {
          0% {
            opacity: 0;
            transform: translateX(50px) translateY(50px) rotate(45deg)
              scale(0.5);
          }
          60% {
            opacity: 0.8;
            transform: translateX(-10px) translateY(-10px) rotate(-10deg)
              scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0) rotate(0deg) scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-float-in {
          animation: floatIn 0.8s ease-out;
        }
        .animate-slide-in-main {
          animation: slideInMain 1s ease-out;
        }
        .animate-slide-in-top-left {
          animation: slideInTopLeft 1s ease-out;
        }
        .animate-slide-in-bottom-right {
          animation: slideInBottomRight 1s ease-out;
        }
        .animate-pulse-gentle {
          animation: pulse 2s ease-in-out infinite;
        }
        .shimmer-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shimmer 2s ease-in-out;
        }
        .image-container {
          position: relative;
          overflow: hidden;
        }
        .image-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 70%
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease;
          z-index: 1;
        }
        .image-container:hover::before {
          transform: translateX(100%);
        }
        .transition-container {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .group:hover .group-hover\\:opacity-100 {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default App;
