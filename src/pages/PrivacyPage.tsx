import { Shield, Lock, Eye, Cookie } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: December 5, 2025
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12 space-y-8 animate-fade-in">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-amber-600" />
              Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At LuxeFurniture, we respect your privacy and are committed to protecting your personal data.
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Name, email address, and phone number when you create an account</li>
              <li>Shipping and billing addresses for order fulfillment</li>
              <li>Payment information processed securely through our payment partners</li>
              <li>Communication preferences and customer service interactions</li>
              <li>Product reviews and ratings you choose to share</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Eye className="w-6 h-6 text-amber-600" />
              How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Process and fulfill your orders efficiently</li>
              <li>Communicate with you about your purchases and account</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Send you promotional offers and updates with your consent</li>
              <li>Improve our products, services, and website experience</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Cookie className="w-6 h-6 text-amber-600" />
              Cookies and Tracking
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience.
              Cookies help us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Remember your preferences and settings</li>
              <li>Keep items in your shopping cart between visits</li>
              <li>Analyze site traffic and usage patterns</li>
              <li>Personalize content and advertisements</li>
              <li>Measure the effectiveness of our marketing campaigns</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              You can control cookie preferences through your browser settings. Please note that disabling
              certain cookies may limit your ability to use some features of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement industry-standard security measures to protect your personal information from
              unauthorized access, disclosure, alteration, or destruction. This includes encryption of
              sensitive data, secure servers, and regular security audits. However, no method of transmission
              over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sharing Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We do not sell your personal information to third parties. We may share your data with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Service providers who assist with order fulfillment and delivery</li>
              <li>Payment processors to complete transactions securely</li>
              <li>Marketing partners with your explicit consent</li>
              <li>Law enforcement when required by law or to protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Opt-out of marketing communications at any time</li>
              <li>Data portability for information you provided</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our website is not intended for children under 13 years of age. We do not knowingly collect
              personal information from children. If you believe we have collected information from a child,
              please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this privacy policy from time to time to reflect changes in our practices or
              legal requirements. We will notify you of any material changes by posting the updated policy
              on our website and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions or concerns about this privacy policy or how we handle your data,
              please contact us at:
            </p>
            <div className="mt-4 p-6 bg-amber-50 rounded-xl">
              <p className="text-gray-700 font-medium">LuxeFurniture Customer Care</p>
              <p className="text-gray-600">Email: privacy@luxefurniture.com</p>
              <p className="text-gray-600">Phone: 020 740 7270</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
