import React from 'react';

const PrivacyPolicyCapital = () => {
    return (
        <div className="bg-gray-800 min-h-screen p-6">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
                <p className="text-gray-600 leading-relaxed mb-4">
                    This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service. It explains Your privacy rights and how the law protects You. By using the app, You agree to the collection and use of information in accordance with this Privacy Policy.
                </p>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Interpretation and Definitions</h2>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Interpretation</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        The words of which the initial letter is capitalized have meanings defined under the following conditions. These definitions apply whether they appear in singular or plural form.
                    </p>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Definitions</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li><strong>Employee ID:</strong> A unique account created for You to access.</li>
                        <li><strong>Application:</strong> Refers to the “HRMS” app provided by the Company.</li>
                        <li><strong>Company:</strong> Refers to (Company Name & Address).</li>
                        <li><strong>Country:</strong> India.</li>
                        <li><strong>Device:</strong> Your mobile or laptop that can access the app.</li>
                        <li><strong>Personal Data:</strong> Name, email, phone number, login credentials, etc.</li>
                        <li><strong>Service:</strong> Refers to the application.</li>
                        <li>
                            <strong>Project and Module Data:</strong> Includes:
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Visitor records (e.g., names, timestamps).</li>
                                <li>Event details (e.g., descriptions, schedules).</li>
                                <li>Notices and announcements.</li>
                                <li>Billing information (e.g., CAM).</li>
                                <li>Poll responses and results.</li>
                                <li>Device type, operating system, and IP address.</li>
                                <li>Actions performed and analytical data to improve the app.</li>
                            </ul>
                        </li>
                        <li><strong>You:</strong> The individual or legal entity accessing the Service.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Use of Your Personal Data</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>To provide and maintain our Service, including monitoring usage.</li>
                        <li>To manage Your Account and enable registered functionalities.</li>
                        <li>To support daily business and operational activities.</li>
                        <li>To manage requests related to attendance, travel, and expenses.</li>
                        <li>For business transfers (e.g., mergers, acquisitions).</li>
                        <li>For other purposes, such as improving services and marketing.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Retention of Your Personal Data</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        We retain Your data only as necessary for the purposes outlined in this policy. Retention includes legal obligations, dispute resolution, and policy enforcement.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Disclosure of Your Personal Data</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Your data may be disclosed for legal compliance, business transfers, or with Your consent.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Security of Your Personal Data</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We strive to use commercially acceptable means to protect your data but cannot guarantee absolute security.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated “Last Updated” date.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                    <p className="text-gray-600 leading-relaxed">
                        If you have any questions about this Privacy Policy, contact us:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>By email: <a href="mailto:enquiry@thecapitalbkc.org" className="text-blue-600 underline">enquiry@thecapitalbkc.org</a></li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicyCapital;
