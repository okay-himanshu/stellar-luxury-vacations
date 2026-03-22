import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12 font-sans">
      <div className="max-w-4xl mx-auto bg-[#111] p-8 md:p-12 rounded-2xl border border-gray-800 shadow-2xl">
        {/* HEADER SECTION */}
        <div className="text-center mb-12 border-b border-gray-800 pb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Refund & Cancellation Policy
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
          <section>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#c9a84c]">1.</span> Cooling-Off Period (7
              Days)
            </h3>
            <p className="mb-3">
              The Member may cancel the membership within{" "}
              <strong className="text-white">7 (seven) calendar days</strong>{" "}
              from the date of purchase by submitting a written cancellation
              request via the registered email address.
            </p>
            <p className="font-semibold text-white mb-2">Refund Terms:</p>
            <p>
              The Company shall refund the amount paid after deducting
              processing and administrative charges up to{" "}
              <strong className="text-[#c9a84c]">
                25% of the total membership fee
              </strong>
              , provided that no holiday booking or benefit has been utilized.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#c9a84c]">2.</span> Cancellation After 7
              Days and Within 15 Days
            </h3>
            <p className="mb-3">
              If the Member requests cancellation after the expiry of the 7-day
              cooling-off period but within 15 days from the date of purchase,
              the following deductions shall apply:
            </p>
            <ul className="space-y-2 mb-4 ml-2">
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>
                  <strong className="text-white">
                    45% of the membership fee
                  </strong>{" "}
                  towards sales, marketing, administrative, and onboarding
                  expenses
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>
                  Deduction of actual cost of any utilized services or benefits,
                  if applicable
                </span>
              </li>
            </ul>
            <p className="bg-white/5 p-3 rounded border-l-2 border-[#c9a84c]">
              <strong className="text-[#c9a84c]">Refund Timeline:</strong> Up to
              60 to 90 working days from the date of approval.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#c9a84c]">3.</span> Cancellation After 15
              Days and Within 30 Days
            </h3>
            <p className="mb-3">
              If cancellation is requested after 15 days but within 30 days, the
              following terms shall apply:
            </p>
            <ul className="space-y-2 mb-4 ml-2">
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>
                  <strong className="text-white">
                    Up to 65% of the membership fee
                  </strong>{" "}
                  may be deducted towards marketing, administrative, and
                  operational costs
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>
                  Deduction of the actual value of any utilized services or
                  benefits
                </span>
              </li>
            </ul>
            <p className="bg-white/5 p-3 rounded border-l-2 border-[#c9a84c]">
              <strong className="text-[#c9a84c]">Refund Timeline:</strong> Up to
              60 to 90 working days after approval.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#c9a84c]">4.</span> Cancellation After 30
              Days
            </h3>
            <p className="mb-3">
              If cancellation is requested after 30 days from the date of
              purchase, the membership shall generally be considered{" "}
              <strong className="text-red-400">non-refundable</strong>.
            </p>
            <p className="mb-3">
              However, in exceptional circumstances and at the sole discretion
              of the Company, a partial refund may be considered after
              adjusting:
            </p>
            <ul className="space-y-2 mb-4 ml-2">
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Administrative costs</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Marketing and acquisition costs</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Operational expenses</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Any third-party commitments</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#c9a84c]">5.</span> Cancellation After
              First Holiday Utilization
            </h3>
            <p className="mb-3">
              If the Member has availed any holiday stay or booking, the
              following deductions shall apply before considering any refund:
            </p>
            <ul className="space-y-2 mb-4 ml-2">
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>
                  Actual stay or night charges or at prevailing market rates
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>45% administrative charges</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Any additional services utilized</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#c9a84c]">6.</span> Service Satisfaction
              Clause
            </h3>
            <p className="mb-3">
              If during the first holiday the Member is not provided with a
              property within the promised 3-to-5-star category (subject to
              availability) and the Member is dissatisfied with the service:
            </p>
            <ul className="space-y-3 mb-4 ml-2">
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>
                  The Member must submit a{" "}
                  <strong className="text-white">
                    written complaint via registered email within 5 days of
                    checkout
                  </strong>{" "}
                  along with supporting evidence.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <div className="flex flex-col">
                  <span>
                    Upon verification, the Company may process a refund after
                    deducting:
                  </span>
                  <div className="ml-4 mt-2 space-y-1 text-sm text-gray-400">
                    <p>— Actual utilized night charges</p>
                    <p>— 45% administrative charges</p>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#c9a84c]">7.</span> Non-Refundable
              Situations
            </h3>
            <p className="mb-3">
              No refund shall be applicable in the following cases:
            </p>
            <ul className="space-y-2 mb-4 ml-2">
              <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-0.5">✗</span>
                <span>
                  Membership benefits have been substantially utilized
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-0.5">✗</span>
                <span>Fraud, abuse, or misrepresentation by the Member</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-0.5">✗</span>
                <span>Failure to follow the official booking procedure</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-0.5">✗</span>
                <span>
                  Membership plans marked{" "}
                  <strong className="text-white">“Non-Refundable”</strong> at
                  the time of purchase
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-0.5">✗</span>
                <span>
                  Cancellation requests received after the allowed cancellation
                  period
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#c9a84c]">8.</span> Chargeback & Payment
              Dispute Clause
            </h3>
            <p className="mb-3">
              If the Member initiates a payment dispute, chargeback, or bank
              reversal after purchasing the membership:
            </p>
            <ul className="space-y-2 mb-4 ml-2">
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>
                  The Company reserves the right to suspend membership benefits
                  immediately.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>
                  The dispute must be resolved before any services can be
                  continued.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#c9a84c]">9.</span> Refund Processing
              Timeline
            </h3>
            <p className="mb-3">
              All approved refunds shall be processed within{" "}
              <strong className="text-white">60 to 90 working days</strong> from
              the date of the Company’s official approval email.
            </p>
            <p className="mb-2">Refunds shall be credited via:</p>
            <ul className="space-y-2 mb-4 ml-2">
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Original payment mode, or</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Bank transfer to the Member’s registered account.</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#c9a84c]">10.</span> Full & Final
              Settlement
            </h3>
            <p>
              Upon processing of the refund, the Member agrees that the
              settlement shall be treated as full and final, and no further
              claims shall lie against the Company.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#c9a84c]">11.</span> Member Acknowledgment
            </h3>
            <p className="mb-3">
              By purchasing the membership, the Member confirms that he/she:
            </p>
            <ul className="space-y-2 mb-4 ml-2">
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Has read and understood all terms and conditions</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>Agrees to the Refund & Cancellation Policy</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>
                  Understands that all holiday bookings are subject to
                  availability and partner inventory
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c9a84c] mr-3 mt-0.5">•</span>
                <span>
                  Acknowledges that no verbal assurances shall be binding on the
                  Company
                </span>
              </li>
            </ul>
          </section>

          <section className="bg-[#1a1a1a] p-6 rounded-xl border border-[#c9a84c]/30 mt-8">
            <h3 className="text-lg font-bold text-[#c9a84c] mb-3 flex items-center gap-2">
              12. Important Note
            </h3>
            <p className="mb-2">
              This Refund Policy{" "}
              <strong className="text-white">
                does not apply to Premium Business Membership Plans
              </strong>{" "}
              unless specifically stated in writing.
            </p>
            <p className="text-sm text-gray-400">
              * Refund timelines may vary due to bank processing time, public
              holidays, or unforeseen circumstances.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
