import React from "react";

const PrivacyPolicyBhoomiCelestia = () => {
  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At Bhoomi Celestia, we prioritize the privacy and security of your
            personal data. This privacy policy outlines how we collect, use,
            store, and protect the personal data of our residents and visitors
            regarding the following services:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Business Management Solution</li>
            <li>Visitor Management Solution</li>
            <li>Amenity Management Solution</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1. Data Collection
          </h2>
          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-800">
              Business Management Solution
            </h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>
                Name, contact details (email, phone number), payment
                information, and communication logs.
              </li>
              <li>
                Transaction history for billing, accounting, and financial
                management.
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-800">
              Visitor Management Solution
            </h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>
                Visitor’s name, phone number, email address, vehicle details,
                and timestamps.
              </li>
              <li>
                Purpose of visit, residential unit visited, and photo ID for
                security purposes.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-800">
              Amenity Management Solution
            </h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>
                Resident's name, unit details, contact information, and amenity
                booking history.
              </li>
              <li>Feedback, complaints, or suggestions regarding amenities.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. Use of Personal Data
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We use the collected personal data for the following purposes:
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-medium text-gray-800">
              Business Management Solution
            </h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>To communicate with residents and service providers.</li>
              <li>
                To facilitate payments, billing, and financial record-keeping.
              </li>
              <li>
                To ensure compliance with residential and business policies.
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-medium text-gray-800">
              Visitor Management Solution
            </h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>
                To maintain security and control of visitors entering and
                leaving the building.
              </li>
              <li>
                To ensure proper record-keeping for safety and emergency
                procedures.
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-medium text-gray-800">
              Amenity Management Solution
            </h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>To allow residents to reserve and access amenities.</li>
              <li>To track preferences and improve service offerings.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. Data Sharing and Disclosure
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may share your personal data in specific situations to ensure the
            proper delivery of our services. Below are some examples:
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
            <li>
              With authorized service providers who assist with operations like
              billing and maintenance.
            </li>
            <li>
              With security personnel for visitor verification and safety
              measures.
            </li>
            <li>
              With facility management teams to maintain amenities and services.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. Data Retention
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We retain personal data only as long as necessary to fulfill the
            purposes outlined in this policy or as required by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We implement appropriate security measures, including encryption and
            access controls, to protect your data from unauthorized access or
            misuse.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6. Your Rights
          </h2>
          <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
            <li>Access, update, or correct your personal data.</li>
            <li>
              Request the deletion of your data, subject to legal obligations.
            </li>
            <li>Withdraw consent to data processing at any time.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7. Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Cookies may be used to enhance user experience. You can disable
            cookies in your browser, but it may affect some functionalities.
          </p>
        </section>

        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Bhoomi Celestia. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicyBhoomiCelestia;
