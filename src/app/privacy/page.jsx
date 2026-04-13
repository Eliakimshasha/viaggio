import React from "react";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  ExternalLink,
  Cookie,
  MessageCircle,
} from "lucide-react";

function PrivacyPolicyPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative md:h-[90vh] h-[50vh] w-full overflow-hidden bg-[#fff9f5]">
        {/* <div className="absolute inset-0 bg-black/40 z-10"></div> */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-black">
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-[#946626]" />
            </div>
            <h1 className="text-3xl md:text-5xl font-medium mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-[#6dab3e] max-w-2xl mx-auto px-4">
              Your privacy is our priority. Learn how we protect and handle your
              personal information.
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
            <div className="bg-blue-50 rounded-xl p-6">
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

        {/* Privacy Sections */}
        <section className="py-8 px-4 max-w-6xl mx-auto">
          <div className="grid gap-8">
            {/* Agreement Section */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#946626] p-6">
                <div className="flex items-center space-x-4">
                  <FileText className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">Agreement</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed">
                  When you contact Meru Slopes Tours & Safaris Ltd. via our
                  website, we may ask for personal details such as your name,
                  phone number, and email address. This information is necessary
                  for us to provide quotations, respond to inquiries, and
                  facilitate our travel services. Your details will not be
                  shared with third parties unless required by law or for
                  operational purposes, such as sharing necessary booking
                  details with trusted suppliers. Your email may be used for
                  marketing communications, including promotions and special
                  offers relevant to your interests. You can opt out at any time
                  by adjusting your preferences or reaching out to us directly.
                </p>
              </div>
            </div>

            {/* Data Security Section */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#946626] p-6">
                <div className="flex items-center space-x-4">
                  <Lock className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">
                    Data Security
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed">
                  We prioritize the security of any personal data collected and
                  implement appropriate measures to protect it. Secure Socket
                  Layer (SSL) encryption is utilized for data transmission,
                  while firewall security prevents unauthorized access to our
                  internal systems. Our commitment is to ensure that all
                  personal communications remain confidential and protected.
                </p>
              </div>
            </div>

            {/* Visitor Activity Monitoring Section */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#946626] p-6">
                <div className="flex items-center space-x-4">
                  <Eye className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">
                    Visitor Activity Monitoring
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed">
                  To enhance our services, we track visitor activity using
                  Google Analytics. This includes session durations, page
                  visits, and interactions. Google Analytics collects IP
                  addresses assigned on the date of the visit but does not link
                  them to personal details. If you wish to opt out of tracking,
                  disabling cookies in your browser settings will prevent Google
                  Analytics from recognizing return visits. All collected data
                  is used strictly for internal marketing and service
                  improvements.
                </p>
              </div>
            </div>

            {/* Guarantee of Confidentiality Section */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#946626] p-6">
                <div className="flex items-center space-x-4">
                  <Shield className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">
                    Guarantee of Confidentiality
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed">
                  Protecting your privacy online is our priority. This policy
                  aims to ensure transparency and confidence when using our
                  services. We may update it periodically, so please check this
                  page regularly for any changes.
                  <strong className="text-red-700 ml-2">
                    Effective date: February 9, 2025.
                  </strong>
                </p>
              </div>
            </div>

            {/* External Links Section */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#946626] p-6">
                <div className="flex items-center space-x-4">
                  <ExternalLink className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">
                    External Links
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed">
                  Our website may contain links to third-party sites for
                  informational purposes. However, these sites have their own
                  privacy policies, and we do not take responsibility for their
                  content or data handling practices. We encourage users to
                  review external website policies before submitting personal
                  information.
                </p>
              </div>
            </div>

            {/* Cookie Usage Section */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#946626] p-6">
                <div className="flex items-center space-x-4">
                  <Cookie className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">
                    Cookie Usage
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed">
                  Cookies assist us in analyzing website traffic and enhancing
                  user experience. They help us understand how visitors interact
                  with our website but do not personally identify users. Cookies
                  are stored on your device when you visit our site and can be
                  disabled via browser settings if preferred. However, disabling
                  cookies may affect some website functionalities.
                </p>
              </div>
            </div>

            {/* Questions and Modifications Section */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#946626] p-6">
                <div className="flex items-center space-x-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">
                    Questions and Modifications
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed">
                  If you need to update your preferences, modify consent
                  settings, or opt out of marketing communications, you can
                  contact us anytime at{" "}
                  <strong className="text-red-700">
                    reuben@viaggiotanzania.com
                  </strong>
                  . We will process your request as quickly as possible to
                  ensure your privacy preferences are respected.
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

export default PrivacyPolicyPage;
