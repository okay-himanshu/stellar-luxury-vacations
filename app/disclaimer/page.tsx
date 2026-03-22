import React from "react";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12 font-sans">
      <div className="max-w-4xl mx-auto bg-[#111] p-8 md:p-12 rounded-2xl border border-gray-800 shadow-2xl">
        {/* HEADER SECTION */}
        <div className="text-center mb-12 border-b border-gray-800 pb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Disclaimer
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
            The information provided on the Stellar Luxury Vacations website is
            for general informational purposes only. While we strive to ensure
            that all information on our platform is accurate and up to date,
            Stellar Luxury Vacations makes no representations or warranties of
            any kind, express or implied, regarding the completeness,
            reliability, or accuracy of any information presented.
          </p>

          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#c9a84c]">1.</span> Service Availability
            </h3>
            <p>
              All holiday packages, memberships, hotel stays, and travel
              services are subject to the availability of our partner resorts,
              hotels, and service providers. Please note that availability may
              vary depending on the season, location, and current demand.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#c9a84c]">2.</span> Third-Party Services
            </h3>
            <p>
              Stellar Luxury Vacations frequently facilitates hotel bookings,
              travel services, and holiday arrangements through third-party
              partners. In these instances, we act solely as a facilitator. We
              shall not be held responsible for any service deficiencies,
              delays, cancellations, or unauthorized changes made by these
              third-party providers.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#c9a84c]">3.</span> No Guarantee of
              Continuous Availability
            </h3>
            <p>
              While we aim to provide uninterrupted services to our members and
              guests, Stellar Luxury Vacations does not guarantee that our
              website, booking systems, or associated services will be available
              at all times without interruption, errors, or technical issues.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#c9a84c]">4.</span> Pricing & Information
              Changes
            </h3>
            <p>
              All prices, membership plans, resort availability, and travel
              services displayed on the website are subject to change without
              prior notice. The Company reserves the right to modify, suspend,
              or discontinue any service or offer at its sole discretion.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#c9a84c]">5.</span> Limitation of
              Responsibility
            </h3>
            <p>
              Under no circumstances shall Stellar Luxury Vacations be liable
              for any direct, indirect, incidental, or consequential loss,
              damages, inconvenience, or expenses arising from the use of our
              website, membership services, or travel arrangements.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#c9a84c]">6.</span> Personal Responsibility
            </h3>
            <p>
              Members and users bear the personal responsibility of verifying
              all travel requirements before planning their holiday. This
              includes, but is not limited to, securing proper identification
              documents, obtaining necessary visas, and adhering to relevant
              government regulations and travel restrictions.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#c9a84c]">7.</span> Acceptance of
              Disclaimer
            </h3>
            <p>
              By using this website, browsing our offers, or purchasing any
              membership or service, you acknowledge that you have read,
              understood, and agreed to the terms outlined in this Disclaimer.
            </p>
          </section>

          <section className="bg-black p-6 rounded-xl border border-gray-800 mt-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#c9a84c]">8.</span> Contact Information
            </h3>
            <p className="mb-4">
              If you have any questions or concerns regarding this Disclaimer,
              please reach out to us at:
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
