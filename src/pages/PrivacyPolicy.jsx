import { User, Activity, Shield, Share2, Users } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
   {
      icon: <User className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50",
      title: "Information we collect",
      items: [
         "Name, email address, and password when you register",
         "Phone number and shipping address when placing an order",
         "Payment details processed securely by Stripe — we never store card numbers",
         "Device info, browser type, and IP address for analytics",
         "Order history and cart activity while using the app",
      ],
   },
   {
      icon: <Activity className="w-5 h-5 text-teal-600" />,
      bg: "bg-teal-50",
      title: "How we use your data",
      items: [
         "To process and fulfill your orders",
         "To send order confirmations and shipping updates",
         "To manage your account and provide customer support",
         "To improve our website, products, and services",
         "To detect and prevent fraud or unauthorized access",
      ],
   },
   {
      icon: <Shield className="w-5 h-5 text-pink-600" />,
      bg: "bg-pink-50",
      title: "How we protect your data",
      items: [
         "All data is transmitted over HTTPS encrypted connections",
         "Passwords are hashed and never stored in plain text",
         "Payment processing handled by Stripe — PCI-DSS compliant",
         "Access to personal data is restricted to authorized staff only",
         "We regularly review and update our security practices",
      ],
   },
   {
      icon: <Share2 className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50",
      title: "Sharing your information",
      items: [
         "We never sell or rent your personal data to third parties",
         "Stripe receives payment info to process transactions securely",
         "Shipping providers receive name and address to deliver orders",
         "We may share data if required by law or legal process",
         "Anonymous analytics data may be shared with analytics tools",
      ],
   },
];

const rights = [
   { title: "Access", desc: "Request a copy of your personal data" },
   { title: "Correct", desc: "Update any inaccurate information" },
   { title: "Delete", desc: "Ask us to erase your account data" },
   { title: "Opt out", desc: "Unsubscribe from marketing emails" },
];

const PrivacyPolicy = () => {
   return (
      <main className="max-w-3xl mx-auto px-4 py-16 mt-10">

         {/* Header */}
         <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">Legal</p>
            <h1 className="font-serif text-4xl text-gray-900 mb-3">Privacy policy</h1>
            <p className="text-xs text-gray-400 mb-3">Last updated: March 17, 2026</p>
            <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
               At Store, your privacy matters. This policy explains what data we collect,
               how we use it, and how we keep it safe.
            </p>
         </div>

         {/* Notice banner */}
         <div className="bg-gray-50 rounded-2xl p-4 flex gap-3 items-start mb-6">
            <div className="w-5 h-5 mt-0.5 shrink-0 text-blue-500">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
               </svg>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
               By using Store, you agree to the collection and use of information as described
               in this policy. We will never sell your personal data to third parties.
            </p>
         </div>

         {/* Sections */}
         <div className="flex flex-col gap-3 mb-4">
            {sections.map(({ icon, bg, title, items }) => (
               <div key={title} className="border border-gray-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                     <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                        {icon}
                     </div>
                     <h2 className="font-serif text-xl text-gray-900">{title}</h2>
                  </div>
                  <div>
                     {items.map((item) => (
                        <div key={item} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                           <div className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0 mt-2" />
                           <span className="text-sm text-gray-500 leading-relaxed">{item}</span>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>

         {/* Your rights */}
         <div className="border border-gray-100 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-5">
               <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-teal-600" />
               </div>
               <h2 className="font-serif text-xl text-gray-900">Your rights</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
               {rights.map(({ title, desc }) => (
                  <div key={title} className="bg-gray-50 rounded-xl p-4">
                     <p className="font-medium text-sm text-gray-800 mb-1">{title}</p>
                     <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
               ))}
            </div>
         </div>

         {/* CTA */}
         <div className="border border-gray-100 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
               <h3 className="font-serif text-xl text-gray-900 mb-1">Questions about your privacy?</h3>
               <p className="text-sm text-gray-500">We're happy to help — reach out anytime.</p>
            </div>
         <Link
            to="mailto:support@store.com"
            className="bg-blue-600 text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
            Contact us →
            </Link>
      </div>

    </main>
  );
};

export default PrivacyPolicy;