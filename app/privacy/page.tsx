import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12 font-sans">
      <div className="max-w-4xl mx-auto bg-[#111] p-8 md:p-12 rounded-2xl border border-gray-800 shadow-2xl">
        {/* HEADER SECTION */}
        <div className="text-center mb-12 border-b border-gray-800 pb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <h2 className="text-xl md:text-2xl text-[#c9a84c] font-medium tracking-wide">
            Stellar Luxury Vacations
          </h2>
          <p className="text-gray-400 text-sm mt-2 italic">
            (A Brand of Stellarinn Vacation Club and Hospitality Pvt. Ltd.)
          </p>
        </div>

        {/* CONTENT SECTION */}
        <div className="space-y-8 text-gray-300 leading-relaxed text-[15px] md:text-base text-justify">
          <p>
            At Stellar Luxury Vacations, we value your privacy and are committed
            to protecting your personal information. This Privacy Policy
            explains how we collect, use, and safeguard the information you
            provide when using our website and services.
          </p>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#c9a84c]">1.</span> Information We Collect
            </h3>
            <p className="mb-3">
              We may collect personal information from you when you:
            </p>
            <ul className="space-y-2 mb-4 ml-2">
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Register on our website</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Purchase a membership or service</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Fill out forms or request information</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Contact our support team</span>
              </li>
            </ul>
            <p className="mb-3 mt-4">The information collected may include:</p>
            <ul className="space-y-2 ml-2">
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Name</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Phone number</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Email address</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>City or address</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>
                  Payment details (processed through secure payment partners)
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#c9a84c]">2.</span> How We Use Your
              Information
            </h3>
            <p className="mb-3">
              The information we collect may be used for the following purposes:
            </p>
            <ul className="space-y-2 ml-2">
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>To process membership purchases and bookings</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>
                  To provide customer support and respond to inquiries
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>To send booking confirmations and service updates</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>To improve our website and services</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>To communicate promotional offers or travel updates</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#c9a84c]">3.</span> Information Sharing
            </h3>
            <p className="mb-3">
              Stellar Luxury Vacations does{" "}
              <strong className="text-white font-medium">
                not sell, trade, or rent personal information
              </strong>{" "}
              to third parties. However, information may be shared with trusted
              partners in the following situations:
            </p>
            <ul className="space-y-2 mb-4 ml-2">
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Hotel and resort partners for booking purposes</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>
                  Payment gateway providers for transaction processing
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Legal authorities if required by law</span>
              </li>
            </ul>
            <p>
              All such partners are expected to maintain confidentiality and
              data security.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#c9a84c]">4.</span> Data Security
            </h3>
            <p>
              We implement reasonable security measures to protect your personal
              information from unauthorized access, misuse, or disclosure.
              Payment transactions are processed through secure payment gateways
              and we do not store sensitive payment information on our servers.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#c9a84c]">5.</span> Cookies
            </h3>
            <p>
              Our website may use cookies to improve user experience, analyze
              website traffic, and remember user preferences. You may choose to
              disable cookies through your browser settings.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#c9a84c]">6.</span> Third-Party Links
            </h3>
            <p>
              Our website may contain links to third-party websites such as
              hotels, travel partners, or service providers. Stellar Luxury
              Vacations is not responsible for the privacy practices of these
              external websites.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#c9a84c]">7.</span> Policy Updates
            </h3>
            <p>
              Stellar Luxury Vacations reserves the right to update or modify
              this Privacy Policy at any time. Any changes will be posted on
              this page and will become effective immediately upon posting.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#c9a84c]">8.</span> Consent
            </h3>
            <p>
              By using our website and services, you consent to the collection
              and use of information as described in this Privacy Policy.
            </p>
          </section>

          <section className="bg-black p-6 rounded-xl border border-gray-800 mt-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#c9a84c]">9.</span> Contact Us
            </h3>
            <p className="mb-4">
              If you have any questions regarding this Privacy Policy, you may
              contact us at:
            </p>
            <div className="space-y-1">
              <p className="font-bold text-white">Stellar Luxury Vacations</p>
              <p className="text-sm text-gray-400 italic">
                (A Brand of Stellarinn Vacation Club and Hospitality Pvt. Ltd.)
              </p>
              <p className="mt-3">
                <span className="text-[#c9a84c] font-semibold">Email: </span>
                <a
                  href="mailto:info@stellarluxuryvacations.com"
                  className="hover:text-white transition-colors underline underline-offset-4 decoration-gray-700"
                >
                  info@stellarluxuryvacations.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
