"use client";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white px-4 md:px-16 py-12 text-gray-700">
      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-[#658C58] text-center mb-6">
        Global Privacy Notice
      </h1>

      <p className="text-center mb-6">Last Updated: July 15, 2025</p>

      <p className="mb-4">
        As a leading provider of information, analytics, and online marketplaces
        to the commercial real estate industry, CoStar Realty Information, Inc.
        and our affiliates (collectively, “CoStar,” “we,” or “us”) respect your
        privacy and are committed to protecting your personal information.
      </p>

      {/* Subheading */}
      <h2 className="text-xl font-bold text-black mb-3">
        Notice at Collection and Summary of Our Privacy Practices
      </h2>

      <p className="mb-4">
        We recommend reviewing our comprehensive Privacy Notice, which is
        provided below, to gain a detailed understanding of our privacy
        practices before using our products or services. This summary is
        intended to offer only a brief overview.
      </p>

      <p className="mb-4">
        CoStar collects various types of personal information, including contact
        details, account credentials, communications you send us, and data about
        your activities when you visit our websites, use our mobile apps, or
        interact with our other services, allowing us to make inferences about
        you and your interests. Depending on the products or services you use,
        we also may collect transactional, financial, and employment details,
        government-issued identification, geolocation data, and biometric data.
      </p>

      <p className="mb-6">
        We process personal information to provide our services and operate our
        business. This includes security and fraud prevention, communication and
        customer support, business relationship management, service improvement
        and development, advertising and marketing, research and analytics, and
        compliance with legal obligations.
      </p>

      {/* Subheading */}
      <h2 className="text-xl font-bold text-black mb-3">CoStar Marketplaces</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Apartments.com and related brands</li>
        <li>Homes.com and related brands</li>
        <li>Showcase.com</li>
        <li>Land.com and related brands</li>
        <li>Ten-X.com and related brands</li>
        <li>LoopNet.com and related brands</li>
        <li>STR.com and related brands</li>
        <li>BizBuySell.com and related brands</li>
        <li>Off Campus Partners</li>
        <li>Belbex.com</li>
        <li>OnTheMarket.com</li>
        <li>Bureauxlocaux.com</li>
      </ul>

      {/* Table for Personal Information Types */}
      <h2 className="text-xl font-bold text-black mb-3">
        1. Types of Personal Information We Collect and Why
      </h2>
      <p className="mb-4">
        CoStar may collect the following types of personal information. The
        table below provides examples:
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-[#658C58] text-white">
              <th className="py-2 px-4 border">Type of Information</th>
              <th className="py-2 px-4 border">Purpose / Use</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border">
              <td className="py-2 px-4 border">Contact details</td>
              <td className="py-2 px-4 border">
                Account management, communication
              </td>
            </tr>
            <tr className="border">
              <td className="py-2 px-4 border">Account credentials</td>
              <td className="py-2 px-4 border">Authentication, security</td>
            </tr>
            <tr className="border">
              <td className="py-2 px-4 border">
                Transactional & financial data
              </td>
              <td className="py-2 px-4 border">Service provision, payments</td>
            </tr>
            <tr className="border">
              <td className="py-2 px-4 border">Geolocation data</td>
              <td className="py-2 px-4 border">
                Personalized services, analytics
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Another Subheading */}
      <h2 className="text-xl font-bold text-black mb-3">
        2. How We Collect Your Personal Information
      </h2>
      <p className="mb-4">
        CoStar may collect personal information in the following ways:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Directly from You (account creation, forms, surveys, etc.)</li>
        <li>
          Through Your Use of the Services (cookies, tracking, device data)
        </li>
        <li>From Others (public records, vendors, social media, referrals)</li>
      </ul>

      <h2 className="text-xl font-bold text-black mb-3">
        3. How We Use Your Personal Information
      </h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Provision of Services</li>
        <li>Security and Fraud Prevention</li>
        <li>Communication and Customer Support</li>
        <li>Improvement and Development of Services</li>
        <li>Advertising and Marketing</li>
        <li>Research and Benchmarking</li>
        <li>Compliance with Legal Obligations</li>
        <li>Relationship Management</li>
        <li>Anonymization and Aggregation</li>
      </ul>

      <h2 className="text-xl font-bold text-black mb-3">
        4. How We Disclose Your Personal Information
      </h2>
      <p className="mb-4">
        CoStar may share personal information with affiliates, vendors, business
        partners, analytics providers, and others as described above.
      </p>

      <h2 className="text-xl font-bold text-black mb-3">
        5. International Transfer of Personal Information
      </h2>
      <p className="mb-4">
        Your personal information may be processed in the US or other countries
        where our affiliates or service providers operate. By using our
        Services, you acknowledge this transfer.
      </p>

      <h2 className="text-xl font-bold text-black mb-3">
        6. How We Secure Your Personal Information
      </h2>
      <p className="mb-4">
        CoStar implements industry-standard safeguards to protect your personal
        information. However, no system can guarantee full security. Report any
        compromised passwords to CoStarSecurity1@costar.com.
      </p>
    </div>
  );
}
