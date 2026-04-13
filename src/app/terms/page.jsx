import React from "react";
import {
  FileText,
  CreditCard,
  Calendar,
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Shield,
} from "lucide-react";

function TermsConditionsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative md:h-[90vh] h-[50vh] w-full overflow-hidden bg-[#fff9f5]">
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-black">
            <div className="flex justify-center mb-6">
              <FileText className="w-16 h-16 text-[#946626]" />
            </div>
            <h1 className="text-3xl md:text-5xl font-medium mb-4">
              Terms & Conditions
            </h1>
            <p className="text-lg md:text-xl text-[#75ad49] max-w-2xl mx-auto px-4">
              Please read these terms carefully before booking your travel
              experience with us.
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50">
        {/* Introduction Section */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Welcome to Viaggio Tanzania Experiences
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed text-center mb-8">
              These terms and conditions govern the agreement between you and
              Viaggio Tanzania Experiences (the service provider) and our
              various travelers, including but not limited to booking
              confirmations, payment policies, and cancellation procedures.
            </p>
            <div className="bg-red-50 rounded-xl p-6 ">
              <p className="text-gray-700 leading-relaxed">
                We strongly encourage you to review these terms carefully, as
                they form the foundation of our commitment to delivering
                exceptional travel experiences. By confirming your booking or
                using our services, you acknowledge that you have read,
                understood, and agree to be bound by these terms.
              </p>
            </div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-8 px-4 max-w-6xl mx-auto">
          <div className="grid gap-8">
            {/* Booking and Payment Policy */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#946626] p-6">
                <div className="flex items-center space-x-4">
                  <CreditCard className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">
                    Booking and Payment Policy
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      All services are subject to availability and are not
                      guaranteed until confirmed.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      A deposit of 50% (for exceeding 4 pax) or full payment for
                      fewer persons referred to in the booking form is required
                      at the time of booking. If a higher deposit is required,
                      this will be clearly communicated before the booking is
                      confirmed.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      The remaining balance will paid on arrival, before the
                      start of the tour, unless otherwise requested of which a
                      certain percentage on the paid upon the set-off of the
                      tour.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      All bookings are confirmed upon receipt of the deposit and
                      approval of the booking form (fully signed as passport).
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Prices Section */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#946626] p-6">
                <div className="flex items-center space-x-4">
                  <MapPin className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">Prices</h3>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      All prices are quoted and paid in US Dollars unless
                      otherwise stated.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Quoted prices are valid for 30 days from the date of
                      quotation for one person without notice and are not
                      guaranteed until the time of confirmation.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Prices quoted are inclusive of accommodation, meals, park
                      fees, transport, and guide as detailed in the itinerary.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">
                      International flights/air travel as specified, national
                      park and game reserve entrance fees, certified
                      transportation, domestic air transportation where
                      indicated, drivers and guides, three meals per day as
                      identified, unlimited mineral water during game visit at
                      the lodges/camps, activities as defined in the itinerary,
                      and emergency evacuation insurance.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      All the time of booking, we require full details for all
                      passengers (names must be as they appear in passports).
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#946626] p-6">
                <div className="flex items-center space-x-4">
                  <Calendar className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">
                    Cancellation Policy
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Cancellation by You:
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          All cancellations must be made in writing and sent to{" "}
                          <strong>reuben@viaggiotanzania.com</strong> that
                          can be confirmed in writing to an email within 24
                          hours and effective from the day we are notified,
                          provided that written confirmation is received by us
                          within 24 hours of the original communication.
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Cancellation received from 60 days prior to tour start
                          date: loss of 10% of deposit.
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Cancellation received from 30 days prior to tour start
                          date: loss of 50% of total cost.
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Cancellation received from 14 days prior to tour start
                          date: loss of 75% of total cost.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Cancellation by Viaggio Tanzania Experiences:
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Where a tour is cancelled for any reason or any
                          requirement fails our standard checks, all amounts
                          will be refunded.
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Viaggio Tanzania Experiences reserves the right to
                          cancel your tour up to 30 days before start date.
                          After this we will not cancel your tour unless it is
                          for a reason outside our control.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Liability Section */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#946626] p-6">
                <div className="flex items-center space-x-4">
                  <AlertTriangle className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">Liability</h3>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Viaggio Tanzania Experiences accepts no responsibility
                      for any illness, injury, death, loss or damage of any
                      nature to persons or property arising either in following
                      or in connection with any tour.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Viaggio Tanzania Experiences will not be liable for any
                      additional costs incurred as a result of delay, weather
                      conditions, strikes, war, quarantine, or any other cause
                      beyond our direct control.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      This must be dealt with on the spot with 45 days of
                      completion of the tour. We accept no liability for
                      complaints not received in accordance to this time.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Medical Requirements */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#946626] p-6">
                <div className="flex items-center space-x-4">
                  <Phone className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">
                    Medical Travel Documents
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      It is your responsibility to ensure that you have the
                      necessary medical vaccinations and certificates.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Viaggio Tanzania Experiences accept no liability if such
                      requirements have not been correctly arranged by you.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      It is your responsibility to report on time for all
                      transport arrangements and to ensure that you have all
                      travel documents & souvenirs.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Tour Activity */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#946626] p-6">
                <div className="flex items-center space-x-4">
                  <Clock className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">
                    Tour Activity
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      The authority of the guide before whom we will be that of
                      all times - that is for your own safety and the well-being
                      of all tour family members.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      You must always comply with local laws and regulations.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#946626] rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      You must always comply with local laws and regulations.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Supplier & Complaints */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#946626] p-6">
                <div className="flex items-center space-x-4">
                  <FileText className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">
                    Supplier & Complaints
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Excellent tour-teaching conditions as a coordinated booking,
                  we will do our best to make the alternative, although it may
                  not always be possible.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Alterations By You:</strong> Viaggio Tanzania
                  Experiences. reserves the right to refuse any alteration
                  requests. Where we can, we will try to accommodate your
                  changes, but we cannot guarantee that alternative arrangements
                  will be possible or that they will be available at the same
                  cost.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="bg-[#946626] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Questions About Our Privacy Policy?
            </h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              If you have any questions about how we handle your personal
              information, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#946626] rounded-xl hover:bg-blue-50 transition-colors duration-200 font-medium"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Us
              </a>
              {/* <button className="inline-flex items-center justify-center px-8 py-3 bg-[#946626] border-1 border-white text-white rounded-xl  transition-colors duration-200 font-medium">
                <Shield className="w-5 h-5 mr-2" />
                Data Protection
              </button> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TermsConditionsPage;
