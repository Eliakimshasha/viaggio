"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Clock, Users, Star, MapPin } from "lucide-react";
import { PiMapPinAreaLight } from "react-icons/pi";
import img from "../../../../public/assets/images/an1 (13).jpeg";
import img2 from "../../../../public/assets/images/an1 (11).jpeg";

interface BaseRoute {
  showTabDescription: boolean;
  showPriceTab: boolean;
  name: string;
  image: string;
  difficulty: string;
  success_rate: string;
  inclusions: string[];
  exclusions: string[];
}

interface RouteWithVariants extends BaseRoute {
  nickname: string;
  hasMultipleDays: true;
  variants: {
    [key: string]: {
      duration: string;
      tabDescription: string;
      description: string;
      itinerary: any[];
      pricing: any[];
    };
  };
}

interface SimpleRoute extends BaseRoute {
  hasMultipleDays: false;
  duration: string;
  tabDescription: string;
  description: string;
  itinerary: any[];
  pricing: any[];
  isEscapeDSM?: boolean;
  whiteBg?: string;
  blackBg?: string;
}

type RouteData = RouteWithVariants | SimpleRoute;

// Type Guards
const isRouteWithVariants = (route: RouteData): route is RouteWithVariants => {
  return route.hasMultipleDays === true && "variants" in route;
};

const isSimpleRoute = (route: RouteData): route is SimpleRoute => {
  return route.hasMultipleDays === false && "description" in route;
};

// for overview
const routeData = {
  // Kilimanjaro routes with multiple day options
  "machame-route": {
    showTabDescription: true,
    showPriceTab: true,
    name: "Machame Route",
    nickname: "Whiskey Route",
    hasMultipleDays: true,
    variants: {
      "6-days": {
        duration: "6 Days",
        tabDescription:
          "It begins with a drive of about 50 kilometers from Moshi to Machame Gate, taking roughly 1.5 hours. It’s one of the most popular and scenic routes up Kilimanjaro, offering rich variety in landscapes from lush rainforest at Machame Camp to moorlands around Shira Camp, and alpine desert at Lava Tower and Barafu Camp. After acclimatizing along the way, climbers pass through the dramatic Barranco Wall, rest at Karanga Camp, and then continue to Barafu Camp, the final stop before the summit push. Following the climb to Uhuru Peak, the descent is made via the Mweka Route, with a last overnight stop at Mweka Camp before reaching Mweka Gate.",
        description:
          "The Machame Route, fondly known as the 'Whiskey Route', is Kilimanjaro’s most popular and scenic trail. Offering a dramatic journey through lush rainforest, heather moorlands, alpine desert, and glacier-covered peaks, it's the route of choice for those seeking a challenging yet rewarding adventure.",
        itinerary: [
          {
            day: 1,
            title: "From Machame Gate to Machame Camp",
            altitude: "1640m - 2835m",
            distance: "11 Km",
            time: "5-7 hours",
            habitat: "Rain Forest",
            image: img,
            description:
              "Departing from Moshi a 1.5 hour drive will take you through the Village of Machame to the Kilimanjaro National Park Gate. After the quick formality of acquiring climbing permits and registering with the search and rescue service, the group will start trekking up to Machame Camp. We advise you to pack a raincoat in addition to extra clothing because the walking path goes through a rainforest where tropical showers are very likely to occur.",
          },
          {
            day: 2,
            title: "From Machame Camp to Shira Camp",
            altitude: "2835m - 3750m",
            distance: "5 Km",
            time: "4-6 hours",
            habitat: "Moorland",
            image: img,
            description:
              "The journey to Shira Camp begins after breakfast at Machame Camp. The hike takes 4-5 hours and covers about 5 kilometers. On this day, you will be able to see breathtaking views of the Shira Plateau spread out in front of you for the first time after emerging from the rainforest. Our porters will prepare lunch and set up the tents when we get to Shira Camp. Before supper, you'll have time to unwind and get used to your surroundings. Your guide will give you an update on the plans for the journey the following day in the evening.",
          },
          {
            day: 3,
            title: "From Shira Camp to Lava to Barranco Camp",
            altitude: "3750m - 4630m - 3960m",
            distance: "10 Km",
            time: "6-8 hours",
            habitat: "Semi Desert",
            image: img,
            description: `After breakfast upon leaving the Shira Plateau, we head east up a ridge through rocky, semi-desert terrains, past the intersection leading to the Kibo peak, and then south-east toward the Lava Tower, also known as the "Shark's Tooth" (elev. 4650m). The Arrow Glacier is reached at a second intersection just after the tower. After that, we descend further at 3,960 meters to spend the night at Barranco Camp.`,
          },
          {
            day: 4,
            title: "From Barranco to Karanga to Barafu Camp",
            altitude: "3960m - 4035m",
            distance: "5 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "Early mornings will be accompanied with breakfast before departure on a steep ridge up to the adventurous Barranco Wall to the Karanga Valley and the junction, which connects, with the Mweka Trail. One of the most amazing days to witness your crew's strength, power, and agility as they seemingly effortlessly zoom over this wall. We keep going up toward Barafu Camp, and once you get there, you've finished the South Circuit, which has a number of amazing vantage points of the peak. As we get ready for summit night, we'll have an early dinner and spend the night at the Barafu Camp.",
          },
          {
            day: 5,
            title: "From Karanga to Summit to Mweka Camp",
            altitude: "4035m - 4673m",
            distance: "4 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "We will depart from Barafu Camp at night 6-hour trek to Stella Point (5685m) often the most mentally and physically challenging part of the climb. From there, 2 hour climb to Uhuru Peak is coated with snow. The weather will determine how long you spend at the peak, so don't stay too long because you'll be tired and chilly. Congratulations, one step at a time you have now reached Uhuru Peak the highest point on Mount Kilimanjaro and the entire continent of Africa. It takes roughly 3 hours to descend to Barafu, where you can relax for a little before continuing on to Mweka Camp for dinner and overnight.",
          },
          {
            day: 6,
            title: "From Machame Gate to Machame Camp",
            altitude: "4673m - 5895m - 3068m",
            distance: "17 Km",
            time: "12-16 hours",
            habitat: "Arctic",
            image: img,
            description:
              "It's time to say farewell to your crew after breakfast and a sincere ceremony of gratitude and team building. To pick up your summit certificates, we descend further to the Mweka Park Gate. We strongly advise Gaiters and trekking poles because the terrain is damp, mudd y, and steep due to the significantly warmer temperature. A car will pick you up at Mweka village at the gate and take you back to your Moshi, which should take you around 30 minutes.",
          },
        ],
        pricing: [
          { group: "1 person", price: 1800 },
          { group: "2-4 people", price: 1750 },
          { group: "5-7 people", price: 1650 },
          { group: "8-10 people", price: 1600 },
          { group: "11+ people", price: 1550 },
        ],
      },
      "7-days": {
        duration: "7 Days",
        tabDescription:
          "The 8-day Machame route provides the best acclimatization profile with an extra day for rest and adjustment. This extended version significantly increases your chances of summit success while allowing you to fully enjoy the spectacular scenery and diverse ecosystems of Kilimanjaro.",
        description:
          "The route approaches Mount Kilimanjaro from the south, beginning with a short drive from Moshi to Machame Gate.  The path leads hikers through the rain forest to Shira Plateau. Here, many of Kilimanjaro’s routes converge. Then the route turns east and traverses underneath Kilimanjaro's Southern Ice Field on a path known as the Southern Circuit before summiting from Barafu. Descent is made via the Mweka route.",
        itinerary: [
          {
            day: 1,
            title: "From Machame Gate to Machame Camp",
            altitude: "1640m - 2835m",
            distance: "11 Km",
            time: "5-7 hours",
            habitat: "Rain Forest",
            image: img,
            description:
              "Departing from Moshi a 45-minute drive will take you through the Village of Machame to the Kilimanjaro National Park Gate. After the quick formality of acquiring climbing permits and registering with the search and rescue service, the group will start trekking up to Machame Camp. We advise you to pack a raincoat in addition to extra clothing because the walking path goes through a rainforest where tropical showers are very likely to occur.",
          },
          {
            day: 2,
            title: "From Machame Camp to Shira Camp",
            altitude: "2835m - 3750m",
            distance: "5 Km",
            time: "4-6 hours",
            habitat: "Moorland",
            image: img,
            description:
              "The journey to Shira Camp begins after breakfast at Machame Camp. The hike takes 4-5 hours and covers about 5 kilometers. On this day, you will be able to see breathtaking views of the Shira Plateau spread out in front of you for the first time after emerging from the rainforest. Our porters will prepare lunch and set up the tents when we get to Shira Camp. Before supper, you'll have time to unwind and get used to your surroundings. Your guide will give you an update on the plans for the journey the following day in the evening.",
          },
          {
            day: 3,
            title: "From Shira to Lava to Barranco Camp",
            altitude: "3750m - 4630m - 3960m",
            distance: "10 Km",
            time: "6-8 hours",
            habitat: "Semi Desert",
            image: img,
            description: `After breakfast upon leaving the Shira Plateau, we head east up a ridge through rocky, semi-desert terrains, past the intersection leading to the Kibo peak, and then south-east toward the Lava Tower, also known as the "Shark's Tooth" (elev. 4650m). The Arrow Glacier is reached at a second intersection just after the tower. After that, we descend further at 3,960 meters to spend the night at Barranco Camp.`,
          },
          {
            day: 4,
            title: "From Baranco to Karanga Camp",
            altitude: "3960m - 4035m",
            distance: "5 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `After breakfast, we begin our ascent along a steep ridge leading to the thrilling Barranco Wall, followed
by a trek into the Karanga Valley and the junction that connects with the Mweka Trail. This day offers one
of the most spectacular views, as you witness the remarkable skill, agility, and strength of your crew
effortlessly navigating the wall. We spend the night at Karanga Camp.`,
          },
          {
            day: 5,
            title: "From Karanga Camp to Barafu Camp",
            altitude: "4035m",
            distance: "3 Km",
            time: "2-3 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `We proceed upward toward Barafu Camp, and upon arrival, you will have completed the South Circuit,
which provides a stunning array of views of the summit from various perspectives. After an early dinner,
we rest and prepare for the challenging summit night ahead. Overnight at Barafu Camp..`,
          },
          {
            day: 6,
            title: "From Barafu Camp-Summit-Mweka Camp ",
            altitude: "4035m - 4673m",
            distance: "4 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `We will depart from Barafu Camp at night 6-hour trek to Stella Point (5685m) often the most mentally and physically challenging part of the climb. From there, 2 hour climb to Uhuru Peak is coated with snow. The weather will determine how long you spend at the peak, so don't stay too long because you'll be tired and chilly. Congratulations, one step at a time you have now reached Uhuru Peak the highest point on Mount Kilimanjaro and the entire continent of Africa. It takes roughly 3 hours to descend to Barafu, where you can relax for a little before continuing on to Mweka Camp for dinner and overnight.`,
          },
          {
            day: 7,
            title: "From Mweka Camp to Mweka Gate ",
            altitude: "4673m - 5895m - 3068m",
            distance: "17 Km",
            time: "12-16 hours",
            habitat: "Arctic",
            image: img,
            description: `It's time to say farewell to your staff after breakfast and a sincere ceremony of gratitude and team building. To pick up your summit certificates, we descend further to the Mweka Park Gate. We strongly advise Gaiters and trekking poles because the terrain is damp, mudd y, and steep due to the significantly warmer temperature. A car will pick you up at Mweka village at the gate and take you back to your Moshi, which should take you around 30 minutes.`,
          },
        ],
        pricing: [
          { group: "1 person", price: 1950 },
          { group: "2-4 people", price: 1830 },
          { group: "5-7 people", price: 1750 },
          { group: "8-10 people", price: 1680 },
          { group: "11+ people", price: 1635 },
        ],
      },
    },
    image: img,
    difficulty: "Moderate to Challenging",
    success_rate: "85%",
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      "Transfer to and pick-up from the gate of Kilimanjaro National Park.",
      "All park fees collected by the Kilimanjaro National Park (conservation fees, camping fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania National Parks Authority).",
      "Tented accommodation on Mount Kilimanjaro (modern, comfortable 4-Season tents, North Face VE-25 ).",
      "All meals on the hike.",
      "4-inch (10-cm) thick and comfortable sleeping mats",
      "Oxygen cylinders and oximeters",
      "GPS-tracking service",
      "Complete medical kits.",
      "Professional guides, licensed by Kilimanjaro National Park. All our guides are the holder of Wilderness First Responder or Wilderness First Aid certifications. All our guides have 10+years of successful mountaineering experience.",
      "Dedicated support crew (assistant guides, camp master, porters, cooks.etc).",
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation before and after trekking",
      "Visa fees",
      "Personal gear rentals",
      "Tips for the mountain crew.",
      "Mountaineering insurance",
    ],
  },

  "lemosho-route": {
    showTabDescription: true,
    showPriceTab: true,
    name: "Lemosho Route",
    nickname: "Wilderness Route",
    hasMultipleDays: true,
    variants: {
      "7-days": {
        duration: "7 Days",
        tabDescription: `The trail begins on the western side of Mount Kilimanjaro, with a scenic drive from Moshi to
Londorossi Gate. The initial two days involve trekking through lush rainforests to reach Shira
Ridge. The route then extends across the entire Shira Plateau from west to east, providing a
relatively gentle and enjoyable hike. While the trail remains uncrowded at first, it merges with
the Machame route near Lava Tower. From there, climbers follow the Southern Circuit beneath
Kilimanjaro’s Southern Ice Field before making the final ascent from Barafu. The descent
follows the Mweka route`,
        description: `The Lemosho route is widely regarded as the most picturesque trail on Mount Kilimanjaro, offering breathtaking views from various angles. As one of the more recent trails, it is an excellent option for climbers. This route is particularly favored due to its perfect combination of minimal crowds, stunning landscapes, and a high success rate for reaching the summit. Almighty Kilimanjaro specializes in guiding climbers along the Lemosho route, with most of our clients choosing it and consistently expressing their satisfaction. `,
        itinerary: [
          {
            day: 1,
            title: "From Londrosi Gate  to Mti Mkubwa Camp",
            altitude: "2100m - 2785m",
            distance: "6 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description: `Leaving Moshi, a 45-minute drive winds through charming mountainside villages before arriving at the Kilimanjaro National Park Gate. While we wait for our permits to be processed, we can observe the lively preparations of various trekking teams gearing up for their journey. As we set
off, enjoy the lush rainforest scenery and winding trails while your guide shares insights about the region’s flora, fauna, and wildlife. The lower sections of the trail can be muddy and slippery, so we strongly recommend using gaiters and trekking poles for better stability.`,
          },
          {
            day: 2,
            title: "From Mti Mkubwa to Shira Camp",
            altitude: "2785m - 3504m",
            distance: "8 Km",
            time: "5-6 hours",
            habitat: "Heath",
            image: img,
            description: `After a restful night and a nourishing breakfast, we leave the rainforest behind and follow a
steadily ascending trail. As we climb higher, expansive views begin to unfold, eventually leading
us to the edge of the Shira Plateau. With the increasing altitude, temperatures start to drop.`,
          },
          {
            day: 3,
            title: "From Shira to Lava Camp to Barranco Camp ",
            altitude: "3504m - 4630m - 3960m",
            distance: "10 Km",
            time: "6-8 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `After breakfast upon leaving the Shira Plateau, we head east up a ridge through rocky, semi-desert terrains, past the intersection leading to the Kibo peak, and then south-east toward the Lava Tower, also known as the "Shark's Tooth" (elev. 4650m). The Arrow Glacier is reached at a second intersection just after the tower. After that, we descend further at 3,960 meters to
spend the night at Barranco Camp.`,
          },
          {
            day: 4,
            title: "From Barranco Camp to Karanga Camp",
            altitude: "3960m - 4035m",
            distance: "5 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `After breakfast, we begin our ascent along a steep ridge leading to the thrilling Barranco Wall, followed by a trek into the Karanga Valley and the junction that connects with the Mweka Trail. This day offers one of the most spectacular views, as you witness the remarkable skill, agility,and strength of your crew effortlessly navigating the wall. We spend the night at Karanga Camp.`,
          },
          {
            day: 5,
            title: "From Karanga Camp to Barafu Camp",
            altitude: "4035m - 4673m",
            distance: "4 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `After breakfast, we begin our ascent along a steep ridge leading to the thrilling Barranco Wall, followed by a trek into the Karanga Valley and the junction that connects with the Mweka Trail. This day offers one of the most spectacular views, as you witness the remarkable skill, agility,and strength of your crew effortlessly navigating the wall. We spend the night at Karanga Camp.`,
          },
          {
            day: 6,
            title: "From Barafu  to Summit to Mweka Camp",
            altitude: "4673m - 5895m - 3068m",
            distance: "17 Km",
            time: "12-16 hours",
            habitat: "Arctic",
            image: img,
            description: `We will depart from Barafu Camp at night 6-hour trek to Stella Point (5685m) often the most mentally and physically challenging part of the climb. From there, 2 hour climb to Uhuru Peak is coated with snow. The weather will determine how long you spend at the peak, so don't stay too long because you'll be tired and chilly. Congratulations, one step at a time you have now reached Uhuru Peak the highest point on Mount Kilimanjaro and the entire continent of Africa. It takes roughly 3 hours to descend to Barafu, where you can relax for a little before continuing on to Mweka Camp for dinner and overnight.`,
          },
          {
            day: 7,
            title: "From Mweka Camp to Mweka Gate ",
            altitude: "3068m - 1640m",
            distance: "10 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description: `It's time to say farewell to your staff after breakfast and a sincere ceremony of gratitude and team building. To pick up your summit certificates, we descend further to the Mweka Park Gate. We strongly advise Gaiters and trekking poles because the terrain is damp, muddy, and steep due to the significantly warmer temperature.
A car will pick you up at Mweka village at the gate and take you back to your Moshi, which should take
you around 30 minutes.`,
          },
        ],
        pricing: [
          { group: "1 person", price: 1935 },
          { group: "2-4 people", price: 1850 },
          { group: "5-7 people", price: 1800 },
          { group: "8-10 people", price: 1750 },
          { group: "11+ people", price: 1700 },
        ],
      },
      "8-days": {
        duration: "8 Days",
        tabDescription: `The trail begins on the western side of Mount Kilimanjaro, with a scenic drive from Moshi to
Londorossi Gate. The initial two days involve trekking through lush rainforests to reach Shira
Ridge. The route then extends across the entire Shira Plateau from west to east, providing a
relatively gentle and enjoyable hike. While the trail remains uncrowded at first, it merges with
the Machame route near Lava Tower. From there, climbers follow the Southern Circuit beneath
Kilimanjaro’s Southern Ice Field before making the final ascent from Barafu. The descent
follows the Mweka route`,
        description: `The Lemosho route is widely regarded as the most picturesque trail on Mount Kilimanjaro, offering breathtaking views from various angles. As one of the more recent trails, it is an excellent option for climbers. This route is particularly favored due to its perfect combination of minimal crowds, stunning landscapes, and a high success rate for reaching the summit. Almighty Kilimanjaro specializes in guiding climbers along the Lemosho route, with most of our clients choosing it and consistently expressing their satisfaction. `,
        itinerary: [
          {
            day: 1,
            title: "From Londrosi Gate  to Mti Mkubwa Camp",
            altitude: "2100m - 2785m",
            distance: "6 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description: `Leaving Moshi, a 45-minute drive winds through charming mountainside villages before arriving at the Kilimanjaro National Park Gate. While we wait for our permits to be processed, we can observe the lively preparations of various trekking teams gearing up for their journey. As we set
off, enjoy the lush rainforest scenery and winding trails while your guide shares insights about the region’s flora, fauna, and wildlife. The lower sections of the trail can be muddy and slippery, so we strongly recommend using gaiters and trekking poles for better stability.`,
          },
          {
            day: 2,
            title: "From Mti Mkubwa to Shira 1 Camp",
            altitude: "2785m - 3504m",
            distance: "8 Km",
            time: "5-6 hours",
            habitat: "Heath",
            image: img,
            description: `After a restful night and a nourishing breakfast, we leave the rainforest behind and follow a
steadily ascending trail. As we climb higher, expansive views begin to unfold, eventually leading
us to the edge of the Shira Plateau. With the increasing altitude, temperatures start to drop.`,
          },
          {
            day: 3,
            title: "From Shira 1 Camp to Shira Hut",
            altitude: "3504m - 4200m",
            distance: "14 Km",
            time: "5-7 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `We spend the entire day exploring the vast Shira Plateau, taking a leisurely walk eastward toward Kibo’s glacier-covered peak. The trail crosses the plateau, leading to Shira 2 Camp, nestled in moorland meadows beside a stream. From there, we proceed to Moir Hut, a secluded campsite at the base of the Lent Hills. The area offers several hiking options, providing a great opportunity for acclimatization. Notably, Shira is among the highest plateaus in the world.`,
          },
          {
            day: 4,
            title: "From Shira to Lava Camp to Barranco Camp ",
            altitude: "4200m - 4630m - 3960m",
            distance: "7 Km",
            time: "4-6 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `After breakfast upon leaving the Shira Plateau, we head east up a ridge through rocky, semi-desert terrains, past the intersection leading to the Kibo peak, and then south-east toward the Lava Tower, also known as the "Shark's Tooth" (elev. 4650m). The Arrow Glacier is reached at a second intersection just after the tower. After that, we descend further at 3,960 meters to
spend the night at Barranco Camp.`,
          },
          {
            day: 5,
            title: "From Barranco Camp to Karanga Camp",
            altitude: "3960m - 4035m",
            distance: "5 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `After breakfast, we begin our ascent along a steep ridge leading to the thrilling Barranco Wall, followed by a trek into the Karanga Valley and the junction that connects with the Mweka Trail. This day offers one of the most spectacular views, as you witness the remarkable skill, agility,
and strength of your crew effortlessly navigating the wall. We spend the night at Karanga Camp.`,
          },
          {
            day: 6,
            title: "From Karanga Camp to Barafu Camp",
            altitude: "4035m - 4673m",
            distance: "4 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `After breakfast, we begin our ascent along a steep ridge leading to the thrilling Barranco Wall, followed by a trek into the Karanga Valley and the junction that connects with the Mweka Trail. This day offers one of the most spectacular views, as you witness the remarkable skill, agility,and strength of your crew effortlessly navigating the wall. We spend the night at Karanga Camp.`,
          },
          {
            day: 7,
            title: "From Barafu  to Summit to Mweka Camp",
            altitude: "4673m - 5895m - 3068m",
            distance: "17 Km",
            time: "12-16 hours",
            habitat: "Arctic",
            image: img,
            description: `We will depart from Barafu Camp at night 6-hour trek to Stella Point (5685m) often the most mentally and physically challenging part of the climb. From there, 2 hour climb to Uhuru Peak is coated with snow. The weather will determine how long you spend at the peak, so don't stay too long because you'll be tired and chilly. Congratulations, one step at a time you have now reached Uhuru Peak the highest point on Mount Kilimanjaro and the entire continent of Africa. It takes roughly 3 hours to descend to Barafu, where you can relax for a little before continuing on to Mweka Camp for dinner and overnight.`,
          },
          {
            day: 8,
            title: "From Mweka Camp to Mweka Gate ",
            altitude: "3068m - 1640m",
            distance: "10 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description: `It's time to say farewell to your staff after breakfast and a sincere ceremony of gratitude and team building. To pick up your summit certificates, we descend further to the Mweka Park Gate. We strongly advise Gaiters and trekking poles because the terrain is damp, muddy, and steep due to the significantly warmer temperature.
A car will pick you up at Mweka village at the gate and take you back to your Moshi, which should take
you around 30 minutes.`,
          },
        ],
        pricing: [
          { group: "1 person", price: 2300 },
          { group: "2-4 people", price: 2200 },
          { group: "5-7 people", price: 1950 },
          { group: "8-10 people", price: 1850 },
          { group: "11+ people", price: 1800 },
        ],
      },
    },
    image: img,
    difficulty: "Moderate",
    success_rate: "90%",
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      "Transfer to and pick-up from the gate of Kilimanjaro National Park.",
      "All park fees collected by the Kilimanjaro National Park (conservation fees, camping fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania National Parks Authority).",
      "Tented accommodation on Mount Kilimanjaro (modern, comfortable 4-Season tents, North Face VE-25 ).",
      "All meals on the hike.",
      "4-inch (10-cm) thick and comfortable sleeping mats",
      "Oxygen cylinders and oximeters",
      "GPS-tracking service",
      "Complete medical kits.",
      "Professional guides, licensed by Kilimanjaro National Park. All our guides are the holder of Wilderness First Responder or Wilderness First Aid certifications. All our guides have 10+years of successful mountaineering experience.",
      "Dedicated support crew (assistant guides, camp master, porters, cooks.etc).",
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation before and after trekking",
      "Visa fees",
      "Personal gear rentals",
      "Tips for the mountain crew.",
      "Mountaineering insurance",
    ],
  },

  "rongai-route": {
    showTabDescription: true,
    showPriceTab: true,
    name: "Rongai Route",
    nickname: "Wilderness Route",
    hasMultipleDays: true,
    variants: {
      "6-days": {
        duration: "6 Days",
        tabDescription: `The Rongai Route begins with a scenic drive from Moshi to the Rongai Gate near the Kenyan border, covering approximately 70 to 80 kilometers and taking about 4-5 hours. It’s the only route that approaches Kilimanjaro from the north, offering a quieter and less crowded experience. The route starts in dry savannah and gradually transitions through moorland and alpine desert, with key resting stops including Simba Camp at the forest edge, followed by Second Cave or Kikelewa Camp in the heath zone. From there, hikers proceed to Mawenzi Tarn, nestled beneath the dramatic Mawenzi Peak, then cross the Saddle to reach Kibo Hut— the base for the final summit push. After reaching Uhuru Peak, the descent follows the Marangu Route, with Horombo Hut as the last overnight stop before exiting through Marangu Gate.`,
        description: `The only way to reach Kilimanjaro from the north, close to the Kenyan border, is via the Rongai route. Although it is becoming more and more popular with climbers, it is still not overly crowded. For those looking for an alternative to the more crowded Marangu route, Rongai is a fantastic option because it provides a more gradual ascent than other routes on the mountain.`,
        itinerary: [
          {
            day: 1,
            title: "From Rongai Gate to Simba  Camp",
            altitude: "2100m - 2785m",
            distance: "6 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description: `It will take 4-5 hour drive from Moshi to the Kilimanjaro National Park Gate, passing through the Nale Muru village. There is only one route over on the north eastern side of the mountain, Rongai route. After the climbing permits and rescue service registration are completed, the group will begin their hike up to Simba Camp. With breathtaking views of the Kenyan plains, Simba Camp is located close to the first cave
at the edge of the moorland zone.`,
          },
          {
            day: 2,
            title: "From Simba Camp to Second Cave Camp",
            altitude: "2785m - 3504m",
            distance: "8 Km",
            time: "5-6 hours",
            habitat: "Heath",
            image: img,
            description: `After early morning breakfast, the group will leave Simba Camp to Second Cave Camp, your second high altitude camp. You will have your first look at the ice fields on the Eastern crater rim and enjoy some amazing views of Kibo. As you get to Second Cave for the overnight, the small shrubs of moorland
become sparse and temperature starts to decrease.`,
          },
          {
            day: 3,
            title: "From Second Cave Camp to Third Cave ",
            altitude: "3504m - 4630m - 3960m",
            distance: "10 Km",
            time: "6-8 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `After breafast , journey to steady climb across the Moorland in the direction of the ragged peaks of Mawenzi begins. You get closer to the Easter ice fields on this comparatively short hiking day, which keeps highlighting their splendor. Keep an eye on your body and notify your guide if you experience any
symptoms of altitude sickness.`,
          },
          {
            day: 4,
            title: "From Third Cave Camp to Kibo Hut",
            altitude: "3960m - 4035m",
            distance: "5 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `From the Third Cave, you leave the semi-desert area early in the morning and start your hike into the Alpine Desert, where you will spend the rest of your trip. You will reach the Kibo Huts today by hiking just below the Kibo crater wall. You will next turn into the Marangu Route, which will be your hiking
route to the top. Before going to bed at 7 PM, you will get your gear and clothes ready (changing the batteries in your camera and headlamp) and attempt to get a few hours of sleep before your summit
attempt.`,
          },
          {
            day: 5,
            title: "From Kibo Hut to Summit to Horombo Hut",
            altitude: "4035m - 4673m",
            distance: "4 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `Early wakeup, breakfast and the start of trekking to Mawenzi Tarn Camp, which is situated at the foot of Mawenzi Volcano, Kilimanjaro's second summit. When you reach the camp, you will have lunch and rest, after which there will be an acclimatization hike towards Mawenzi Volcano, followed by a hike back down to Mawenzi Tarn Camp, where you will have dinner in the evening.`,
          },
          {
            day: 6,
            title: "From Horombo Huts to Marangu Gate ",
            altitude: "4673m - 5895m - 3068m",
            distance: "17 Km",
            time: "12-16 hours",
            habitat: "Arctic",
            image: img,
            description: `It's time to say farewell to your staff after breakfast and a sincere ceremony of gratitude and team building. We keep going down, to Marangu Park Gate where you will be given your certificates. We strongly advise Gaiters and trekking poles because the terrain is damp, muddy, and steep due to the
significantly warmer temperature. A car will pick you up at the entrance and take you back to your Moshi
for about 45 minutes drive.`,
          },
        ],
        pricing: [
          { group: "1 person", price: 1920 },
          { group: "2-4 people", price: 1850 },
          { group: "5-7 people", price: 1700 },
          { group: "8-10 people", price: 1650 },
          { group: "11+ people", price: 1600 },
        ],
      },
      "7-days": {
        duration: "7 Days",
        tabDescription: `The Rongai Route begins with a scenic drive from Moshi to the Rongai Gate near the Kenyan border, covering approximately 70 to 80 kilometers and taking about 4-5 hours. It’s the only route that approaches Kilimanjaro from the north, offering a quieter and less crowded experience. The route starts in dry savannah and gradually transitions through moorland and alpine desert, with key resting stops including Simba Camp at the forest edge, followed by Second Cave or Kikelewa Camp in the heath zone. From there, hikers proceed to Mawenzi Tarn, nestled beneath the dramatic Mawenzi Peak, then cross the Saddle to reach Kibo Hut— the base for the final summit push. After reaching Uhuru Peak, the descent follows the Marangu Route, with Horombo Hut as the last overnight stop before exiting through Marangu Gate.`,
        description: `The only way to reach Kilimanjaro from the north, close to the Kenyan border, is via the Rongai route. Although it is becoming more and more popular with climbers, it is still not overly crowded. For those looking for an alternative to the more crowded Marangu route, Rongai is a fantastic option because it provides a more gradual ascent than other routes on the mountain.`,
        itinerary: [
          {
            day: 1,
            title: "From Rongai Gate to Simba  Camp",
            altitude: "2100m - 2785m",
            distance: "6 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description: `It will take 4-5 hour drive from Moshi to the Kilimanjaro National Park Gate, passing through the Nale Muru village. There is only one route over on the north eastern side of the mountain, Rongai route. After the climbing permits and rescue service registration are completed, the group will begin their hike up to Simba Camp. With breathtaking views of the Kenyan plains, Simba Camp is located close to the first cave
at the edge of the moorland zone.`,
          },
          {
            day: 2,
            title: "From Simba Camp to Second Cave Camp",
            altitude: "2785m - 3504m",
            distance: "8 Km",
            time: "5-6 hours",
            habitat: "Heath",
            image: img,
            description: `After early morning breakfast, the group will leave Simba Camp to Second Cave Camp, your second high altitude camp. You will have your first look at the ice fields on the Eastern crater rim and enjoy some amazing views of Kibo. As you get to Second Cave for the overnight, the small shrubs of moorland
become sparse and temperature starts to decrease.`,
          },
          {
            day: 3,
            title: "From Second Cave Camp to Kikelewa Camp",
            altitude: "3504m - 4200m",
            distance: "14 Km",
            time: "5-7 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `After breafast , journey to steady climb across the Moorland in the direction of the ragged peaks of Mawenzi begins. You get closer to the Easter ice fields on this comparatively short hiking day, which keeps highlighting their splendor. Keep an eye on your body and notify your guide if you experience any
symptoms of altitude sickness.`,
          },
          {
            day: 4,
            title: "From Kikelewa Camp to Mawenzi Tarn",
            altitude: "4200m - 4630m - 3960m",
            distance: "7 Km",
            time: "4-6 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `Early wakeup, breakfast and the start of trekking to Mawenzi Tarn Camp, which is situated at the foot of Mawenzi Volcano, Kilimanjaro's second summit. When you reach the camp, you will have lunch and rest,after which there will be an acclimatization hike towards Mawenzi Volcano, followed by a hike back down to Mawenzi Tarn Camp, where you will have dinner in the evening.`,
          },
          {
            day: 5,
            title: "From Mawenzi Tarn to Kibo Hut",
            altitude: "3960m - 4035m",
            distance: "5 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `Early wakeup, breakfast and the start of trekking to Mawenzi Tarn Camp, which is situated at the foot of Mawenzi Volcano, Kilimanjaro's second summit. When you reach the camp, you will have lunch and rest,after which there will be an acclimatization hike towards Mawenzi Volcano, followed by a hike back down to Mawenzi Tarn Camp, where you will have dinner in the evening.`,
          },
          {
            day: 6,
            title: "From Kibo Hut to Summit to Horombo Hut",
            altitude: "4035m - 4673m",
            distance: "4 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `Early wakeup, breakfast and the start of trekking to Mawenzi Tarn Camp, which is situated at the foot of Mawenzi Volcano, Kilimanjaro's second summit. When you reach the camp, you will have lunch and rest, after which there will be an acclimatization hike towards Mawenzi Volcano, followed by a hike back down to Mawenzi Tarn Camp, where you will have dinner in the evening.`,
          },
          {
            day: 7,
            title: "From Horombo Huts to Marangu Gate ",
            altitude: "4673m - 5895m - 3068m",
            distance: "17 Km",
            time: "12-16 hours",
            habitat: "Arctic",
            image: img,
            description: `It's time to say farewell to your staff after breakfast and a sincere ceremony of gratitude and team building. We keep going down, to Marangu Park Gate where you will be given your certificates. We strongly advise Gaiters and trekking poles because the terrain is damp, muddy, and steep due to the
significantly warmer temperature. A car will pick you up at the entrance and take you back to your Moshi
for about 45 minutes drive.`,
          },
        ],
        pricing: [
          { group: "1 person", price: 2050 },
          { group: "2-4 people", price: 1900 },
          { group: "5-7 people", price: 1850 },
          { group: "8-10 people", price: 1750 },
          { group: "11+ people", price: 1700 },
        ],
      },
    },
    image: img,
    difficulty: "Moderate",
    success_rate: "90%",
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      "Transfer to and pick-up from the gate of Kilimanjaro National Park.",
      "All park fees collected by the Kilimanjaro National Park (conservation fees, camping fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania National Parks Authority).",
      "Tented accommodation on Mount Kilimanjaro (modern, comfortable 4-Season tents, North Face VE-25 ).",
      "All meals on the hike.",
      "4-inch (10-cm) thick and comfortable sleeping mats",
      "Oxygen cylinders and oximeters",
      "GPS-tracking service",
      "Complete medical kits.",
      "Professional guides, licensed by Kilimanjaro National Park. All our guides are the holder of Wilderness First Responder or Wilderness First Aid certifications. All our guides have 10+years of successful mountaineering experience.",
      "Dedicated support crew (assistant guides, camp master, porters, cooks.etc).",
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation before and after trekking",
      "Visa fees",
      "Personal gear rentals",
      "Tips for the mountain crew.",
      "Mountaineering insurance",
    ],
  },

  "shira-route": {
    showTabDescription: true,
    showPriceTab: true,
    name: "Shira Route",
    nickname: "Wilderness Route",
    hasMultipleDays: true,
    variants: {
      "7-days": {
        duration: "7 Days",
        tabDescription:
          "The 7-day Lemosho route offers a more direct approach to the summit while still providing excellent scenery and good acclimatization. This route is perfect for experienced climbers who want to experience the wilderness beauty of Lemosho in a shorter timeframe.",
        description:
          "The 7-day Lemosho route is a condensed version of our most scenic trail, offering breathtaking views and excellent wildlife viewing opportunities. This route provides a perfect balance of challenge and beauty for experienced climbers.",
        itinerary: [
          {
            day: 1,
            title: "Londorossi Gate to Forest Camp",
            altitude: "2100m - 2785m",
            distance: "6 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description:
              "Drive to Londorossi Gate for registration and permits. Begin hiking through pristine forest with chances to see wildlife.",
          },
          {
            day: 2,
            title: "Forest Camp to Shira Camp 1",
            altitude: "2785m - 3504m",
            distance: "8 Km",
            time: "5-6 hours",
            habitat: "Heath",
            image: img,
            description:
              "We continue on the trail leading out of the forest and into a savannah of tall grasses, heather, and volcanic rock draped with lichen beards.",
          },
          {
            day: 3,
            title: "Shira Camp 1 to Lava Tower to Barranco Camp",
            altitude: "3504m - 4630m - 3960m",
            distance: "10 Km",
            time: "6-8 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "From the Shira Plateau, we continue to the east up a ridge, passing the junction towards the peak of Kibo.",
          },
          {
            day: 4,
            title: "Barranco Camp to Karanga Camp",
            altitude: "3960m - 4035m",
            distance: "5 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "After breakfast, we leave Barranco and continue on a steep ridge passing the Barranco Wall, to the Karanga Valley campsite.",
          },
          {
            day: 5,
            title: "Karanga Camp to Barafu Camp",
            altitude: "4035m - 4673m",
            distance: "4 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "After breakfast, we leave Karanga and hit the junction which connects with the Mweka Trail.",
          },
          {
            day: 6,
            title: "Barafu Camp to Summit to Mweka Camp",
            altitude: "4673m - 5895m - 3068m",
            distance: "17 Km",
            time: "12-16 hours",
            habitat: "Arctic",
            image: img,
            description:
              "Very early in the morning (midnight to 2am), we continue our way to the summit between the Rebmann and Ratzel glaciers.",
          },
          {
            day: 7,
            title: "Mweka Camp to Mweka Gate",
            altitude: "3068m - 1640m",
            distance: "10 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description:
              "After breakfast, we continue the descent down to the Mweka Park Gate to receive your summit certificates.",
          },
        ],
        pricing: [
          { group: "1 person", price: 2000 },
          { group: "2-4 people", price: 1850 },
          { group: "5-7 people", price: 1800 },
          { group: "8-10 people", price: 1700 },
          { group: "11+ people", price: 1650 },
        ],
      },
      "8-days": {
        duration: "8 Days",
        tabDescription:
          "The 8-day Lemosho route is widely regarded as the most picturesque trail on Mount Kilimanjaro, offering breathtaking views from various angles. As one of the more recent trails, it is an excellent option for climbers. This route is particularly favored due to its perfect combination of minimal crowds, stunning landscapes, and a high success rate for reaching the summit.",
        description:
          "The Lemosho route is widely regarded as the most picturesque trail on Mount Kilimanjaro, offering breathtaking views from various angles. As one of the more recent trails, it is an excellent option for climbers. This route is particularly favored due to its perfect combination of minimal crowds, stunning landscapes, and a high success rate for reaching the summit.",
        itinerary: [
          {
            day: 1,
            title: "Londorossi Gate to Forest Camp",
            altitude: "2100m - 2785m",
            distance: "6 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description:
              "Drive to Londorossi Gate for registration and permits. Begin hiking through pristine forest with chances to see wildlife.",
          },
          {
            day: 2,
            title: "Forest Camp to Shira Camp 1",
            altitude: "2785m - 3504m",
            distance: "8 Km",
            time: "5-6 hours",
            habitat: "Heath",
            image: img,
            description:
              "We continue on the trail leading out of the forest and into a savannah of tall grasses, heather, and volcanic rock draped with lichen beards.",
          },
          {
            day: 3,
            title: "Shira Camp 1 to Shira 2 to Moir Hut",
            altitude: "3504m - 4200m",
            distance: "14 Km",
            time: "5-7 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "We explore the Shira plateau for a full day. It is a gentle walk east toward Kibo's glaciered peak, across the plateau which leads to Shira 2 camp.",
          },
          {
            day: 4,
            title: "Moir Hut to Lava Tower to Barranco Camp",
            altitude: "4200m - 4630m - 3960m",
            distance: "7 Km",
            time: "4-6 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "From the Shira Plateau, we continue to the east up a ridge, passing the junction towards the peak of Kibo.",
          },
          {
            day: 5,
            title: "Barranco Camp to Karanga Camp",
            altitude: "3960m - 4035m",
            distance: "5 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "After breakfast, we leave Barranco and continue on a steep ridge passing the Barranco Wall, to the Karanga Valley campsite.",
          },
          {
            day: 6,
            title: "Karanga Camp to Barafu Camp",
            altitude: "4035m - 4673m",
            distance: "4 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "After breakfast, we leave Karanga and hit the junction which connects with the Mweka Trail.",
          },
          {
            day: 7,
            title: "Barafu Camp to Summit to Mweka Camp",
            altitude: "4673m - 5895m - 3068m",
            distance: "17 Km",
            time: "12-16 hours",
            habitat: "Arctic",
            image: img,
            description:
              "Very early in the morning (midnight to 2am), we continue our way to the summit between the Rebmann and Ratzel glaciers.",
          },
          {
            day: 8,
            title: "Mweka Camp to Mweka Gate",
            altitude: "3068m - 1640m",
            distance: "10 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description:
              "After breakfast, we continue the descent down to the Mweka Park Gate to receive your summit certificates.",
          },
        ],
        pricing: [
          { group: "1 person", price: 2200 },
          { group: "2-4 people", price: 2000 },
          { group: "5-7 people", price: 1950 },
          { group: "8-10 people", price: 1850 },
          { group: "11+ people", price: 1800 },
        ],
      },
    },
    image: img,
    difficulty: "Moderate",
    success_rate: "90%",
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      "Transfer to and pick-up from the gate of Kilimanjaro National Park.",
      "All park fees collected by the Kilimanjaro National Park (conservation fees, camping fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania National Parks Authority).",
      "Tented accommodation on Mount Kilimanjaro (modern, comfortable 4-Season tents, North Face VE-25 ).",
      "All meals on the hike.",
      "4-inch (10-cm) thick and comfortable sleeping mats",
      "Oxygen cylinders and oximeters",
      "GPS-tracking service",
      "Complete medical kits.",
      "Professional guides, licensed by Kilimanjaro National Park. All our guides are the holder of Wilderness First Responder or Wilderness First Aid certifications. All our guides have 10+years of successful mountaineering experience.",
      "Dedicated support crew (assistant guides, camp master, porters, cooks.etc).",
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation before and after trekking",
      "Visa fees",
      "Personal gear rentals",
      "Tips for the mountain crew.",
      "Mountaineering insurance",
    ],
  },

  "umbwe-route": {
    showTabDescription: true,
    showPriceTab: true,
    name: "Umbwe Route",
    nickname: "Wilderness Route",
    hasMultipleDays: true,
    variants: {
      "6-days": {
        duration: "7 Days",
        tabDescription: `The Umbwe Route starts with a short drive of about 30 kilometers from Moshi to the Umbwe Gate, typically taking around 1 hour. Known as the steepest and most direct route up Kilimanjaro, it’s favored by experienced trekkers seeking a challenge and solitude. The trail ascends rapidly through dense rainforest to Umbwe Cave Camp, then continues to Barranco Camp, where it joins the Machame Route. From there, climbers move through the scenic Barranco Wall to Karanga Camp, then onward to Barafu Camp, the final stop before the summit attempt. After reaching Uhuru Peak, the descent follows the Mweka Route, with a final rest at Mweka Camp before exiting through Mweka Gate.`,
        description: `On Kilimanjaro, the Umbwe Route is arguably the least traveled. Along the Machame Route, it begins at the tropical rainforest and joins it at Barranco Camp (3800m). Although Umbwe is the shortest path, it is
one of the most strenuous on Kilimanjaro due to its steep ascent and little acclimatization periods. Nevertheless, it showcases the mountain's natural beauty with its various habitat zones and expansive vistas. This is considered one of the most difficult routes to climb Kilimanjaro.`,
        itinerary: [
          {
            day: 1,
            title: "Londorossi Gate to Forest Camp",
            altitude: "2100m - 2785m",
            distance: "6 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description:
              "Drive to Londorossi Gate for registration and permits. Begin hiking through pristine forest with chances to see wildlife.",
          },
          {
            day: 2,
            title: "Forest Camp to Shira Camp 1",
            altitude: "2785m - 3504m",
            distance: "8 Km",
            time: "5-6 hours",
            habitat: "Heath",
            image: img,
            description:
              "We continue on the trail leading out of the forest and into a savannah of tall grasses, heather, and volcanic rock draped with lichen beards.",
          },
          {
            day: 3,
            title: "Shira Camp 1 to Lava Tower to Barranco Camp",
            altitude: "3504m - 4630m - 3960m",
            distance: "10 Km",
            time: "6-8 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "From the Shira Plateau, we continue to the east up a ridge, passing the junction towards the peak of Kibo.",
          },
          {
            day: 4,
            title: "Barranco Camp to Karanga Camp",
            altitude: "3960m - 4035m",
            distance: "5 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "After breakfast, we leave Barranco and continue on a steep ridge passing the Barranco Wall, to the Karanga Valley campsite.",
          },
          {
            day: 5,
            title: "Karanga Camp to Barafu Camp",
            altitude: "4035m - 4673m",
            distance: "4 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "After breakfast, we leave Karanga and hit the junction which connects with the Mweka Trail.",
          },
          {
            day: 6,
            title: "Barafu Camp to Summit to Mweka Camp",
            altitude: "4673m - 5895m - 3068m",
            distance: "17 Km",
            time: "12-16 hours",
            habitat: "Arctic",
            image: img,
            description:
              "Very early in the morning (midnight to 2am), we continue our way to the summit between the Rebmann and Ratzel glaciers.",
          },
          {
            day: 7,
            title: "Mweka Camp to Mweka Gate",
            altitude: "3068m - 1640m",
            distance: "10 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description:
              "After breakfast, we continue the descent down to the Mweka Park Gate to receive your summit certificates.",
          },
        ],
        pricing: [
          { group: "1 person", price: 1800 },
          { group: "2-4 people", price: 1740 },
          { group: "5-7 people", price: 1630 },
          { group: "8-10 people", price: 1560 },
          { group: "11+ people", price: 1510 },
        ],
      },
      "7-days": {
        duration: "8 Days",
        tabDescription:
          "The 8-day Lemosho route is widely regarded as the most picturesque trail on Mount Kilimanjaro, offering breathtaking views from various angles. As one of the more recent trails, it is an excellent option for climbers. This route is particularly favored due to its perfect combination of minimal crowds, stunning landscapes, and a high success rate for reaching the summit.",
        description:
          "The Lemosho route is widely regarded as the most picturesque trail on Mount Kilimanjaro, offering breathtaking views from various angles. As one of the more recent trails, it is an excellent option for climbers. This route is particularly favored due to its perfect combination of minimal crowds, stunning landscapes, and a high success rate for reaching the summit.",
        itinerary: [
          {
            day: 1,
            title: "Londorossi Gate to Forest Camp",
            altitude: "2100m - 2785m",
            distance: "6 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description:
              "Drive to Londorossi Gate for registration and permits. Begin hiking through pristine forest with chances to see wildlife.",
          },
          {
            day: 2,
            title: "Forest Camp to Shira Camp 1",
            altitude: "2785m - 3504m",
            distance: "8 Km",
            time: "5-6 hours",
            habitat: "Heath",
            image: img,
            description:
              "We continue on the trail leading out of the forest and into a savannah of tall grasses, heather, and volcanic rock draped with lichen beards.",
          },
          {
            day: 3,
            title: "Shira Camp 1 to Shira 2 to Moir Hut",
            altitude: "3504m - 4200m",
            distance: "14 Km",
            time: "5-7 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "We explore the Shira plateau for a full day. It is a gentle walk east toward Kibo's glaciered peak, across the plateau which leads to Shira 2 camp.",
          },
          {
            day: 4,
            title: "Moir Hut to Lava Tower to Barranco Camp",
            altitude: "4200m - 4630m - 3960m",
            distance: "7 Km",
            time: "4-6 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "From the Shira Plateau, we continue to the east up a ridge, passing the junction towards the peak of Kibo.",
          },
          {
            day: 5,
            title: "Barranco Camp to Karanga Camp",
            altitude: "3960m - 4035m",
            distance: "5 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "After breakfast, we leave Barranco and continue on a steep ridge passing the Barranco Wall, to the Karanga Valley campsite.",
          },
          {
            day: 6,
            title: "Karanga Camp to Barafu Camp",
            altitude: "4035m - 4673m",
            distance: "4 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "After breakfast, we leave Karanga and hit the junction which connects with the Mweka Trail.",
          },
          {
            day: 7,
            title: "Barafu Camp to Summit to Mweka Camp",
            altitude: "4673m - 5895m - 3068m",
            distance: "17 Km",
            time: "12-16 hours",
            habitat: "Arctic",
            image: img,
            description:
              "Very early in the morning (midnight to 2am), we continue our way to the summit between the Rebmann and Ratzel glaciers.",
          },
          {
            day: 8,
            title: "Mweka Camp to Mweka Gate",
            altitude: "3068m - 1640m",
            distance: "10 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description:
              "After breakfast, we continue the descent down to the Mweka Park Gate to receive your summit certificates.",
          },
        ],
        pricing: [
          { group: "1 person", price: 2200 },
          { group: "2-4 people", price: 2000 },
          { group: "5-7 people", price: 1950 },
          { group: "8-10 people", price: 1850 },
          { group: "11+ people", price: 1800 },
        ],
      },
    },
    image: img,
    difficulty: "Moderate",
    success_rate: "90%",
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      "Transfer to and pick-up from the gate of Kilimanjaro National Park.",
      "All park fees collected by the Kilimanjaro National Park (conservation fees, camping fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania National Parks Authority).",
      "Tented accommodation on Mount Kilimanjaro (modern, comfortable 4-Season tents, North Face VE-25 ).",
      "All meals on the hike.",
      "4-inch (10-cm) thick and comfortable sleeping mats",
      "Oxygen cylinders and oximeters",
      "GPS-tracking service",
      "Complete medical kits.",
      "Professional guides, licensed by Kilimanjaro National Park. All our guides are the holder of Wilderness First Responder or Wilderness First Aid certifications. All our guides have 10+years of successful mountaineering experience.",
      "Dedicated support crew (assistant guides, camp master, porters, cooks.etc).",
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation before and after trekking",
      "Visa fees",
      "Personal gear rentals",
      "Tips for the mountain crew.",
      "Mountaineering insurance",
    ],
  },
  "marangu-route": {
    showTabDescription: true,
    showPriceTab: true,
    name: "Marangu Route",
    nickname: "Wilderness Route",
    hasMultipleDays: true,
    variants: {
      "6-days": {
        duration: "6 Days",
        tabDescription: `The Marangu Route begins with a drive from Moshi to Marangu Gate, a distance of approximately 80 kilometers that takes about 1.5 to 2 hours by car. From the gate, climbers start their ascent with the first resting stop at Mandara Hut, nestled in the lush rainforest. The next key stop is Horombo Hut, located in the moorland zone, which also serves as an acclimatization point for those taking the longer 6-day option. Further up is Kibo Hut in the alpine desert, the final resting place before the challenging summit push to Uhuru Peak. After reaching the summit, climbers descend and spend one last night at Horombo Hut before heading back down to the gate.`,
        description: `Often referred to as the “Coca-Cola” route, the Marangu route is a classic trek on Mount Kilimanjaro and is the oldest, most established path on the mountain. Many climbers prefer the Marangu route for its relatively easier ascent, thanks to its gradual slope. It is also the only route on Kilimanjaro that offers dormitory-style sleeping huts.`,
        itinerary: [
          {
            day: 1,
            title: "From Marangu Gate to Mandara Huts",
            altitude: "2100m - 2785m",
            distance: "6 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description:
              "It takes 1 hour drive from Moshi to the Kilimanjaro National Park Gate, passing via the Marangu Village. After completing the required registration procedures at the entrance, you will start your journey into the verdant rainforest. As your guide explains the local flora and fauna as well as the natural wildlife, take in the stunning rainforest views and winding trails. The trail can be fairly slick and muddy at these lower elevations. Trekking poles and gaiters are highly recommended here.",
          },
          {
            day: 2,
            title: "From Mandara Huts to Horombo Huts",
            altitude: "2785m - 3504m",
            distance: "8 Km",
            time: "5-6 hours",
            habitat: "Heath",
            image: img,
            description:
              "Following a restful night's sleep and a substantial breakfast, we leave the rain forest and proceed uphill through heathland in search of giant lobelias and groundsels. Proceed upward into open moorlands, where the predominant vegetation consists of tiny shrubs. Take a break midway for lunch and take in the breathtaking sights of Mawenzi. Reach the Horombo Huts in the late afternoon under the breathtaking vista of Kibo Summit. The temperature starts to decrease.",
          },
          {
            day: 3,
            title: "Horombo  Huts ",
            altitude: "3504m - 4630m - 3960m",
            distance: "10 Km",
            time: "6-8 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "You will stay at Horombo Hut for an additional day to aid in acclimatization, which will provide your body more time to adjust to the rising altitude. You have two options for this day: either relax at the huts or walk up to the Mawenzi base camp before heading back to the Horombo Huts. On your fourth day, you will continue to the Kibo Huts for your midnight start to the summit.",
          },
          {
            day: 4,
            title: "From Horombo Huts to Kibo Huts",
            altitude: "3960m - 4035m",
            distance: "5 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `
Early mornings will be accompanied with breakfast before departure on a steep ridge up to the adventurous Barranco Wall to the Karanga Valley and the junction, which connects, with the Mweka Trail. One of the most amazing days to witness your crew's strength, power, and agility as they seemingly effortlessly zoom over this wall. We keep going up toward Barafu Camp, and once you get there, you've finished the South Circuit, which has a number of amazing vantage points of the peak. As we get ready for summit night, we'll have an early dinner and spend the night at the Barafu Camp.
`,
          },
          {
            day: 5,
            title: "From Kibo Hut to Summit to Horombo Camp",
            altitude: "4035m - 4673m",
            distance: "4 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `
We will depart from Barafu Camp at night 6-hour trek to Stella Point (5685m) often the most mentally and physically challenging part of the climb. From there, 2 hour climb to Uhuru Peak is coated with snow. The weather will determine how long you spend at the peak, so don't stay too long because you'll be tired and chilly. Congratulations, one step at a time you have now reached Uhuru Peak the highest point on Mount Kilimanjaro and the entire continent of Africa. It takes roughly 3 hours to descend to Barafu, where you can relax for a little before continuing on to Mweka Camp for dinner and overnight.`,
          },
          {
            day: 6,
            title: "From Horombo Huts to Marangu Gate ",
            altitude: "4673m - 5895m - 3068m",
            distance: "17 Km",
            time: "12-16 hours",
            habitat: "Arctic",
            image: img,
            description: `
It's time to say farewell to your staff after breakfast and a sincere ceremony of gratitude and team building. We keep going down, to Marangu Park Gate where you will be given your certificates. We strongly advise Gaiters and trekking poles because the terrain is damp, muddy, and steep due to the
significantly warmer temperature. A car will pick you up at the entrance and take you back to your Moshi
for about 45 minutes drive.`,
          },
        ],
        pricing: [
          { group: "1 person", price: 1650 },
          { group: "2-4 people", price: 1520 },
          { group: "5-7 people", price: 1450 },
          { group: "8-10 people", price: 1400 },
          { group: "11+ people", price: 1380 },
        ],
      },
      "5-days": {
        duration: "5 Days",
        tabDescription: `The Marangu Route begins with a drive from Moshi to Marangu Gate, a distance of approximately 80 kilometers that takes about 1.5 to 2 hours by car. From the gate, climbers start their ascent with the first resting stop at Mandara Hut, nestled in the lush rainforest. The next key stop is Horombo Hut, located in the moorland zone, which also serves as an acclimatization point for those taking the longer 6-day option. Further up is Kibo Hut in the alpine desert, the final resting place before the challenging summit push to Uhuru Peak. After reaching the summit, climbers descend and spend one last night at Horombo Hut before heading back down to the gate.`,

        description: `Often referred to as the “Coca-Cola” route, the Marangu route is a classic trek on Mount Kilimanjaro and is the oldest, most established path on the mountain. Many climbers prefer the Marangu route for its relatively easier ascent, thanks to its gradual slope. It is also the only route on Kilimanjaro that offers dormitory-style sleeping huts.`,
        itinerary: [
          {
            day: 1,
            title: "From Marangu Gate to Mandara Huts",
            altitude: "2100m - 2785m",
            distance: "6 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description: `
It takes 1 hour drive from Moshi to the Kilimanjaro National Park Gate, passing via the Marangu Village. After completing the required registration procedures at the entrance, you will start your journey into the verdant rainforest. As your guide explains the local flora and fauna as well as the natural wildlife, take in the stunning rainforest views and winding trails. The trail can be fairly slick and muddy at these lower elevations. Trekking poles and gaiters are highly recommended here.`,
          },
          {
            day: 2,
            title: "From Mandara Huts to Horombo Huts",
            altitude: "2785m - 3504m",
            distance: "8 Km",
            time: "5-6 hours",
            habitat: "Heath",
            image: img,
            description: `
Following a restful night's sleep and a substantial breakfast, we leave the rain forest and proceed uphill through heathland in search of giant lobelias and groundsels. Proceed upward into open moorlands, where the predominant vegetation consists of tiny shrubs. Take a break midway for lunch and take in the breathtaking sights of Mawenzi. Reach the Horombo Huts in the late afternoon under the breathtaking vista of Kibo Summit. The temperature starts to decrease.`,
          },
          {
            day: 3,
            title: "From Horombo Huts to Kibo Huts",
            altitude: "3504m - 4200m",
            distance: "14 Km",
            time: "5-7 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `
Early mornings will be accompanied with breakfast before departure on a steep ridge up to the adventurous Barranco Wall to the Karanga Valley and the junction, which connects, with the Mweka Trail. One of the most amazing days to witness your crew's strength, power, and agility as they seemingly effortlessly zoom over this wall. We keep going up toward Barafu Camp, and once you get there, you've finished the South Circuit, which has a number of amazing vantage
points of the peak. As we get ready for summit night, we'll have an early dinner and spend the night at the Barafu Camp.`,
          },
          {
            day: 4,
            title: "From Kibo Hut to Summit to Horombo Camp",
            altitude: "4200m - 4630m - 3960m",
            distance: "7 Km",
            time: "4-6 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `
We will depart from Barafu Camp at night 6-hour trek to Stella Point (5685m) often the most mentally and physically challenging part of the climb. From there, 2 hour climb to Uhuru Peak is coated with snow. The weather will determine how long you spend at the peak, so don't stay too long because you'll be tired and chilly. Congratulations, one step at a time you have now reached Uhuru Peak the highest point on Mount Kilimanjaro and the entire continent of Africa. It takes roughly 3 hours to descend to Barafu, where you can relax for a little before continuing on to Mweka Camp for dinner and overnight.`,
          },
          {
            day: 5,
            title: "From Horombo Huts to Marangu Gate ",
            altitude: "3960m - 4035m",
            distance: "5 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description: `
It's time to say farewell to your staff after breakfast and a sincere ceremony of gratitude and team building. We keep going down, to Marangu Park Gate where you will be given your certificates. We strongly advise Gaiters and trekking poles because the terrain is damp, muddy, and steep due to the
significantly warmer temperature. A car will pick you up at the entrance and take you back to your Moshi
for about 45 minutes drive.`,
          },
        ],
        pricing: [
          { group: "1 person", price: 1800 },
          { group: "2-4 people", price: 1750 },
          { group: "5-7 people", price: 1700 },
          { group: "8-10 people", price: 1650 },
          { group: "11+ people", price: 1600 },
        ],
      },
    },
    image: img,
    difficulty: "Moderate",
    success_rate: "90%",
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      "Transfer to and pick-up from the gate of Kilimanjaro National Park.",
      "All park fees collected by the Kilimanjaro National Park (conservation fees, camping fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania National Parks Authority).",
      "Tented accommodation on Mount Kilimanjaro (modern, comfortable 4-Season tents, North Face VE-25 ).",
      "All meals on the hike.",
      "4-inch (10-cm) thick and comfortable sleeping mats",
      "Oxygen cylinders and oximeters",
      "GPS-tracking service",
      "Complete medical kits.",
      "Professional guides, licensed by Kilimanjaro National Park. All our guides are the holder of Wilderness First Responder or Wilderness First Aid certifications. All our guides have 10+years of successful mountaineering experience.",
      "Dedicated support crew (assistant guides, camp master, porters, cooks.etc).",
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation before and after trekking",
      "Visa fees",
      "Personal gear rentals",
      "Tips for the mountain crew.",
      "Mountaineering insurance",
    ],
  },
  "nothern-circuit": {
    showTabDescription: true,
    showPriceTab: true,
    name: "Nothern Circuit Route",
    nickname: "Wilderness Route",
    hasMultipleDays: true,
    variants: {
      "7-days": {
        duration: "7 Days",
        tabDescription:
          "The 7-day Lemosho route offers a more direct approach to the summit while still providing excellent scenery and good acclimatization. This route is perfect for experienced climbers who want to experience the wilderness beauty of Lemosho in a shorter timeframe.",
        description:
          "The 7-day Lemosho route is a condensed version of our most scenic trail, offering breathtaking views and excellent wildlife viewing opportunities. This route provides a perfect balance of challenge and beauty for experienced climbers.",
        itinerary: [
          {
            day: 1,
            title: "Londorossi Gate to Forest Camp",
            altitude: "2100m - 2785m",
            distance: "6 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description:
              "Drive to Londorossi Gate for registration and permits. Begin hiking through pristine forest with chances to see wildlife.",
          },
          {
            day: 2,
            title: "Forest Camp to Shira Camp 1",
            altitude: "2785m - 3504m",
            distance: "8 Km",
            time: "5-6 hours",
            habitat: "Heath",
            image: img,
            description:
              "We continue on the trail leading out of the forest and into a savannah of tall grasses, heather, and volcanic rock draped with lichen beards.",
          },
          {
            day: 3,
            title: "Shira Camp 1 to Lava Tower to Barranco Camp",
            altitude: "3504m - 4630m - 3960m",
            distance: "10 Km",
            time: "6-8 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "From the Shira Plateau, we continue to the east up a ridge, passing the junction towards the peak of Kibo.",
          },
          {
            day: 4,
            title: "Barranco Camp to Karanga Camp",
            altitude: "3960m - 4035m",
            distance: "5 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "After breakfast, we leave Barranco and continue on a steep ridge passing the Barranco Wall, to the Karanga Valley campsite.",
          },
          {
            day: 5,
            title: "Karanga Camp to Barafu Camp",
            altitude: "4035m - 4673m",
            distance: "4 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "After breakfast, we leave Karanga and hit the junction which connects with the Mweka Trail.",
          },
          {
            day: 6,
            title: "Barafu Camp to Summit to Mweka Camp",
            altitude: "4673m - 5895m - 3068m",
            distance: "17 Km",
            time: "12-16 hours",
            habitat: "Arctic",
            image: img,
            description:
              "Very early in the morning (midnight to 2am), we continue our way to the summit between the Rebmann and Ratzel glaciers.",
          },
          {
            day: 7,
            title: "Mweka Camp to Mweka Gate",
            altitude: "3068m - 1640m",
            distance: "10 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description:
              "After breakfast, we continue the descent down to the Mweka Park Gate to receive your summit certificates.",
          },
        ],
        pricing: [
          { group: "1 person", price: 2000 },
          { group: "2-4 people", price: 1850 },
          { group: "5-7 people", price: 1800 },
          { group: "8-10 people", price: 1700 },
          { group: "11+ people", price: 1650 },
        ],
      },
      "8-days": {
        duration: "8 Days",
        tabDescription:
          "The 8-day Lemosho route is widely regarded as the most picturesque trail on Mount Kilimanjaro, offering breathtaking views from various angles. As one of the more recent trails, it is an excellent option for climbers. This route is particularly favored due to its perfect combination of minimal crowds, stunning landscapes, and a high success rate for reaching the summit.",
        description:
          "The Lemosho route is widely regarded as the most picturesque trail on Mount Kilimanjaro, offering breathtaking views from various angles. As one of the more recent trails, it is an excellent option for climbers. This route is particularly favored due to its perfect combination of minimal crowds, stunning landscapes, and a high success rate for reaching the summit.",
        itinerary: [
          {
            day: 1,
            title: "Londorossi Gate to Forest Camp",
            altitude: "2100m - 2785m",
            distance: "6 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description:
              "Drive to Londorossi Gate for registration and permits. Begin hiking through pristine forest with chances to see wildlife.",
          },
          {
            day: 2,
            title: "Forest Camp to Shira Camp 1",
            altitude: "2785m - 3504m",
            distance: "8 Km",
            time: "5-6 hours",
            habitat: "Heath",
            image: img,
            description:
              "We continue on the trail leading out of the forest and into a savannah of tall grasses, heather, and volcanic rock draped with lichen beards.",
          },
          {
            day: 3,
            title: "Shira Camp 1 to Shira 2 to Moir Hut",
            altitude: "3504m - 4200m",
            distance: "14 Km",
            time: "5-7 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "We explore the Shira plateau for a full day. It is a gentle walk east toward Kibo's glaciered peak, across the plateau which leads to Shira 2 camp.",
          },
          {
            day: 4,
            title: "Moir Hut to Lava Tower to Barranco Camp",
            altitude: "4200m - 4630m - 3960m",
            distance: "7 Km",
            time: "4-6 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "From the Shira Plateau, we continue to the east up a ridge, passing the junction towards the peak of Kibo.",
          },
          {
            day: 5,
            title: "Barranco Camp to Karanga Camp",
            altitude: "3960m - 4035m",
            distance: "5 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "After breakfast, we leave Barranco and continue on a steep ridge passing the Barranco Wall, to the Karanga Valley campsite.",
          },
          {
            day: 6,
            title: "Karanga Camp to Barafu Camp",
            altitude: "4035m - 4673m",
            distance: "4 Km",
            time: "4-5 hours",
            habitat: "Alpine Desert",
            image: img,
            description:
              "After breakfast, we leave Karanga and hit the junction which connects with the Mweka Trail.",
          },
          {
            day: 7,
            title: "Barafu Camp to Summit to Mweka Camp",
            altitude: "4673m - 5895m - 3068m",
            distance: "17 Km",
            time: "12-16 hours",
            habitat: "Arctic",
            image: img,
            description:
              "Very early in the morning (midnight to 2am), we continue our way to the summit between the Rebmann and Ratzel glaciers.",
          },
          {
            day: 8,
            title: "Mweka Camp to Mweka Gate",
            altitude: "3068m - 1640m",
            distance: "10 Km",
            time: "3-4 hours",
            habitat: "Rain Forest",
            image: img,
            description:
              "After breakfast, we continue the descent down to the Mweka Park Gate to receive your summit certificates.",
          },
        ],
        pricing: [
          { group: "1 person", price: 2200 },
          { group: "2-4 people", price: 2000 },
          { group: "5-7 people", price: 1950 },
          { group: "8-10 people", price: 1850 },
          { group: "11+ people", price: 1800 },
        ],
      },
    },
    image: img,
    difficulty: "Moderate",
    success_rate: "90%",
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      "Transfer to and pick-up from the gate of Kilimanjaro National Park.",
      "All park fees collected by the Kilimanjaro National Park (conservation fees, camping fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania National Parks Authority).",
      "Tented accommodation on Mount Kilimanjaro (modern, comfortable 4-Season tents, North Face VE-25 ).",
      "All meals on the hike.",
      "4-inch (10-cm) thick and comfortable sleeping mats",
      "Oxygen cylinders and oximeters",
      "GPS-tracking service",
      "Complete medical kits.",
      "Professional guides, licensed by Kilimanjaro National Park. All our guides are the holder of Wilderness First Responder or Wilderness First Aid certifications. All our guides have 10+years of successful mountaineering experience.",
      "Dedicated support crew (assistant guides, camp master, porters, cooks.etc).",
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation before and after trekking",
      "Visa fees",
      "Personal gear rentals",
      "Tips for the mountain crew.",
      "Mountaineering insurance",
    ],
  },

  // Destination routes (no tabs, single duration)
  "mikumi-national-park": {
    showTabDescription: false,
    showPriceTab: false,
    name: "Mikumi National Park",
    hasMultipleDays: false,
    duration: "1 Day",
    tabDescription:
      "Mikumi National Park is Tanzania's fourth-largest national park and the most accessible from Arusha. The park offers excellent wildlife viewing opportunities with its open horizons and abundant wildlife that includes elephants, lions, wild dogs, zebras, hyenas, hippos, hartebeest, wildebeest, eland, impala, warthog, waterbuck and reedbuck.",
    description: `Mikumi National Park lies roughly 300 kilometers west of Arusha and 107 kilometers from Morogoro town. In addition to being home to a variety of wild animals and bird species, the park is
adorned by its breathtakingly beautiful grasslands and baobabs. The park has a remarkable concentration of species, such elephants, giraffes, hartebeests, zebras, leopards, lions, impalas, sable
antelopes, warthogs wildebeests, reedbuck, crocodiles, hippos and many more. `,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: "Arusha to Mikumi National Park",
        altitude: "500m",
        distance: "283 Km",
        time: "5-6 hours",
        habitat: "Savannah",
        image: img,
        description: `At 4:00 AM, you will be collected from the Arusha hotel/airport. We will begin your five to six- hour journey through Morogoro town to Mikumi National Park. As soon as we get at Mikumi, we'll head directly to the park complete registrations and begin the tour that will take 4 to 5 hours. We will start our 5-6 hour journey back to Arusha at 4:00 PM, and you will be dropped off at your hotel, airport, or home.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 506 },
      { group: "2-4 people", price: 312 },
      { group: "5-7 people", price: 280 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },

  //   "serengeti-national-park": {
  //     showTabDescription: false,
  //     showPriceTab: false,
  //     name: "Serengeti National Park",
  //     hasMultipleDays: false,
  //     duration: "4 Days",
  //     tabDescription:
  //       "The Serengeti National Park is undoubtedly the best-known wildlife sanctuary in the world, unequalled for its natural beauty and scientific value. It has the greatest concentration of plains game in Africa and is famous for the annual Great Migration of wildebeest and zebra.",
  //     description:
  //       "The Serengeti National Park is undoubtedly the best-known wildlife sanctuary in the world, unequalled for its natural beauty and scientific value. It has the greatest concentration of plains game in Africa and is famous for the annual Great Migration.",
  //     image: img,
  //     difficulty: "Easy",
  //     success_rate: "100%",
  //     itinerary: [
  //       {
  //         day: 1,
  //         title: "Arusha to Serengeti National Park",
  //         altitude: "1400m - 1500m",
  //         distance: "335 Km",
  //         time: "6-7 hours",
  //         habitat: "Savannah",
  //         image: img,
  //         description:
  //           "Depart from Arusha and drive to Serengeti National Park via Ngorongoro Conservation Area. Enjoy game drive en route and arrive at your accommodation for dinner and overnight.",
  //       },
  //       {
  //         day: 2,
  //         title: "Full Day Serengeti Game Drive",
  //         altitude: "1500m",
  //         distance: "200 Km",
  //         time: "8-10 hours",
  //         habitat: "Savannah",
  //         image: img,
  //         description:
  //           "Full day game drive in Serengeti National Park. The park is famous for its annual migration of over 1.5 million white-bearded wildebeest and 250,000 zebra.",
  //       },
  //       {
  //         day: 3,
  //         title: "Serengeti to Ngorongoro",
  //         altitude: "1500m - 2300m",
  //         distance: "145 Km",
  //         time: "4-5 hours",
  //         habitat: "Highland",
  //         image: img,
  //         description:
  //           "Morning game drive in Serengeti then drive to Ngorongoro Conservation Area. Arrive at your lodge on the crater rim for dinner and overnight.",
  //       },
  //       {
  //         day: 4,
  //         title: "Ngorongoro Crater to Arusha",
  //         altitude: "2300m - 1600m - 1400m",
  //         distance: "210 Km",
  //         time: "6-7 hours",
  //         habitat: "Crater Floor",
  //         image: img,
  //         description:
  //           "Early morning descent into Ngorongoro Crater for game drive. Afternoon drive back to Arusha arriving in the evening.",
  //       },
  //     ],
  //     pricing: [
  //       { group: "1 person", price: 1500 },
  //       { group: "2-4 people", price: 1200 },
  //       { group: "5-7 people", price: 1100 },
  //       { group: "8-10 people", price: 1000 },
  //       { group: "11+ people", price: 950 },
  //     ],
  //     inclusions: [
  //       "Pick-up and drop-off at Kilimanjaro International Airport",
  //       `All park fees collected by the National Park (conservation fees, camping
  // fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
  // National Parks Authority).`,
  //       "All accomodations",
  //       "All meals",
  //       `Professional guides, licensed by Tanzania National Park. All our guides are the holder
  // of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
  // 10+years of successful mountaineering experience.`,
  //     ],
  //     exclusions: [
  //       "Airline tickets",
  //       "Accommodation after tour.",
  //       "Personal gear rentals",
  //       "Visa fees",
  //       "Tips",
  //     ],
  //   },
  "arusha-national-park": {
    showTabDescription: false,
    showPriceTab: false,
    name: "Arusha National Park",
    hasMultipleDays: false,
    duration: "1 Day",
    tabDescription:
      "The Serengeti National Park is undoubtedly the best-known wildlife sanctuary in the world, unequalled for its natural beauty and scientific value. It has the greatest concentration of plains game in Africa and is famous for the annual Great Migration of wildebeest and zebra.",
    description: `
A wide variety of creatures can be seen in the Arusha National Park such as giraffes, zebras, buffaloes, warthogs, and other kinds of antelope. Primates including acrobatic vervet monkeys, black and white colobus monkeys, and blue monkeys may also be seen. The park has three significant features including Mount Meru, colored momela lakes and Ngurdoto crater. Game drive will begin early morning after arrival at Arusha National Park until late noon, we depart to Moshi or

`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: "Arusha to Serengeti National Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Savannah",
        image: img,
        description: `Arusha National Park is 30 km from Arusha and 75km from Moshi, thus a perfect 1 day trip. We will pick you up from your accommodation in Moshi/Arusha around 7 in the morning and drive to the entrance of Arusha National Park. A day trip to Arusha National Park is a great way to experience a range of wild animals in a small space. Game drive will begin early morning after arrival at Arusha National Park until late noon, we depart to Moshi or Arusha.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 506 },
      { group: "2-4 people", price: 312 },
      { group: "5-7 people", price: 280 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },
  "tarangire-national-park": {
    showTabDescription: false,
    showPriceTab: false,
    name: "Tarangire National Park",
    hasMultipleDays: false,
    duration: "1 Day",
    tabDescription:
      "The Serengeti National Park is undoubtedly the best-known wildlife sanctuary in the world, unequalled for its natural beauty and scientific value. It has the greatest concentration of plains game in Africa and is famous for the annual Great Migration of wildebeest and zebra.",
    description: `
Tarangire National Park, located in northern Tanzania, is renowned for its large elephant herds and striking landscapes, including iconic baobab trees. The park offers diverse ecosystems, from woodlands to savannahs, and is home to a variety of wildlife such as lions, giraffes, zebras, and over 500 bird species. Often quieter than other Tanzanian parks, Tarangire provides a unique and intimate safari experience, especially during the dry season when animals flock to the Tarangire River for water.

`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: "Arusha to Serengeti National Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Savannah",
        image: img,
        description: `Tarangire National Park is about 198 kilometers (approximately 3 hours and 28 minutes) from Moshi and Tarangire National Park is mostly known for its large herds of elephants congregating near the Tarangire River, the area is primary water source, and its profusion of ancient baobabs. We will collect you from your hotel in Arusha and following a 2-3-hour drive, you will arrive at the Tarangire National Park. The order of the day are extensive game drives across the park.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 506 },
      { group: "2-4 people", price: 312 },
      { group: "5-7 people", price: 280 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },
  "lake-manyara-national-park": {
    showTabDescription: false,
    showPriceTab: false,
    name: "Lake Manyara National Park",
    hasMultipleDays: false,
    duration: "1 Day",
    tabDescription:
      "The Serengeti National Park is undoubtedly the best-known wildlife sanctuary in the world, unequalled for its natural beauty and scientific value. It has the greatest concentration of plains game in Africa and is famous for the annual Great Migration of wildebeest and zebra.",
    description: `Lake Manyara National Park, located in northern Tanzania, is renowned for its breathtaking scenery and diverse wildlife. The park is centered around the beautiful Lake Manyara, a shallow soda lake that attracts a wide variety of bird species, including large populations of flamingos. Home to a variety of animals such as elephants, giraffes, zebras, and famous tree-climbing lions, Lake Manyara offers a unique and captivating safari experience, making it a must-visit destination for nature lovers and wildlife enthusiasts.`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: "Arusha to Serengeti National Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Savannah",
        image: img,
        description: `At 7 am, we will leave Arusha and start your journey to Lake Manyara National Park. We will travel for 2 hours through Mto Wa Mbu. You will enter Lake Manyara National Park . The park boasts some of the world’s best game watching and is a photographers paradise. Many of Africa’s most famous creatures will be visible, but the tree-climbing lions are a special treat. These arrogant predators nearly ask to be photographed as they relax on acacia trees. With a vast array of species on exhibit in the park, Lake Manyara is a true delight for birdwatchers. You will depart to Arusha, late afternoon.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 506 },
      { group: "2-4 people", price: 312 },
      { group: "5-7 people", price: 280 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },
  "ngorongoro-national-park": {
    showTabDescription: false,
    showPriceTab: false,
    name: "Ngorongoro National Park",
    hasMultipleDays: false,
    duration: "1 Day",
    tabDescription:
      "The Serengeti National Park is undoubtedly the best-known wildlife sanctuary in the world, unequalled for its natural beauty and scientific value. It has the greatest concentration of plains game in Africa and is famous for the annual Great Migration of wildebeest and zebra.",
    description: `
Ngorongoro Crater, often referred to as the "Garden of Eden," is a UNESCO World Heritage Site located in northern Tanzania. It is the world’s largest inactive volcanic caldera, measuring about 20 kilometers in diameter and 610 meters deep. The crater is home to an extraordinary concentration of wildlife, including the Big Five—lions, elephants, buffalo, leopards, and rhinoceros—making it one of the best places in Africa for game viewing.Ngorongoro offers an awe-inspiring landscape, rich in both natural beauty and wildlife, making it a must-see destination for visitors to Tanzania.

`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: "Arusha to Serengeti National Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Savannah",
        image: img,
        description: `Your driving guide will pick up at your hotel or during your stay in Arusha town at 0600 hours. You will then travel 190 kilometers on the tarmac road to the Ngorongoro Conservation entry gate. Drive from the gate to the Crater Rim, where you can spend a few minutes admiring the crater from above,
and then head down to the crater floor for a day of game drive. One of Africa’s most breathtaking sites is the Ngorongoro Crater, the world’s largest intact crater. This amazing caldera is home to all five of the BIG FIVE: zebras, hippopotamus, wildebeest, hyenas, buffalo, elephants, lions, and leopards.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 820 },
      { group: "2-4 people", price: 290 },
      { group: "5-7 people", price: 250 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },
  "mkomazi-national-park": {
    showTabDescription: false,
    showPriceTab: false,
    name: "Mkomazi National Park",
    hasMultipleDays: false,
    duration: "1 Day",
    tabDescription:
      "The Serengeti National Park is undoubtedly the best-known wildlife sanctuary in the world, unequalled for its natural beauty and scientific value. It has the greatest concentration of plains game in Africa and is famous for the annual Great Migration of wildebeest and zebra.",
    description: `

Mkomazi National Park, located in northeastern Tanzania near the Kenyan border. Mkomazi is home to rare and endangered species, including the African wild dog and the black rhino, which have been successfully reintroduced. The park also supports a variety of other wildlife, such as elephants, giraffes, and zebras, as well as over 400 bird species. Less crowded than other Tanzanian parks, Mkomazi offers an off-the-beaten-path safari experience for those seeking adventure and wildlife conservation efforts in a pristine, wild environment.


`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: "Arusha to Serengeti National Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Savannah",
        image: img,
        description: `You will be picked up at your hotel in Arusha or Moshi with parked lunch boxes and driven to Mkomazi National Park, which is roughly 190 kilometers from Arusha and 120 kilometers from Moshi town. Upon arrival at the park, we will embark on a game drive in search of oryx, gerenuk, lion,
leopard, hyena, jackal, elephant, buffalo, hartebeest, giraffe, warthog, and crocodiles. A visit to the Mkomazi Rhino Sanctuary can be arranged at an additional expense. Enjoy your picnic lunch boxes at a designated picnic place in the middle of the day before heading out on an afternoon game drive until the evening.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 506 },
      { group: "2-4 people", price: 312 },
      { group: "5-7 people", price: 280 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },
  "saadani-national-park": {
    showTabDescription: false,
    showPriceTab: false,
    name: "Saadani National Park",
    hasMultipleDays: false,
    duration: "1 Day",
    tabDescription:
      "The Serengeti National Park is undoubtedly the best-known wildlife sanctuary in the world, unequalled for its natural beauty and scientific value. It has the greatest concentration of plains game in Africa and is famous for the annual Great Migration of wildebeest and zebra.",
    description: `Saadani National Park is One of Tanzania's most stunning parks, located along the Indian Ocean coast. The park can be reached by road network from Dares-salaam via Bagamoyo to Gama/wami entrance gate (131km). The Park is home to a variable mix of both marine and mainland flora and fauna most notably waterbucks, giraffes, warthogs, hartebeests, elephants, hippos, crocodiles, water birds. Also the superb
scenic beauty of marine - terrestrial interface and the natural Mafui sandbank. `,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: "Arusha to Serengeti National Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Savannah",
        image: img,
        description: `At 8 AM, you will be collected from the Arusha hotel/airport. We will begin a 131 km through Bagamoyo town to Saadani National Park. As soon as we get at Saadani, we'll head directly to the park complete registrations and begin the tour that will take 6 hours. We will start our 3 hour journey back to Arusha at 4:00 PM, and you will be dropped off at your hotel, airport, or home.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 506 },
      { group: "2-4 people", price: 312 },
      { group: "5-7 people", price: 280 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },
  "nyerere-national-park": {
    showTabDescription: false,
    showPriceTab: false,
    name: "Nyerere National Park",
    hasMultipleDays: false,
    duration: "1 Day",
    tabDescription:
      "The Serengeti National Park is undoubtedly the best-known wildlife sanctuary in the world, unequalled for its natural beauty and scientific value. It has the greatest concentration of plains game in Africa and is famous for the annual Great Migration of wildebeest and zebra.",
    description: `
The Selous is home to the largest concentration of elephants with approximately 110,000 individuals recorded, about 35,000 zebras, 40,000 hippos, 25,000 impalas, 150,000 buffalos and approximately 4,000 lions the highest concentration in Africa. In addition are: rhinos, brindled gnu, Nyasaland gnu, sable antelope, eland, greater kudu, waterbuck, hartebeest, giraffe, reedbuck, warthog, spotted hyena, lion,
leopard and hunting dog.
`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: " Arusha to Nyerere N.Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Savannah",
        image: img,
        description: `Our driver will pick you at 4:30 to 5 am, at your hotel or residence. It will take 5 hours drive from Arusha to Nyerere National Park. After checking in at Nyerere National Park, you will begin game drives and have a lunch break inside the park. Game drives will continue until approximately 16:00, where your journey back to Arusha will begin.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 506 },
      { group: "2-4 people", price: 312 },
      { group: "5-7 people", price: 280 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },
  "mount-meru-national-park": {
    showTabDescription: false,
    showPriceTab: false,
    name: "Mount Meru National Park",
    hasMultipleDays: false,
    duration: "4 Days",
    tabDescription:
      "The Serengeti National Park is undoubtedly the best-known wildlife sanctuary in the world, unequalled for its natural beauty and scientific value. It has the greatest concentration of plains game in Africa and is famous for the annual Great Migration of wildebeest and zebra.",
    description:
      "The Serengeti National Park is undoubtedly the best-known wildlife sanctuary in the world, unequalled for its natural beauty and scientific value. It has the greatest concentration of plains game in Africa and is famous for the annual Great Migration.",
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: "Arusha to Serengeti National Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Savannah",
        image: img,
        description:
          "Depart from Arusha and drive to Serengeti National Park via Ngorongoro Conservation Area. Enjoy game drive en route and arrive at your accommodation for dinner and overnight.",
      },
      {
        day: 2,
        title: "Full Day Serengeti Game Drive",
        altitude: "1500m",
        distance: "200 Km",
        time: "8-10 hours",
        habitat: "Savannah",
        image: img,
        description:
          "Full day game drive in Serengeti National Park. The park is famous for its annual migration of over 1.5 million white-bearded wildebeest and 250,000 zebra.",
      },
      {
        day: 3,
        title: "Serengeti to Ngorongoro",
        altitude: "1500m - 2300m",
        distance: "145 Km",
        time: "4-5 hours",
        habitat: "Highland",
        image: img,
        description:
          "Morning game drive in Serengeti then drive to Ngorongoro Conservation Area. Arrive at your lodge on the crater rim for dinner and overnight.",
      },
      {
        day: 4,
        title: "Ngorongoro Crater to Arusha",
        altitude: "2300m - 1600m - 1400m",
        distance: "210 Km",
        time: "6-7 hours",
        habitat: "Crater Floor",
        image: img,
        description:
          "Early morning descent into Ngorongoro Crater for game drive. Afternoon drive back to Arusha arriving in the evening.",
      },
    ],
    pricing: [
      { group: "1 person", price: 506 },
      { group: "2-4 people", price: 312 },
      { group: "5-7 people", price: 280 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },
  "bongonyo-island": {
    showTabDescription: false,
    showPriceTab: false,
    name: "Bongonyo Island",
    hasMultipleDays: false,
    duration: "1 Day",
    tabDescription:
      "The Serengeti National Park is undoubtedly the best-known wildlife sanctuary in the world, unequalled for its natural beauty and scientific value. It has the greatest concentration of plains game in Africa and is famous for the annual Great Migration of wildebeest and zebra.",
    description: `Bongoyo Island is uninhabited island located 2.5km north of the Arusha and is popular snorkeling and sunbathing location for both visitors and Tanzanian inhabitants. The island is near to the Msasani
Peninsula and reached by boat in 30 minutes from the mainland. Bongoyo Island is also known as a tranquil destination popular with honeymooners and those looking for a day excursion with a picnic.`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: "Arusha to Serengeti National Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Savannah",
        image: img,
        description: `Early in the morning at 8 am you will be picked from your hotel/ aiport to the port, where we will board the at 10am for 30 minutes to Bongoyo Island. We will be able to do several activities and having fun including hiking, beach soccer, kayaking and snorkeling. Late evening, we will be boarding the boat back to Arusha.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 70 },
      { group: "2-4 people", price: 22 },
      { group: "5-7 people", price: 32 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },
  "sinda-island": {
    showTabDescription: false,
    showPriceTab: false,
    name: "Sinda Island",
    hasMultipleDays: false,
    duration: "1 Day",
    tabDescription:
      "The Serengeti National Park is undoubtedly the best-known wildlife sanctuary in the world, unequalled for its natural beauty and scientific value. It has the greatest concentration of plains game in Africa and is famous for the annual Great Migration of wildebeest and zebra.",
    description: `Sinda Island is the unhabitated island, located 5km from Arusha. It takes 30 minutes to and from Sinda Island. Sinda is really made up of two islands: "Inner" Sinda and "Outer" Sinda, which are part of a larger coral reef formation. Sinda is one of the best snorkeling islands outside Arusha due to its formation, which is surrounded by patch reefs that are home to a variety of species including tiny clownfish and gigantic moray eels. Sinda Island is also known as a tranquil destination popular with honeymooners and those looking for a day excursion with a picnic.`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: "Arusha to Serengeti National Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Savannah",
        image: img,
        description: `Early in the morning at 8 am you will be picked from your hotel/ aiport to the port, where we will board at 10am for 30 minutes to Sinda Island. You will be able to do several activities and having fun including hiking, beach soccer, kayaking and snorkeling. Late evening, we will be boarding the boat back
to Arusha.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 70 },
      { group: "2-4 people", price: 22 },
      { group: "5-7 people", price: 32 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },
  "pugu-hills": {
    showTabDescription: false,
    showPriceTab: false,
    name: "Pugu Hills",
    hasMultipleDays: false,
    duration: "1 Day",
    tabDescription:
      "The Serengeti National Park is undoubtedly the best-known wildlife sanctuary in the world, unequalled for its natural beauty and scientific value. It has the greatest concentration of plains game in Africa and is famous for the annual Great Migration of wildebeest and zebra.",
    description: `Pugu hills/nature reserve is the protected area, 10 km from Arusha. The forest is home to over 100 different tree species, as well as several steep and mild hills. Has an observation deck from where you may enjoy a beautiful view of Arusha City. It also features a lake named 'Minaki'. This is an excellent area to connect with nature. Small animals such as colobus monkeys, millipedes, and a variety of birds can also be found. It takes about 4 to 5 hours to tour the entire forest. Aside from Arusha being a busy city, Pugu hills are one of the unique spots to experience nature, a go-to spot for hiking, and a fantastic vacation for nature.`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: "Arusha to Serengeti National Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Savannah",
        image: img,
        description: `You will picked from your hotel/airport early in the morning. The drive from Dar to Pugu, takes about 2-3 hours. Upon arrival, we will do the registrations and once done we will begin to explore the beautiful Pugu nature reserve. There you'll get a chance to do walking safari, kayaking, bird watching, and hiking while observing the lake and numerous flora and fauna bushes' intermingled with bamboo woods, followed by a climb that will allow you to see the entire Arusha. Late Afternoon/ evening drive back to Arusha.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 1500 },
      { group: "2-4 people", price: 1200 },
      { group: "5-7 people", price: 1100 },
      { group: "8-10 people", price: 1000 },
      { group: "11+ people", price: 950 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },
  "giants-and-craters": {
    showTabDescription: false,
    showPriceTab: false,
    name: "Tarangire and Ngorongoro",
    whiteBg: "Tarangire & Ngorongoro",
    hasMultipleDays: false,
    duration: "2 Day2",
    tabDescription:
      "The Serengeti National Park is undoubtedly the best-known wildlife sanctuary in the world, unequalled for its natural beauty and scientific value. It has the greatest concentration of plains game in Africa and is famous for the annual Great Migration of wildebeest and zebra.",
    description: `

Explore the wild beauty of Tanzania with a journey through Tarangire National Park and the Ngorongoro Crater. Start in Tarangire, famous for its massive elephant herds, ancient baobab trees, and diverse wildlife, including lions, giraffes, and over 500 bird species. The park’s serene atmosphere and unique landscape offer an intimate safari experience. Continue to the Ngorongoro Crater, the world’s largest unbroken volcanic caldera and a UNESCO World Heritage Site. Home to the Big Five and a rich variety of ecosystems.


`,
    image: "/placeholder.svg?height=400&width=800",
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: "Arusha to Serengeti National Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Savannah",
        description: `Tarangire National Park is about 198 kilometers (approximately 3 hours and 28 minutes) from Moshi and Tarangire National Park is mostly known for its large herds of elephants congregating near the Tarangire River, the area is primary water source, and its profusion of ancient baobabs. We will collect you from your hotel in Arusha and following a 2-3-hour drive, you will arrive at the Tarangire National Park. The order of the day are extensive game drives across the park.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 1210 },
      { group: "2-4 people", price: 960 },
      { group: "5-7 people", price: 710 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },
  // Escape DSM destinations (no tabs, show routes on left, days on right)
  "from-city-lights-to-safari-nights": {
    showTabDescription: true,
    showPriceTab: true,
    name: "From City Lights to Safari Nights",
    hasMultipleDays: false,
    isEscapeDSM: true,
    whiteBg: "Mikumi & Nyerere National Parks",
    blackBg: "4 Days",
    tabDescription:
      "Leave behind the hum of the city and follow the call of the wild. This journey takes you from the heartbeat of Arusha to the open plains of Mikumi and the untamed wilderness of Nyerere—where elephants roam free, rivers whisper ancient stories, and the stars shine brighter than ever.",
    description: `Leave behind the hum of the city and follow the call of the wild. This journey takes you from the heartbeat of Arusha to the open plains of Mikumi and the untamed wilderness of Nyerere—where elephants roam free, rivers whisper ancient stories, and the stars shine brighter than ever.`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: " Arusha to Mikumi National Park",
        altitude: "0m - 500m",
        distance: "283 Km",
        time: "5-6 hours",
        habitat: "Urban to Savannah",
        image: img,
        description: `Around 5:30 am, our driver will arrive at your Arusha hotel/residence to pick you up for your 5 hour trip to Mikumi National Park. After a lunch at Morogoro, you can embark on game drives until dusk. You will be able to see various wildanimals, including lions, girrafes and elephants. After the game drive, you will have dinner, rest at the lodge nd getting ready for the following day's activities.`,
      },
      {
        day: 2,
        title: "Mikumi to Nyerere National Park",
        altitude: "500m",
        distance: "150 Km",
        time: "8-10 hours",
        habitat: "Savannah",
        image: img,
        description: `After breakfast, you will be picked-up from your camp and driven to Nyerere National Park.   Having taken lunch on your way, you will arrive there in the evening and start a boat drive. You will see crocodiles and hippos in their natural environment while on your boat excursion. Meals and your overnight will be offered at the Camp. `,
      },
      {
        day: 3,
        title: "Game Drive at Nyerere National Park",
        altitude: "500m - 300m",
        distance: "230 Km",
        time: "4-5 hours",
        habitat: "Savannah to Woodland",
        image: img,
        description: `You will have a full game drive trip at Nyerere National Park, formerly known as Selous on this day from 7:30 am until evening. Our skilled drivers and guides will pick you up at the camp, where the trip will begin. Lunch will be served at noon.  You will be able to see; Elephants, zebras, giraffes, antelopes, and many other Birds and other landscape features, such as wetlands, dry grasslands and light acacia forests. After game drive in the evening, you will be taken back to the camp for dinner and rest.`,
      },
      {
        day: 4,
        title: "Walking Tour & Drive Back to Dar",
        altitude: "300m",
        distance: "100 Km",
        time: "8-10 hours",
        habitat: "Woodland & River",
        image: img,
        description: `After your morning tea on this particular day, you will go on a bushman walking excursion through the forest with our bushman and an armed ranger. You will return to Camp for breakfast after the walking tour. After, make ready to drive back to Arusha.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 1600 },
      { group: "2-4 people", price: 1350 },
      { group: "5-7 people", price: 1100 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },

  "unzip-serengeti-and-ngorongoro": {
    showTabDescription: true,
    showPriceTab: true,
    name: "Unzip Serengeti and Ngorongoro",
    hasMultipleDays: false,
    isEscapeDSM: true,
    whiteBg: "Serengeti & Ngorongoro National Park",
    blackBg: "4 Days",
    tabDescription:
      "Escape the urban jungle and dive into the real one. From Arusha's busy streets to the endless plains of Serengeti and the ancient crater of Ngorongoro—witness the Great Migration, spot the Big Five, and discover why Tanzania is the heart of African safari.",
    description: `Experience the ultimate northern safari as you journey from Arusha to the legendary Serengeti and the breathtaking Ngorongoro Crater. Witness the Big Five, roam vast golden plains, and descend into an ancient volcanic caldera teeming with wildlife—all in one unforgettable adventure.
`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: " Arusha to Arusha",
        altitude: "0m - 1400m",
        distance: "650 Km",
        time: "1 hour flight",
        habitat: "Urban to Highland",
        image: img,
        description: `Around 5:30 am, our driver will arrive at your Arusha hotel/residence to pick you up for your 11
hour trip to Arusha. It is a whole day trip with breakfast and dinner covered, arriving at Arusha in the
evening. You will get dinner and rest at the lodge ready for tomorrow’s activities.`,
      },
      {
        day: 2,
        title: "Arusha to Serengeti National Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Highland to Savannah",
        image: img,
        description: `Your safari will begin at 7 a.m. with a pick-up from your hotel in Arusha. With everyone aboard, you will go to Serengeti National Park. The 240 km travel will take approximately 6 hours. You will drive through the Ngorongoro Conservation Area and enjoy a game drive along the way and arrive at Serengeti National Park in the early afternoon and take a brief wildlife drive until sundown. The Serengeti is also home to the
majestic "Big 5" (elephant, rhino, buffalo, lion, and leopard). Along with the "Big 5", a very pleasant sighting would be one of Africa's most gorgeous animal game`,
      },
      {
        day: 3,
        title: "Serengeti to  Ngorongoro N.Park",
        altitude: "1500m",
        distance: "200 Km",
        time: "8-10 hours",
        habitat: "Endless Plains",
        image: img,
        description: `After breakfast, you will embark on a morning game drive across Serengeti National Park. Later, head for
the Ngorongoro Conservation Area with a picnic lunch. Ngorongoro Crater is the world’s largest collapsed volcano crater, spanning fourteen kilometers of solitary natural splendor. Ngorongoro Crater is ringed by a ring of ancient volcanoes, and the bottom, riddled with watering holes, supports over 30,000 animals. The adventurous day concludes with a hearty dinner and a nice night's sleep in your
accommodations in Arusha.`,
      },
      {
        day: 4,
        title: "Arusha to Arusha",
        altitude: "1500m - 2300m",
        distance: "145 Km",
        time: "4-5 hours",
        habitat: "Plains to Crater Rim",
        image: img,
        description: `Around 5:30 am, our driver will arrive at your Arusha hotel to pick you up for your 11 hour trip to Dar es
Salaam. It is a whole day trip with breakfast and dinner covered, arriving at Arusha in the evening.
End of tour.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 2100 },
      { group: "2-4 people", price: 1700 },
      { group: "5-7 people", price: 1350 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },

  "the-north-wonders-safari": {
    showTabDescription: true,
    showPriceTab: true,
    name: "The North Wonders Safari",
    hasMultipleDays: false,
    isEscapeDSM: true,
    whiteBg: " Lake Manyara, Serengeti & Ngorongoro N.Park",
    blackBg: "6 Days",
    tabDescription:
      "Escape the urban jungle and dive into the real one. From Arusha's busy streets to the endless plains of Serengeti and the ancient crater of Ngorongoro—witness the Great Migration, spot the Big Five, and discover why Tanzania is the heart of African safari.",
    description: `Embark on a breathtaking journey through Tanzania’s most iconic landscapes. Start with the lush forests and tree-climbing lions of Lake Manyara, roam the endless plains of Serengeti in search of the Big Five, and descend into the ancient Ngorongoro Crater—a world within a world. This is the ultimate escape into the wild, where every stop reveals a new wonder.
`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: " Arusha to Arusha",
        altitude: "0m - 1400m",
        distance: "650 Km",
        time: "1 hour flight",
        habitat: "Urban to Highland",
        image: img,
        description: `Around 5:30 am, our driver will arrive at your Arusha hotel/residence to pick you up for your 11
hour trip to Arusha. It is a whole day trip with breakfast and dinner covered, arriving at Arusha in the
evening. You will get dinner and rest at the lodge ready for tomorrow’s activities.`,
      },
      {
        day: 2,
        title: "Arusha to Lake Manyara N. Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Highland to Savannah",
        image: img,
        description: `Early in the morning we will leave to Lake Manyara National Park. The park draws a vast range of animals, including tree-climbing lions, elephants, buffalos, hippos, antelopes, enormous baboon bands, and flocks of flamingos that decorate the gorgeous lake, as well as more than 400 bird species. You will have a game drive anda picnic lunch at Manyara Park before returning to lodge late evening for dinner and sleep.`,
      },
      {
        day: 3,
        title: "Lake Manyara to Serengeti N.Park",
        altitude: "1500m",
        distance: "200 Km",
        time: "8-10 hours",
        habitat: "Endless Plains",
        image: img,
        description: `After a hearty breakfast, you'll go to the Serengeti National Park and journey across the never-ending plain grasslands. The Serengeti is undoubtedly the world's most stunning animal sanctuary. An afternoon wildlife drive through the boundless plains of the Serengeti will provide you with the opportunity to
observe large herds of wildebeest, zebras, and gazelles, as well as a pride of lions lazing in the shade. A picnic lunch will be served throughout the day-long game drive. The adventurous day concludes with a hearty dinner and a nice night's sleep in your accommodations.`,
      },
      {
        day: 4,
        title: "Serengeti  to Ngorongoro Crater",
        altitude: "1500m - 2300m",
        distance: "145 Km",
        time: "4-5 hours",
        habitat: "Plains to Crater Rim",
        image: img,
        description: `After breakfast, you will embark on a morning wildlife drive across Serengeti National Park. Later, head for the Ngorongoro Conservation Area with a picnic lunch. Ngorongoro Crater is the world's largest collapsed volcano crater, spanning fourteen kilometers of solitary natural splendor. Ngorongoro Crater is
ringed by a ring of ancient volcanoes, and the bottom, riddled with watering holes, supports over 30,000 animals. The adventurous day concludes with a hearty dinner and a nice night's sleep in your accommodations.`,
      },
      {
        day: 5,
        title: "Ngorongoro Crater to Arusha",
        altitude: "1500m - 2300m",
        distance: "145 Km",
        time: "4-5 hours",
        habitat: "Plains to Crater Rim",
        image: img,
        description: `After a quick breakfast, you will descend into the crater bottom at approximately 6:30 a.m. Ngorongoro Crater is the world's biggest inactive, undamaged, and unfilled volcanic caldera. It has a vast floor of over 260 square kilometers and a depth of over 2000 feet. The 5-hour game drive on the crater floor will
provide plenty of animal action. Having the camera ready is highly advised. African elephants, buffaloes, black rhinos, hippos, hyenas, cheetahs, and lions are abundant. Following the picnic lunch by the stunning Hippo pool, you will begin a difficult ascent to the crater's top exit. You will be have dinner and rest at Arusha.`,
      },
      {
        day: 6,
        title: "Arusha to Arusha",
        altitude: "1500m - 2300m",
        distance: "145 Km",
        time: "4-5 hours",
        habitat: "Plains to Crater Rim",
        image: img,
        description: `Around 5:30 am, our driver will arrive at your Arusha hotel to pick you up for your 11 hour trip to Arusha. It is a whole day trip with breakfast and dinner covered, arriving at Arusha in the evening.
End of tour.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 3200 },
      { group: "2-4 people", price: 2400 },
      { group: "5-7 people", price: 1650 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },

  "skies-over-the-wild": {
    showTabDescription: true,
    showPriceTab: true,
    name: "Skies Over The Wild",
    hasMultipleDays: false,
    isEscapeDSM: true,
    whiteBg: "Tarangire & Balloon Safari",
    blackBg: "3 Days",
    tabDescription:
      "Escape the urban jungle and dive into the real one. From Arusha's busy streets to the endless plains of Serengeti and the ancient crater of Ngorongoro—witness the Great Migration, spot the Big Five, and discover why Tanzania is the heart of African safari.",
    description: `
Trade the city skyline for sweeping savannah views as you journey from Arusha to the elephant-rich plains of Tarangire National Park. Drift above ancient baobabs and herds of wildlife on a magical hot air balloon safari—watching the sunrise light up the landscape in golden hues. This is Tarangire from above: peaceful, powerful, and unforgettable.
`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: " Arusha to Tarangire N.Park",
        altitude: "0m - 1400m",
        distance: "650 Km",
        time: "1 hour flight",
        habitat: "Urban to Highland",
        image: img,
        description: `Around 5:30 am, our driver will arrive at your Arusha hotel/residence to pick you up for your 11 hour trip to Tarangire National Park. It is a whole day trip with breakfast and dinner covered, arriving at Tarangire in the evening. You will get dinner and rest at the lodge ready for tomorrow’s activities.`,
      },
      {
        day: 2,
        title: "A Balloon Experience & Game Drive",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Highland to Savannah",
        image: img,
        description: `Early in the morning 5am, you will be picked at your lodge ready for the balloon experience and observing the good sceneries and wildlife at Tarangire National Park for 2-3 hours. After, you will have certificates and breakfast, and then game drive for the remaining hours till late 4 pm. You will get back to
Arusha for dinner and rest.`,
      },
      {
        day: 3,
        title: "Arusha to Arusha",
        altitude: "1500m",
        distance: "200 Km",
        time: "8-10 hours",
        habitat: "Endless Plains",
        image: img,
        description: `Around 5:30 am, our driver will arrive at your Arusha hotel to pick you up for your 11 hour trip to Dar es
Salaam. It is a whole day trip with breakfast and dinner covered, arriving at Arusha in the evening.
End of tour.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 2100 },
      { group: "2 people", price: 4200 },
      { group: "3 people", price: 6300 },
      { group: "4 people", price: 8400 },
      { group: "5 people", price: 10500 },
      { group: "6 people", price: 12600 },
      { group: "7 people", price: 14700 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },

  "exploring-culture-and-wildlife": {
    showTabDescription: true,
    showPriceTab: true,
    name: "Cultural Experience",
    hasMultipleDays: false,
    isEscapeDSM: true,
    whiteBg: " Lake Manyara, Serengeti & Ngorongoro N.Park",
    blackBg: "4 Days",
    tabDescription:
      "Leave behind the hum of the city and follow the call of the wild. This journey takes you from the heartbeat of Arusha to the open plains of Mikumi and the untamed wilderness of Nyerere—where elephants roam free, rivers whisper ancient stories, and the stars shine brighter than ever.",
    description: `
Explore the unique cultures of the Hadzabe and Datoga tribes alongside the stunning beauty of Lake Manyara. The Hadzabe, known for their traditional hunter-gatherer lifestyle, offer a rare insight into ancient survival techniques, while the Datoga are renowned for their cattle herding and intricate craftsmanship. Lake Manyara, with its vibrant birdlife, tree-climbing lions, and breathtaking landscapes, creates the perfect setting for this cultural and wildlife adventure.

`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: " Arusha/Moshi to Lake Manyara N.Park",
        altitude: "0m - 500m",
        distance: "283 Km",
        time: "5-6 hours",
        habitat: "Urban to Savannah",
        description: `Early in the morning we will leave to Lake Manyara National Park. The park draws a vast range of animals, including tree-climbing lions, elephants, buffalos, hippos, antelopes, enormous baboon bands, and flocks of flamingos that decorate the gorgeous lake, as well as more than 400 bird species. We will have a game drive and a picnic lunch at Manyara Park before returning to lodge late evening for dinner
and sleep.`,
      },
      {
        day: 2,
        title: "Lake Eyasi & Back to Arusha/Moshi",
        altitude: "500m",
        distance: "150 Km",
        time: "8-10 hours",
        habitat: "Savannah",
        description: `Early in the morning at 6am, we will begin the journey to Lake Eyasi to join the Hadzabe. The Hadzabe will teach us how to use their bow and arrows, collecting some tubers, roots, and fruits with the women or join the men on hunting. Hunting is done in the morning; we will follow the hunters behind and see how the hunting is done. In noon, we will visit the Datoga, who are the blacksmith, as they make weapons such as arrowheads and knives which they trade with the Bushmen. Late evening, we will begin the journey back to Arusha/Moshi.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 1100 },
      { group: "2-4 people", price: 800 },
      { group: "5-7 people", price: 650 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },

  "into-the-wild-heart": {
    showTabDescription: true,
    showPriceTab: true,
    name: "Into The Wild Heart",
    hasMultipleDays: false,
    isEscapeDSM: true,
    whiteBg: "Tarangire & Ngorongoro National Park",
    blackBg: "4 Days",
    tabDescription:
      "Escape the urban jungle and dive into the real one. From Arusha's busy streets to the endless plains of Serengeti and the ancient crater of Ngorongoro—witness the Great Migration, spot the Big Five, and discover why Tanzania is the heart of African safari.",
    description: `Leave behind the coastal breeze and step into Tanzania’s untamed soul. Start your journey in Tarangire, where massive baobabs and roaming elephant herds greet you at every turn. Then descend into the ancient Ngorongoro Crater, a natural amphitheater teeming with wildlife—from lions and rhinos to flamingos and grazing gazelles. A perfect blend of raw beauty and timeless wonder.
`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: " Arusha to Arusha",
        altitude: "0m - 1400m",
        distance: "650 Km",
        time: "1 hour flight",
        habitat: "Urban to Highland",
        image: img,
        description: `Around 5:30 am, our driver will arrive at your Arusha hotel/residence to pick you up for your 11
hour trip to Arusha. It is a whole day trip with breakfast and dinner covered, arriving at Arusha in the
evening. You will get dinner and rest at the lodge ready for tomorrow’s activities.`,
      },
      {
        day: 2,
        title: "Arusha to Tarangire National Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Highland to Savannah",
        image: img,
        description: `After breakfast, we will pick you at your hotel in Moshi/Arusha for a short safari briefing before heading to Tarangire National Park. On the route, you'll pass in the malls/supermarkets of Arusha for any last- minute purchases before heading into the bush. This park is famous for its large elephant population and
towering Baobab trees. Over 3000 elephants have been reported migrating through the Tarangire Lake Manyara habitat. After a full day of wildlife drive in Tarangire, you will travel to Manyara or Karatu for dinner and sleep.`,
      },
      {
        day: 3,
        title: "Tarangire  to  Ngorongoro N.Park",
        altitude: "1500m",
        distance: "200 Km",
        time: "8-10 hours",
        habitat: "Endless Plains",
        image: img,
        description: `After early breakfast we will travel to the Ngorongoro Conservation Area before descending to the crater
for game watching in the world's largest caldera, which boasts breathtaking scenery and a high concentration of animals, including the endangered black rhino. The terrain is home of the BIG 5 and to many elephants, so keep your eyes open for this enormous species. The Ngorongoro Crater features a
large number of wildlife. Picnic lunch in the Ngoitok-tok area, followed by a wildlife viewing drive to Arusha for dinner and an overnight stay.`,
      },
      {
        day: 4,
        title: "Arusha to Arusha",
        altitude: "1500m - 2300m",
        distance: "145 Km",
        time: "4-5 hours",
        habitat: "Plains to Crater Rim",
        image: img,
        description: `Around 5:30 am, our driver will arrive at your Arusha hotel to pick you up for your 11 hour trip to Dar es
Salaam. It is a whole day trip with breakfast and dinner covered, arriving at Arusha in the evening.
End of tour.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 2100 },
      { group: "2-4 people", price: 1600 },
      { group: "5-7 people", price: 1350 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },

  "where-the-bush-meets-the-beach": {
    showTabDescription: true,
    showPriceTab: true,
    name: "Where The Bush Meets The Beach",
    hasMultipleDays: false,
    isEscapeDSM: true,
    whiteBg: "Saadani National Park ",
    blackBg: "2 Days",
    tabDescription:
      "Escape the urban jungle and dive into the real one. From Arusha's busy streets to the endless plains of Serengeti and the ancient crater of Ngorongoro—witness the Great Migration, spot the Big Five, and discover why Tanzania is the heart of African safari.",
    description: `
Escape the city and venture to Saadani, Tanzania’s only national park where the wild meets the waves. Just a short journey from Arusha, Saadani offers a rare blend of safari and seashore—spot elephants and lions by day, then unwind on untouched beaches by sunset. It’s the perfect coastal wilderness retreat, where nature writes the soundtrack.

`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: " Arusha to Saadani N.Park",
        altitude: "0m - 1400m",
        distance: "650 Km",
        time: "1 hour flight",
        habitat: "Urban to Highland",
        image: img,
        description: `Early in the morning, you will be picked up from the airport or your hotel for your departure to Sadaani National Park. The drive will take approximately 2 hours as you unwind through the beautiful setting of local villages, the historical triangle, and the fascinating Wami river. When you arrive at the park, you will go for an evening game drive to catch a glimpse of some of the wildlife in the park, which includes wildebeests, hartebeest, giraffe, zebra, waterbuck, and sable antelope, among many others.`,
      },
      {
        day: 2,
        title: "Game Drive & Boat Safari to  Dar",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Highland to Savannah",
        image: img,
        description: `During a morning game drive in the park, you may see the big four, such as lions, African bush elephants, Cape buffaloes, and leopards, as well as many other animals. You can choose to have a picnic lunch at the beach, relax in the fresh air of the ocean, or return to your lodge for lunch. In the afternoon, enjoy a boat safari along the Wami River. The waters and swamplands are home to a big population of hippos, crocodiles, and various water birds, making it ideal for passionate bird watchers. After your boat safari, you'll depart the park and return to Arusha to your accommodation or be
dropped off at the airport.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 854 },
      { group: "2-4 people", price: 654 },
      { group: "5-7 people", price: 504 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },

  "into-the-untamed-wilderness": {
    showTabDescription: true,
    showPriceTab: true,
    name: "Into The Untamed Wilderness",
    hasMultipleDays: false,
    isEscapeDSM: true,
    whiteBg: "Nyerere National Park ",
    blackBg: "2 Days",
    tabDescription:
      "Escape the urban jungle and dive into the real one. From Arusha's busy streets to the endless plains of Serengeti and the ancient crater of Ngorongoro—witness the Great Migration, spot the Big Five, and discover why Tanzania is the heart of African safari.",
    description: `
From the bustling city of Arusha, venture into the expansive wilderness of Nyerere National Park, where vast savannahs meet meandering rivers. Home to one of the largest wildlife sanctuaries in Africa, this trip promises unforgettable encounters with majestic elephants, prowling lions, and the serene beauty of the Rufiji River. A perfect getaway for those who seek a true safari adventure just a short distance from the city.

`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: " Arusha to Nyerere N.Park",
        altitude: "0m - 1400m",
        distance: "650 Km",
        time: "1 hour flight",
        habitat: "Urban to Highland",
        image: img,
        description: `You will be picked up in the morning at 4:30 am from Arusha and driven by our experienced driver to Selous Game Reserve (Nyerere National Park) via Kisarawe. The trip should take approximately 3 and half hours. When you first arrive to Nyerere National Park, you will go on game drives till dusk,
during which you will be able to see a variety of tourist attractions, including antelopes, giraffes, zebras, lions, elephants, and more. Birds and other landscape features, such as ponds, dry grasslands, light acacia forests, and higher ground with expansive views of distant mountains, will also be visible to you. After that, you'll head to Camp or Lodge for dinner and rest in order to get ready for the final day.`,
      },
      {
        day: 2,
        title: "Boat Safari &  Back to Arusha",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Highland to Savannah",
        image: img,
        description: `You will start the day with morning tea and then go on a bushman walking trip through the forest with our armed ranger. After that, you will do a boat safari in the Rufiji River, Tanzania's largest and longest river. It is over 600 kilometers (370 miles) long, with its mouth on the Indian Ocean and its source in southwestern Tanzania. Crocodiles, hippos, river bluffs, birds, and more are among the river's many attractions. You will return to your camp or lodge for breakfast following the boat tour. While you're getting ready to return to Arusha, stop for lunch.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 854 },
      { group: "2-4 people", price: 654 },
      { group: "5-7 people", price: 504 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },

  // Home (Popular Packages) (no tabs, show routes on left, days on right)

  "premier-nothern-safari": {
    showTabDescription: true,
    showPriceTab: true,
    name: "Premier Nothern Safari",
    hasMultipleDays: false,
    isEscapeDSM: true,
    whiteBg: " Lake Manyara, Serengeti, Ngorongoro & Tarangire ",
    blackBg: "5 Days",
    tabDescription:
      "Escape the urban jungle and dive into the real one. From Arusha's busy streets to the endless plains of Serengeti and the ancient crater of Ngorongoro—witness the Great Migration, spot the Big Five, and discover why Tanzania is the heart of African safari.",
    description: `Discover the magic of Tanzania's northern safari circuit as you explore four of its most celebrated national parks. Witness tree-climbing lions and vibrant birdlife in Lake Manyara, experience the vast wildlife-rich plains of the Serengeti, descend into the spectacular Ngorongoro Crater teeming with the Big Five, and encounter massive herds of elephants in Tarangire. This journey offers an immersive blend of breathtaking landscapes, diverse ecosystems, and unforgettable wildlife experiences.
`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: "Arusha to Lake Manyara N. Park",
        altitude: "0m - 1400m",
        distance: "650 Km",
        time: "1 hour flight",
        habitat: "Urban to Highland",
        image: img,
        description: `Early in the morning we will leave to Lake Manyara National Park. The park draws a vast range of animals, including tree-climbing lions, elephants, buffalos, hippos, antelopes, enormous baboon bands, and flocks of flamingos that decorate the gorgeous lake, as well as more than 400 bird species. We will have a game drive and a picnic lunch at Manyara Park before returning to lodge late evening for dinner and sleep.`,
      },
      {
        day: 2,
        title: "Lake Manyara to Serengeti N.Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Highland to Savannah",
        image: img,
        description: `After a hearty breakfast, we will go to the Serengeti National Park and journey across the never-ending plain grasslands. The Serengeti is undoubtedly the world's most stunning animal sanctuary. An afternoon wildlife drive through the boundless plains of the Serengeti will provide us with the opportunity to
observe large herds of wildebeest, zebras, and gazelles, as well as a pride of lions lazing in the shade. A picnic lunch will be served throughout the day-long game drive. The adventurous day concludes with a hearty dinner and a nice night's sleep in our accommodations.`,
      },
      {
        day: 3,
        title: "Serengeti  to Ngorongoro Crater",
        altitude: "1500m",
        distance: "200 Km",
        time: "8-10 hours",
        habitat: "Endless Plains",
        image: img,
        description: `After breakfast, we will embark on a morning wildlife drive across Serengeti National Park. Later, head for the Ngorongoro Conservation Area with a picnic lunch. Ngorongoro Crater is the world's largest collapsed volcano crater, spanning fourteen kilometers of solitary natural splendor. Ngorongoro Crater is ringed by a ring of ancient volcanoes, and the bottom, riddled with watering holes, supports over 30,000 animals. The adventurous day concludes with a hearty dinner and a nice night's sleep in our accommodations.`,
      },
      {
        day: 4,
        title: "Ngorongoro to Tarangire N.Park",
        altitude: "1500m - 2300m",
        distance: "145 Km",
        time: "4-5 hours",
        habitat: "Plains to Crater Rim",
        image: img,
        description: `After an early breakfast, descend to the crater floor for a five-hour game drive. Expect to witness lions, elephants, zebras, hippos, flamingos, jackals, rhinos, antelopes, and a variety of birds. Birds spotted here include eagles, vultures, and flamingos at Crater Lake, as well as storks, bats, gigantic vultures, sacred ibis, kori bustards, blacksmith plovers, long-necked herons, and cattle eagles. Following the picnic lunch by the stunning Hippo pool, we  will begin a difficult ascent to the crater’s top exit. The day will end with a two-hour drive to our lodge at Karatu. A freshly prepared, scrumptious dinner is kept ready for you at your chosen lodging.`,
      },
      {
        day: 5,
        title: "Tarangire N.P to Arusha",
        altitude: "2300m - 1700m - 2300m",
        distance: "120 Km",
        time: "8-10 hours",
        habitat: "Crater Floor",
        image: img,
        description: `The final day of our  safari will begin as usual by 8:00 AM after a luscious breakfast. The destination for today is Arusha to Tarangire National Park where we will have a half day game drive. Tanzania’s third largest National park is known for its majestic baobab trees that dot the landscape, dwarfing the animals that feed beneath them. The Tarangire River is the centerpiece of this park which is famous for some of the largest herds of elephants in Africa. Here you may see lion, leopard, cheetah, lesser kudu, buffalo, Oryx, eland, giraffe and zebra. By mid afternoon, we will branch out and head towards Arusha where we will be dropped off to your hotel/preferred location by about 6PM in the evening.`,
      },
    ],
    pricing: [
      { group: "1 person", price: 2800 },
      { group: "2-4 people", price: 2175 },
      { group: "5-7 people", price: 1600 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },

  "ultimate-nothern-tanzania-safari": {
    showTabDescription: true,
    showPriceTab: true,
    name: "Ultimate Nothern Tanzania Safari",
    hasMultipleDays: false,
    isEscapeDSM: true,
    whiteBg: "Arusha,L.Manyara, Serengeti, Ngorongoro, Tarangire ",
    blackBg: "6 Days",
    tabDescription:
      "Escape the urban jungle and dive into the real one. From Arusha's busy streets to the endless plains of Serengeti and the ancient crater of Ngorongoro—witness the Great Migration, spot the Big Five, and discover why Tanzania is the heart of African safari.",
    description: `Embark on an unforgettable journey through Tanzania’s most iconic national parks. From the lush landscapes of Arusha National Park to the flamingo-filled shores of Lake Manyara, the elephant-rich plains of Tarangire, the breathtaking Ngorongoro Crater, and the endless savannas of Serengeti, this adventure promises unparalleled wildlife encounters and stunning natural beauty.`,
    image: img,
    difficulty: "Easy",
    success_rate: "100%",
    itinerary: [
      {
        day: 1,
        title: " Arusha to Arusha National Park",
        altitude: "0m - 1400m",
        distance: "650 Km",
        time: "1 hour flight",
        habitat: "Urban to Highland",
        image: img,
        description: `Pick up at 8:30 AM from your Hotel in Arusha and  depart for Arusha National Park. Walking with an Armed Ranger, we will have picnic lunch and game drive in the Park. The park is at the base of Mount Meru, which is good for climbing. It has a range of habitats including forest – home to the black and white colobus monkey and is excellent for birding. Several lakes often host flocks of flamingo. The parks appeal is mainly its scenery. The habitat diversity spans from montane (mountain) rain forest to moist savannah to alpine moorland. Post the game drive, we will head back to your camp/lodge where a delicious dinner awaits you.`,
      },
      {
        day: 2,
        title: "Arusha to Lake Manyara N. Park",
        altitude: "1400m - 1500m",
        distance: "335 Km",
        time: "6-7 hours",
        habitat: "Highland to Savannah",
        image: img,
        description: `Early in the morning we will leave to Lake Manyara National Park. The park draws a vast range of animals, including tree-climbing lions, elephants, buffalos, hippos, antelopes, enormous baboon bands, and flocks of flamingos that decorate the gorgeous lake, as well as more than 400 bird species. We will have a game drive and a picnic lunch at Manyara Park before returning to lodge late evening for dinner and sleep.`,
      },
      {
        day: 3,
        title: "Lake Manyara to Serengeti N.Park",
        altitude: "1500m",
        distance: "200 Km",
        time: "8-10 hours",
        habitat: "Endless Plains",
        image: img,
        description: `After a hearty breakfast, we will go to the Serengeti National Park and journey across the never ending plain grasslands. The Serengeti is undoubtedly the world's most stunning animal sanctuary. An afternoon wildlife drive through the boundless plains of the Serengeti will provide us with the opportunity to observe large herds of wildebeest, zebras, and gazelles, as well as a pride of lions lazing in the shade. A picnic lunch will be served throughout the day long game drive. The adventurous day concludes with a hearty dinner and a nice night's sleep in our accommodations.`,
      },
      {
        day: 4,
        title: "Full Day at Serengeti N.Park",
        altitude: "1500m - 2300m",
        distance: "145 Km",
        time: "4-5 hours",
        habitat: "Plains to Crater Rim",
        image: img,
        description: `We depart around 8:00 AM after breakfast, with packed lunch boxes for full day game drives that last for about 8-9 hours in Central Serengeti. The central park area, known as the Seronera area, one of the richest wildlife habitats in the park, featuring the Seronera River, which provides a valuable water
source to this area and therefore attracts wildlife well representative of most of the Serengeti species. The long day comes to an end with a good dinner and a good night’s rest in our accommodation.`,
      },
      {
        day: 5,
        title: "Serengeti  to Ngorongoro Crater",
        altitude: "2300m - 1700m - 2300m",
        distance: "120 Km",
        time: "8-10 hours",
        habitat: "Crater Floor",
        image: img,
        description: `After breakfast, we will embark on a morning wildlife drive across Serengeti National Park. Later, head for the Ngorongoro Conservation Area with a picnic lunch. Ngorongoro Crater is the world's largest collapsed volcano crater, spanning fourteen kilometers of solitary natural splendor. Ngorongoro Crater is ringed by a ring of ancient volcanoes, and the bottom, riddled with watering holes, supports over 30,000 animals. The adventurous day concludes with a hearty dinner and a nice night's sleep in your accommodations.`,
      },
      {
        day: 6,
        title: "Full Day at Ngorongoro National Park",
        altitude: "2300m - 1400m - 0m",
        distance: "650 Km",
        time: "1 hour flight",
        habitat: "Highland to Coastal",
        image: img,
        description: `After a quick breakfast, we will descend into the crater bottom at approximately 6:30 a.m. Ngorongoro Crater is the world's biggest inactive, undamaged, and unfilled volcanic caldera. It has a vast floor of over 260 square kilometers and a depth of over 2000 feet. The 5-hour game drive on the crater floor will
provide plenty of animal action. Having the camera ready is highly advised. African elephants, buffaloes, black rhinos, hippos, hyenas, cheetahs, and lions are abundant. Following the picnic lunch by the stunning Hippo pool, we will begin a difficult ascent to the crater's top exit. `,
      },
    ],
    pricing: [
      { group: "1 person", price: 4500 },
      { group: "2-4 people", price: 3700 },
      { group: "5-7 people", price: 3000 },
    ],
    inclusions: [
      "Pick-up and drop-off at Kilimanjaro International Airport",
      `All park fees collected by the National Park (conservation fees, camping
fees, crew fees, vehicle fee, rescue fee and all other fees collected by the Tanzania
National Parks Authority).`,
      "All accomodations",
      "All meals",
      `Professional guides, licensed by Tanzania National Park. All our guides are the holder
of Wilderness First Responder or Wilderness First Aid certifications. All our guides have
10+years of successful mountaineering experience.`,
    ],
    exclusions: [
      "Airline tickets",
      "Accommodation after tour.",
      "Personal gear rentals",
      "Visa fees",
      "Tips",
    ],
  },
};

const getDestinationKeywords = (destinationName: string): string[] => {
  const name = destinationName.toLowerCase();
  const keywordMap: { [key: string]: string[] } = {
    serengeti: ["serengeti"],
    ngorongoro: ["ngorongoro", "crater"],
    kilimanjaro: [
      "kilimanjaro",
      "machame",
      "lemosho",
      "rongai",
      "marangu",
      "umbwe",
      "shira",
    ],
    tarangire: ["tarangire"],
    manyara: ["manyara", "lake manyara"],
    mikumi: ["mikumi"],
    nyerere: ["nyerere", "selous"],
    arusha: ["arusha"],
    saadani: ["saadani"],
    mkomazi: ["mkomazi"],
    bongoyo: ["bongoyo", "island"],
    sinda: ["sinda", "island"],
    pugu: ["pugu", "hills"],
  };

  // Find matching keywords
  for (const [key, keywords] of Object.entries(keywordMap)) {
    if (name.includes(key)) {
      return keywords;
    }
  }

  // Fallback: extract main word
  return [name.split(" ")[0]];
};

// Updated filter routes based on destination
const getRelatedRoutes = (destinationName: string) => {
  const keywords = getDestinationKeywords(destinationName);
  return Object.entries(routeData).filter(([routeKey, route]) => {
    const routeDataItem = route as RouteData;

    // Only check route name
    const nameMatch = keywords.some((keyword) =>
      routeDataItem.name.toLowerCase().includes(keyword)
    );

    // Only check whiteBg field if it exists (for simple routes)
    const whiteBgMatch =
      isSimpleRoute(routeDataItem) && routeDataItem.whiteBg
        ? keywords.some((keyword) =>
            routeDataItem.whiteBg!.toLowerCase().includes(keyword)
          )
        : false;

    return nameMatch || whiteBgMatch;
  });
};

// Helper function for getting route info
const getRouteDisplayInfo = (route: RouteData) => {
  if (isSimpleRoute(route)) {
    return {
      description: route.description,
      duration: route.duration || route.blackBg || "",
      pricing: route.pricing,
    };
  } else if (isRouteWithVariants(route)) {
    // Get first variant for display
    const firstVariant = Object.values(route.variants)[0];
    return {
      description: firstVariant.description,
      duration: firstVariant.duration,
      pricing: firstVariant.pricing,
    };
  }

  return {
    description: "",
    duration: "",
    pricing: [],
  };
};

// Convert destination name to URL slug
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// Get display name from slug
const getDisplayName = (slug: string): string => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function DestinationOverview() {
  const params = useParams();
  const router = useRouter();
  const destinationSlug = params.destinationName as string;
  const destinationName = getDisplayName(destinationSlug);
  const relatedRoutes = getRelatedRoutes(destinationName);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleRouteClick = (routeKey: string) => {
    router.push(`/routes/${routeKey}`);
  };

  const handleBackClick = () => {
    router.back();
  };
  const navigateToContact = () => {
    router.push("/contact");
  };

  if (relatedRoutes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No routes found
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't find any routes for {destinationName}
          </p>
          <button
            onClick={handleBackClick}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff9f5]">
      {/* Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-6 md:mt-20">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-8 h-8 bg-white p-2 rounded-full mr-2" />
            Back to Destinations
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {destinationName}
              </h1>
              <p className=" text-gray-600">
                {relatedRoutes.length} amazing{" "}
                {relatedRoutes.length === 1 ? "experience" : "experiences"}{" "}
                available
              </p>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-9 h-9 rounded-full border-2 border-[#68AC33] animate-ping-fast"></div>
              </div>
              <div className="bg-white  rounded-full p-3">
                <PiMapPinAreaLight className="w-6 h-6 text-[#68AC33]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 rounded-t-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedRoutes.map(([routeKey, route]) => {
            const routeInfo = getRouteDisplayInfo(route as RouteData);

            return (
              <div
                key={routeKey}
                className={` rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all duration-300 ${
                  hoveredCard === routeKey
                    ? "transform scale-105 shadow-xl"
                    : ""
                }`}
                onClick={() => handleRouteClick(routeKey)}
                onMouseEnter={() => setHoveredCard(routeKey)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image */}
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <Image
                    src={route.image || "/placeholder.svg?height=300&width=400"}
                    alt={route.name}
                    style={{ objectFit: "cover" }}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {route.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {routeInfo.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{routeInfo.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">Group Tours</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        $
                        {routeInfo.pricing[0]?.price?.toLocaleString() || "N/A"}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">
                        / person
                      </span>
                    </div>
                    <button className="hover:bg-[#79b948] text-white px-4 py-2 rounded-full text-sm bg-[#946626] transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center  rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can't decide which {destinationName} experience to choose?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our travel experts are here to help you find the perfect adventure
            that matches your interests, budget, and schedule.
          </p>
          <button
            className="bg-[#946626] text-white px-8 py-3 rounded-lg  transition-colors font-medium"
            onClick={navigateToContact}
          >
            Get Personalized Recommendations
          </button>
        </div>
      </div>
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @keyframes ping-medium {
          0% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        @keyframes ping-fast {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-ping-medium {
          animation: ping-medium 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.3s;
        }

        .animate-ping-fast {
          animation: ping-fast 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.6s;
        }
      `}</style>
    </div>
  );
}
