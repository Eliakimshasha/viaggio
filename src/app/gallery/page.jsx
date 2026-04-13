"use client";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import masai from "../../../public/assets/images/gal1 (1).jpeg";
import lion from "../../../public/assets/images/gal1 (2).jpeg";
import elephant from "../../../public/assets/images/gal1 (3).jpeg";
import girraphe from "../../../public/assets/images/gal1 (5).jpeg";
import savana from "../../../public/assets/images/gal1 (7).jpeg";
import luxury from "../../../public/assets/images/gal1 (9).jpeg";
import lodge from "../../../public/assets/images/gal1 (1).jpeg";
import balloon from "../../../public/assets/images/gal1 (1).jpeg";
import falls from "../../../public/assets/images/gal1 (1).jpeg";
import leopard from "../../../public/assets/images/g1 (1).jpg";
import cretar from "../../../public/assets/images/g1 (2).jpg";
import bushmen from "../../../public/assets/images/g1 (3).jpg";
import desert from "../../../public/assets/images/g1 (1).jpg";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

import Link from "next/link";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryImages = [
  {
    id: 1,
    src: lion,
    alt: "Lion pride in the Serengeti",
    category: "Wildlife",
    location: "Serengeti National Park, Tanzania",
    featured: true,
  },
  {
    id: 2,
    src: elephant,
    alt: "Elephant herd at waterhole",
    category: "Wildlife",
    location: "Chobe National Park, Botswana",
    featured: true,
  },
  {
    id: 3,
    src: leopard,
    alt: "Leopard in a tree",
    category: "Wildlife",
    location: "Maasai Mara, Kenya",
    featured: false,
  },
  {
    id: 4,
    src: girraphe,
    alt: "Giraffe against sunset",
    category: "Wildlife",
    location: "Amboseli National Park, Kenya",
    featured: true,
  },
  {
    id: 5,
    src: savana,
    alt: "Savanna sunset with acacia tree",
    category: "Landscapes",
    location: "Maasai Mara, Kenya",
    featured: true,
  },
  {
    id: 6,
    src: cretar,
    alt: "Ngorongoro Crater panorama",
    category: "Landscapes",
    location: "Ngorongoro Conservation Area, Tanzania",
    featured: false,
  },
  {
    id: 7,
    src: falls,
    alt: "Victoria Falls",
    category: "Landscapes",
    location: "Livingstone, Zambia",
    featured: true,
  },
  {
    id: 8,
    src: masai,
    alt: "Maasai warriors performing traditional dance",
    category: "People & Culture",
    location: "Maasai Village, Kenya",
    featured: true,
  },
  {
    id: 9,
    src: bushmen,
    alt: "San Bushmen tracking skills demonstration",
    category: "People & Culture",
    location: "Kalahari Desert, Botswana",
    featured: false,
  },
  {
    id: 10,
    src: luxury,
    alt: "Luxury safari tent with savanna view",
    category: "Safari Camps",
    location: "Serengeti National Park, Tanzania",
    featured: true,
  },
  {
    id: 11,
    src: lodge,
    alt: "Lodge lounge overlooking waterhole",
    category: "Safari Camps",
    location: "Kruger National Park, South Africa",
    featured: false,
  },
  {
    id: 12,
    src: balloon,
    alt: "Hot air balloon safari over the Mara",
    category: "Activities",
    location: "Maasai Mara, Kenya",
    featured: true,
  },
  {
    id: 13,
    src: desert,
    alt: "Game drive with wildlife sighting",
    category: "Activities",
    location: "Serengeti National Park, Tanzania",
    featured: false,
  },
  {
    id: 14,
    src: falls,
    alt: "Walking safari with guide",
    category: "Activities",
    location: "South Luangwa National Park, Zambia",
    featured: false,
  },
  {
    id: 15,
    src: girraphe,
    alt: "Zebra crossing the Mara River",
    category: "Wildlife",
    location: "Maasai Mara, Kenya",
    featured: false,
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const galleryRef = useRef(null);

  // Filter images when category changes
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(
        galleryImages.filter((img) => img.category === activeCategory)
      );
    }
  }, [activeCategory]);

  // GSAP animations
  useEffect(() => {
    if (galleryRef.current) {
      gsap.from(galleryRef.current.querySelectorAll(".gallery-item"), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
        },
      });
    }
  }, [filteredImages]);

  useEffect(() => {
    return () => {
      // Clean up when component unmounts
      if (thumbsSwiper && !thumbsSwiper.destroyed) {
        thumbsSwiper.destroy();
      }
      // Reset state and body overflow
      if (lightboxOpen) {
        document.body.style.overflow = "auto";
      }
    };
  }, [lightboxOpen, thumbsSwiper]);

  // Open lightbox with specific image
  const openLightbox = (image) => {
    setCurrentImage(image);
    setLightboxOpen(true);
    // Disable body scroll
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // Re-enable body scroll
    document.body.style.overflow = "auto";
    // Reset current image - this is important to avoid stale references
    setTimeout(() => {
      setCurrentImage(null);
    }, 300);
  };

  return (
    <div className="">
      <Head>
        <title>Gallery | Safari Ventures</title>
        <meta
          name="description"
          content="Explore our stunning collection of African wildlife, landscapes, and safari moments. See the beauty of Africa through our lens."
        />
      </Head>

      <main>
        {/* Gallery Section */}
        <section className="py-16 bg-white md:px-36" id="gallery-categories">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Gallery Grid */}
              <div
                ref={galleryRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-4"
              >
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    className="gallery-item overflow-hidden rounded-lg shadow-md cursor-pointer"
                    whileHover={{ y: -5 }}
                    onClick={() => openLightbox(image)}
                  >
                    <div className="relative h-64 w-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredImages.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    No images found in this category. Please select another
                    category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 bg-stone-100 ">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-3xl   font-bold mb-2 lg:mb-4 text-gray-800  ">
                Football Video Highlights
              </h2>
              <p className="lg:text-lg text-sm  text-gray-600 ">
                Experience the sights and sounds of Africa's football scene
                through our captivating matchday videos.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                {/* This would be replaced with an actual video embed */}
                <div className="relative rounded-lg overflow-hidden shadow-md cursor-pointer">
                  <Link href="https://www.instagram.com/True Africa Escapetz/reels/">
                    <div className="relative h-48 w-full">
                      <Image
                        src={lion}
                        alt="Great Migration"
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#68ac33ad] flex items-center justify-center">
                          <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                        <h3 className="font-medium text-sm">
                          Born In Dar vs Mikoani
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Video thumbnails - would link to actual videos */}
                <Link href="https://www.instagram.com/reel/DMKeLQMSqIj/">
                  <div className="relative rounded-lg overflow-hidden shadow-md cursor-pointer">
                    <div className="relative h-48 w-full">
                      <Image
                        src={leopard}
                        alt="Great Migration"
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#68ac33ad] flex items-center justify-center">
                          <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                        <h3 className="font-medium text-sm">Single VS Taken</h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link href="https://www.instagram.com/reel/DI3bj_CNmqn/">
                  <div className="relative rounded-lg overflow-hidden shadow-md cursor-pointer">
                    <div className="relative h-48 w-full">
                      <Image
                        src={elephant}
                        alt="Predators of the Savanna"
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#68ac33ad] flex items-center justify-center">
                          <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                        <h3 className="font-medium text-sm">
                          Iphone Users VS Android Users
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link href="https://www.instagram.com/reel/DLDDetnimjL/">
                  <div className="relative rounded-lg overflow-hidden shadow-md cursor-pointer">
                    <div className="relative h-48 w-full">
                      <Image
                        src={girraphe}
                        alt="Cultural Experiences"
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#68ac33ad] flex items-center justify-center">
                          <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                        <h3 className="font-medium text-sm">
                          English Medium VS St.Kayumba
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-0 right-0 w-12 h-12 flex items-center justify-center text-white bg-[#cf5622] bg-opacity-50 rounded-full z-10 -m-6"
              aria-label="Close lightbox"
            >
              <FaTimes size={24} />
            </button>

            {/* Main image swiper */}
            <Swiper
              spaceBetween={10}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs, Zoom]}
              initialSlide={galleryImages.findIndex(
                (img) => img.id === currentImage.id
              )}
              zoom={true}
              className="lightbox-swiper mb-4"
            >
              {galleryImages.map((image) => (
                <SwiperSlide key={`main-${image.id}`}>
                  <div className="swiper-zoom-container">
                    <div className="relative h-[70vh] w-full flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          layout="fill"
                          objectFit="contain"
                          priority={image.id === currentImage.id}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="mt-12">
                    <div className="absolute bottom-0 m left-0 right-0 p-4 bg-[#cf5622] bg-opacity-50 text-white">
                      <h3 className="font-medium">{image.alt}</h3>
                      <p className="text-sm text-gray-200">{image.location}</p>
                    </div>
                  </div> */}
                </SwiperSlide>
              ))}

              {/* Custom navigation buttons */}
              <div className="swiper-button-prev !hidden sm:!flex absolute left-4 top-1/2 z-10 w-12 h-12 items-center justify-center text-white  bg-opacity-50 rounded-full">
                <FaChevronLeft size={20} />
              </div>
              <div className="swiper-button-next !hidden sm:!flex absolute right-4 top-1/2 z-10 w-12 h-12 items-center justify-center text-white  bg-opacity-50 rounded-full">
                <FaChevronRight size={20} />
              </div>
            </Swiper>

            {/* Thumbnails swiper */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView="auto"
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="thumbs-swiper h-20"
              breakpoints={{
                320: { slidesPerView: 3 },
                640: { slidesPerView: 5 },
                1024: { slidesPerView: 8 },
              }}
            >
              {galleryImages.map((image) => (
                <SwiperSlide
                  key={`thumb-${image.id}`}
                  className="cursor-pointer"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={image.src}
                      alt={`Thumbnail: ${image.alt}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
