"use client";
import {
  CreditCard,
  Smartphone,
  Shield,
  Clock,
  CheckCircle,
  Calendar,
  DollarSign,
  ArrowRight,
  Lock,
  Globe,
  Headphones,
  Sparkles,
  CreditCardIcon,
  Timer,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import pic1 from "../../../public/assets/images/mpesa.jpeg";
import pic2 from "../../../public/assets/images/tigo.png";
import pic3 from "../../../public/assets/images/airtel.jpg";
import pic4 from "../../../public/assets/images/visa.jpg";
import pic5 from "../../../public/assets/images/mastercard.png";
import pic6 from "../../../public/assets/images/swahilies.png";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";

// Animated components
const FadeIn = ({ children, delay = 0, className = "", direction = null }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === null ? 30 : 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const PricingPage = () => {
  const router = useRouter();
  const navigateToContact = () => {
    router.push("/contact");
  };
  const navigateToDestinations = () => {
    router.push("/destinations");
  };
  const paymentMethods = [
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Credit & Debit Cards",
      description: "Visa, Mastercard, American Express accepted worldwide",
      features: [
        "Instant confirmation",
        "Secure encryption",
        "Global acceptance",
      ],
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Money",
      description:
        "Pay with your mobile wallet - M-Pesa, Airtel Money, and more",
      features: ["Local payment methods", "Quick processing", "No extra fees"],
    },
  ];

  const paymentOptions = [
    {
      type: "Full Payment",
      color: "bg-gradient-to-br from-gray-50 to-gray-100",
      borderColor: "border-gray-200",
      iconBg: "bg-[#78D8FF]",
      iconColor: "text-white",
      icon: <DollarSign className="w-6 h-6" />,
      title: "Pay in Full",
      subtitle: "Complete your booking instantly",
      benefits: [
        "Immediate booking confirmation",
        "No additional processing fees",
        "Complete peace of mind",
        "Priority customer support",
      ],
      badge: "Most Popular",
      buttonColor: "bg-[#78D8FF] hover:bg-sky-500",
    },
    {
      type: "Installment",
      color: "bg-gradient-to-br from-orange-50 to-amber-50",
      borderColor: "border-orange-200",
      iconBg: "bg-[#F4A460]",
      iconColor: "text-white",
      icon: <Calendar className="w-6 h-6" />,
      title: "Pay in Installments",
      subtitle: "Spread your payments over time",
      benefits: [
        "30% initial payment to secure booking",
        "Flexible payment cycles (3, 6, or 12 months)",
        "Automated payment reminders",
        "Same great service and support",
      ],
      badge: "Flexible",
      buttonColor: "bg-[#F4A460] hover:bg-[#f4b660]",
    },
  ];

  const securityFeatures = [
    {
      icon: <Shield className="w-6 h-6 text-[#68AC33]" />,
      title: "Bank-Level Security",
      description: "256-bit SSL encryption protects all transactions",
    },
    {
      icon: <Lock className="w-6 h-6 text-[#68AC33]" />,
      title: "PCI Compliant",
      description: "Certified secure payment processing standards",
    },
    {
      icon: <Globe className="w-6 h-6 text-[#68AC33]" />,
      title: "Global Coverage",
      description: "Accept payments from anywhere in the world",
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#68AC33]" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for payment issues",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Choose Your Adventure",
      description:
        "Select your preferred route and customize your trip details including dates, group size, and special requirements.",
    },
    {
      number: "02",
      title: "Enter Traveler Information",
      description:
        "Provide details for all travelers including personal information, emergency contacts, and dietary preferences.",
    },
    {
      number: "03",
      title: "Select Payment Option",
      description:
        "Choose between full payment or flexible installments, then complete your secure payment using your preferred method.",
    },
    {
      number: "04",
      title: "Confirmation & Preparation",
      description:
        "Receive instant confirmation with detailed itinerary, packing lists, and pre-trip preparation guidelines.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Payment Options Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-[#fff9f5] text-[#68AC33]  backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-5 h-5 mr-2" />
            <span className="text-sm font-semibold">
              Trusted by 50,000+ Adventurers
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Payment Style
          </h2>
          <p className=" text-gray-600 max-w-3xl mx-auto">
            Whether you prefer to pay upfront or spread costs over time, we've
            got you covered with flexible options designed for every budget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {paymentOptions.map((option, index) => (
            <div
              key={index}
              className={`relative bg-white ${option.borderColor} border-1 rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:shadow-sm`}
            >
              {option.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {option.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div
                  className={`${option.iconBg} ${option.iconColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600">{option.subtitle}</p>
              </div>

              <ul className="space-y-4 mb-8 md:w-[65%] md:mx-auto">
                {option.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#68AC33] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* <button
                className={`w-full ${option.buttonColor} text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center`}
              >
                Choose {option.title}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button> */}
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-[#fff9f5] text-[#68AC33] backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <CreditCardIcon className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">Multiple Options</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Multiple Payment Methods
            </h2>
            <p className=" text-gray-600 max-w-3xl mx-auto">
              Pay the way that works best for you. We support a wide range of
              payment methods for your convenience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 lg:p-10">
                <div className="text-[#68AC33] mb-6">{method.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-6">{method.description}</p>
                <ul className="space-y-3">
                  {method.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#68AC33] mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Payment Logos */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center bg-[#fff9f5] text-[#68AC33]  backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">Trusted</span>
            </div>
            <p className="text-gray-500 mb-8">
              Trusted by adventurers worldwide
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {[pic1, pic2, pic3, pic4, pic5, pic6].map((logo, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="flex items-center justify-center hover:grayscale-75   transition-all duration-300">
                    <div className="relative h-16 w-16 ">
                      <Image
                        src={logo || "/placeholder.svg"}
                        alt={`Client logo ${index + 1}`}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-[#fff9f5] text-[#68AC33] rounded-full px-4 py-2 mb-6">
            <Timer className="w-4 h-4 mr-2" />
            <span className="text-sm font-semibold">Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Our Booking Process Works
          </h2>
          <p className=" text-gray-600 max-w-3xl mx-auto">
            From selection to confirmation, our streamlined process makes
            booking your adventure simple and secure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-[#fff9f5] text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">Bank-Level Security</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Security is Our Priority
            </h2>
            <p className=" text-gray-500 max-w-3xl mx-auto">
              We use industry-leading security measures to protect your personal
              and financial information at every step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                <p className="">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#cf5622] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Star className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">
                Join 50,000+ Happy Adventurers
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of adventurers who trust us with their dream
              expeditions. Secure your spot today with our flexible payment
              options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={navigateToDestinations}
                className="bg-white  text-[#68AC33] px-8 py-4 rounded-full font-semibold text-lg transition-colors"
              >
                Browse Adventures
              </button>
              <button
                onClick={navigateToContact}
                className="border border-white  px-8 py-4 rounded-full font-semibold text-lg transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
