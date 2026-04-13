import React from "react";
import heroImage from "../../../public/assets/images/hero.jpg";
import customer from "../../../public/assets/images/custom.png";
import Image from "next/image";

function page() {
  return (
    <div>
      <div className="relative md:h-[90vh] h-[50vh] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-white/70 z-10"></div>
        <h1 className="absolute uppercase inset-0 flex items-center justify-center text-3xl md:text-5xl z-20 text-black font-medium">
          ABOUT Viaggio Tanzania
        </h1>
      </div>
      <div className="min-h-screen bg-gray-50">
        {/* Mission and Vision Section */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="md:text-4xl text-2xl font-medium text-gray-800 mb-4">
              Welcome to Viaggio Tanzania. Travel Made Easy, Payment Made
              Flexible
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-blue-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Mission
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed text-center">
                To Make Every Trip As Enjoyable And Comfortable By Offering
                Flexible Payment Options That Cater To Your Needs.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-pink-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Vision
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed text-center">
                To Redefine How People Travel By Offering Innovative Solutions
                That Simplify The Way You Plan, Book, And Pay For Your Trips.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Affordability Card */}
            <div className="bg-green-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Affordability
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed text-center">
                Travel Should Be For Everyone. We Work With Top Providers To
                Offer The Best Deals, Helping You Save Money While Enjoying A
                Premium Experience
              </p>
            </div>

            {/* Flexibility Card */}
            <div className="bg-orange-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Flexibility
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed text-center">
                Whether You're Booking Last-Minute Or Planning Ahead, Our
                Flexible Payment Options Make Travel Easier And More Accessible.
              </p>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What We Offer
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Seamless Booking */}
            <div className="bg-blue-50 rounded-2xl p-8 md:py-14">
              <div className="flex items-center space-x-4 justify-between md:w-[70%] w-full  mx-auto">
                <div className="">
                  <svg
                    width="67"
                    height="67"
                    viewBox="0 0 67 67"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Iconly/Bulk/Calendar">
                      <g id="Calendar">
                        <path
                          id="Fill 1"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.375 47.0952V25.8423H58.625V47.2655C58.625 56.0286 53.1091 61.4165 44.2836 61.4165H22.6888C13.9461 61.4165 8.375 55.9169 8.375 47.0952ZM22.22 40.2277C20.9513 40.2864 19.9033 39.2786 19.8481 37.9972C19.8481 36.713 20.841 35.6522 22.1096 35.5936C23.3507 35.5936 24.3712 36.5735 24.3987 37.8269C24.4539 39.1139 23.461 40.1747 22.22 40.2277ZM33.5552 40.2277C32.2865 40.2864 31.2385 39.2786 31.1833 37.9972C31.1833 36.713 32.1762 35.6522 33.4448 35.5936C34.6859 35.5936 35.7064 36.5735 35.7339 37.8269C35.7891 39.1139 34.7962 40.1747 33.5552 40.2277ZM44.8076 50.5011C43.539 50.4732 42.5185 49.4123 42.5185 48.1282C42.4909 46.844 43.5114 45.786 44.78 45.758H44.8076C46.1039 45.758 47.1519 46.8189 47.1519 48.1282C47.1519 49.4402 46.1039 50.5011 44.8076 50.5011ZM31.1833 48.1282C31.2385 49.4123 32.2865 50.4201 33.5552 50.3615C34.7962 50.3085 35.7891 49.2476 35.7339 47.9635C35.7064 46.7072 34.6859 45.7273 33.4448 45.7273C32.1762 45.786 31.1833 46.844 31.1833 48.1282ZM19.8205 48.1282C19.8757 49.4123 20.9237 50.4201 22.1924 50.3615C23.4335 50.3085 24.4263 49.2476 24.3712 47.9635C24.3436 46.7072 23.3231 45.7273 22.0821 45.7273C20.8134 45.786 19.8205 46.844 19.8205 48.1282ZM42.5461 37.9693C42.5461 36.6851 43.539 35.6522 44.8076 35.6243C46.0487 35.6243 47.0416 36.6265 47.0967 37.8576C47.1243 39.1418 46.1315 40.2026 44.8904 40.2277C43.6217 40.2557 42.5737 39.2786 42.5461 37.9972V37.9693Z"
                          fill="#130F26"
                        />
                        <path
                          id="Fill 4"
                          opacity="0.4"
                          d="M8.38428 25.8422C8.42013 24.2035 8.55803 20.9512 8.81728 19.9043C10.1411 14.0167 14.6366 10.2759 21.0626 9.74268H45.9394C52.3103 10.3038 56.8609 14.0698 58.1847 19.9043C58.4412 20.9233 58.5791 24.2007 58.615 25.8422H8.38428Z"
                          fill="#130F26"
                        />
                        <path
                          id="Fill 6"
                          d="M23.1844 18.397C24.3979 18.397 25.308 17.4785 25.308 16.2474V7.73563C25.308 6.5045 24.3979 5.58325 23.1844 5.58325C21.9709 5.58325 21.0608 6.5045 21.0608 7.73563V16.2474C21.0608 17.4785 21.9709 18.397 23.1844 18.397Z"
                          fill="#130F26"
                        />
                        <path
                          id="Fill 9"
                          d="M43.815 18.397C45.001 18.397 45.9387 17.4785 45.9387 16.2474V7.73563C45.9387 6.5045 45.001 5.58325 43.815 5.58325C42.6015 5.58325 41.6914 6.5045 41.6914 7.73563V16.2474C41.6914 17.4785 42.6015 18.397 43.815 18.397Z"
                          fill="#130F26"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800">
                  Seamless Booking
                </h3>
              </div>
            </div>

            {/* Flexible Payment Options */}
            <div className="bg-orange-50 rounded-2xl p-8 md:py-14">
              <div className="flex items-center space-x-4 justify-between md:w-[70%] w-full  mx-auto">
                <div className="">
                  <svg
                    width="67"
                    height="67"
                    viewBox="0 0 67 67"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Iconly/Bulk/Wallet">
                      <g id="Wallet">
                        <path
                          id="Fill 1"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M61.4069 23.3806H49.5851C44.0837 23.3902 39.6269 27.7356 39.617 33.0996C39.6096 38.4756 44.0713 42.8404 49.5851 42.8476H61.4168V43.7017C61.4168 53.0796 55.7318 58.625 46.111 58.625H20.8918C11.2686 58.625 5.5835 53.0796 5.5835 43.7017V23.2765C5.5835 13.8987 11.2686 8.375 20.8918 8.375H46.1011C55.7218 8.375 61.4069 13.8987 61.4069 23.2765V23.3806ZM18.8148 23.3588H34.5598H34.5697H34.5895C35.7682 23.3539 36.7211 22.4176 36.7162 21.2659C36.7112 20.1167 35.7484 19.1876 34.5697 19.1925H18.8148C17.6435 19.1973 16.6931 20.124 16.6881 21.2684C16.6832 22.4176 17.6361 23.3539 18.8148 23.3588Z"
                          fill="#130F26"
                        />
                        <path
                          id="Fill 4"
                          opacity="0.4"
                          d="M44.7714 34.3281C45.3552 36.9835 47.6833 38.8518 50.3413 38.8032H59.414C60.5199 38.8032 61.417 37.8873 61.417 36.7552V29.6879C61.4146 28.5582 60.5199 27.6399 59.414 27.6375H50.1277C47.1043 27.6472 44.6623 30.1568 44.667 33.2495C44.667 33.6115 44.7026 33.9735 44.7714 34.3281Z"
                          fill="#130F26"
                        />
                        <circle
                          id="Oval"
                          cx="50.2502"
                          cy="33.2209"
                          r="2.79167"
                          fill="#130F26"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800">
                  Flexible Payment Options
                </h3>
              </div>
            </div>

            {/* Group Travel Simplified */}
            <div className="bg-pink-50 rounded-2xl p-8 md:py-14">
              <div className="flex items-center space-x-4 justify-between md:w-[70%] w-full  mx-auto">
                <div className="">
                  <svg
                    width="67"
                    height="67"
                    viewBox="0 0 67 67"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M33.3577 40.5908C23.7265 40.5908 15.6001 42.1646 15.6001 48.2386C15.6001 54.315 23.779 55.8335 33.3577 55.8335C42.9889 55.8335 51.1154 54.2597 51.1154 48.1858C51.1154 42.1093 42.9364 40.5908 33.3577 40.5908Z"
                      fill="#130F26"
                    />
                    <path
                      opacity="0.4"
                      d="M33.3579 34.8039C39.8795 34.8039 45.1088 29.5445 45.1088 22.9853C45.1088 16.4236 39.8795 11.1667 33.3579 11.1667C26.8362 11.1667 21.6069 16.4236 21.6069 22.9853C21.6069 29.5445 26.8362 34.8039 33.3579 34.8039Z"
                      fill="#130F26"
                    />
                    <path
                      opacity="0.4"
                      d="M58.8707 25.7371C60.558 19.1 55.6112 13.1392 49.312 13.1392C48.6271 13.1392 47.9722 13.2146 47.3323 13.3428C47.2473 13.3629 47.1523 13.4056 47.1023 13.4811C47.0448 13.5766 47.0873 13.7048 47.1498 13.7878C49.0421 16.4577 50.1294 19.7084 50.1294 23.1979C50.1294 26.5416 49.1321 29.659 47.3823 32.246C47.2023 32.5124 47.3623 32.872 47.6797 32.9273C48.1197 33.0052 48.5696 33.0454 49.0296 33.058C53.6165 33.1787 57.7334 30.2096 58.8707 25.7371Z"
                      fill="#130F26"
                    />
                    <path
                      d="M63.676 41.364C62.8361 39.564 60.8089 38.3296 57.7268 37.7237C56.272 37.3667 52.335 36.8639 48.673 36.9318C48.618 36.9393 48.588 36.977 48.583 37.0021C48.5755 37.0373 48.5905 37.0977 48.663 37.1354C50.3553 37.9776 56.8969 41.6406 56.0745 49.3663C56.0395 49.7006 56.307 49.9897 56.6395 49.9395C58.2492 49.7082 62.3912 48.8132 63.676 46.0251C64.3859 44.5518 64.3859 42.8398 63.676 41.364Z"
                      fill="#130F26"
                    />
                    <path
                      opacity="0.4"
                      d="M19.6669 13.3438C19.0294 13.213 18.372 13.1401 17.6871 13.1401C11.388 13.1401 6.44112 19.101 8.13089 25.7381C9.26574 30.2106 13.3827 33.1796 17.9696 33.059C18.4295 33.0464 18.882 33.0037 19.3194 32.9282C19.6369 32.8729 19.7968 32.5134 19.6169 32.2469C17.8671 29.6575 16.8697 26.5426 16.8697 23.1989C16.8697 19.7068 17.9596 16.4562 19.8518 13.7888C19.9118 13.7058 19.9568 13.5776 19.8968 13.482C19.8468 13.4041 19.7543 13.3639 19.6669 13.3438Z"
                      fill="#130F26"
                    />
                    <path
                      d="M9.27276 37.7228C6.19067 38.3287 4.16594 39.5631 3.32605 41.3632C2.61365 42.8389 2.61365 44.551 3.32605 46.0267C4.61088 48.8123 8.75283 49.7098 10.3626 49.9386C10.6951 49.9889 10.96 49.7023 10.925 49.3654C10.1026 41.6422 16.6443 37.9793 18.339 37.1371C18.409 37.0968 18.424 37.039 18.4165 37.0013C18.4115 36.9762 18.384 36.9384 18.329 36.9334C14.6645 36.863 10.7301 37.3658 9.27276 37.7228Z"
                      fill="#130F26"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800">
                  Group Travel Simplified
                </h3>
              </div>
            </div>

            {/* 24/7 Customer Support */}
            <div className="bg-green-50 rounded-2xl p-8 md:py-14">
              <div className="flex items-center space-x-4 justify-between md:w-[70%] w-full  mx-auto">
                <div className="">
                  <Image
                    src={customer}
                    alt="customer support"
                    className="w-14 h-14"
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-800">
                  24/7 Customer Support
                </h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default page;
