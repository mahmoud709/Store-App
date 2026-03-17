import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
   {
      category: "Orders",
      bg: "bg-blue-50", text: "text-blue-700",
      items: [
         { q: "How do I place an order?", a: "Browse our products, add items to your cart, then head to checkout. Fill in your shipping address and choose between cash on delivery or online payment via Stripe." },
         { q: "Can I cancel my order?", a: "You can cancel within 1 hour of placing it. After that the order is already being processed. Contact support as soon as possible." },
         { q: "How do I track my order?", a: "Once your order ships you'll receive an email with a tracking number. You can also check Profile → Orders at any time." },
      ],
   },
   {
      category: "Payments",
      bg: "bg-teal-50", text: "text-teal-700",
      items: [
         { q: "What payment methods do you accept?", a: "We accept cash on delivery and all major credit/debit cards through our secure Stripe integration." },
         { q: "Is it safe to pay online?", a: "Yes. All payments are processed by Stripe which is PCI-DSS compliant. We never see or store your card details." },
         { q: "Will I get a receipt after paying?", a: "Yes, a confirmation email is sent automatically after every successful order for both cash and card payments." },
      ],
   },
   {
      category: "Shipping & returns",
      bg: "bg-pink-50", text: "text-pink-700",
      items: [
         { q: "How long does delivery take?", a: "Standard delivery takes 2–5 business days. Orders are processed and shipped within 24 hours of being placed." },
         { q: "Do you ship outside Egypt?", a: "Currently we only ship within Egypt. International shipping is something we're actively working on." },
         { q: "What is your return policy?", a: "We accept returns within 14 days of delivery for unused items in their original packaging. Contact support to initiate a return." },
      ],
   },
   {
      category: "Account",
      bg: "bg-amber-50", text: "text-amber-700",
      items: [
         { q: "How do I create an account?", a: "Click the user icon in the navbar and select Register. Fill in your name, email, and password." },
         { q: "I forgot my password. What do I do?", a: "On the login page click 'Forgot password' and enter your email. You'll receive a reset link within a few minutes." },
         { q: "Can I change my email or phone number?", a: "Yes. Go to Profile → Settings to update your personal information at any time." },
      ],
   },
];

const FAQItem = ({ q, a }) => {
   const [open, setOpen] = useState(false);

   return (
      <div className="border-b border-gray-100">
         <button
            onClick={() => setOpen((prev) => !prev)}
            className="w-full flex items-center justify-between py-4  text-sm font-medium text-gray-800 hover:text-gray-600 transition-colors cursor-pointer"
         >
            <span>{q}</span>
            {open
               ? <X className="w-4 h-4 shrink-0 text-gray-400" />
               : <Plus className="w-4 h-4 shrink-0 text-gray-400" />
            }
         </button>
         <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48' : 'max-h-0'}`}>
            <p className="text-sm text-gray-800 leading-relaxed pb-4">{a}</p>
         </div>
      </div>
   );
};

const FAQ = () => {
   return (
      <main className="max-w-2xl mx-auto px-4 py-16 mt-10">

         {/* Header */}
         <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
               Support
            </p>
            <h1 className="font-serif text-4xl text-gray-900 mb-4">
               Frequently asked questions
            </h1>
            <p className="text-gray-500 text-base max-w-sm mx-auto leading-relaxed">
               Can't find what you're looking for?{" "}
               <a href="mailto:support@store.com" className="text-blue-600 hover:underline">
                  Contact us.
               </a>
            </p>
         </div>

         {/* FAQ sections */}
         <div className="flex flex-col gap-10">
            {faqs.map(({ category, bg, text, items }) => (
               <div key={category}>
                  <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${bg} ${text} mb-4`}>
                     {category}
                  </span>
                  <div className="border-t border-gray-100">
                     {items.map((item) => (
                        <FAQItem key={item.q} {...item} />
                     ))}
                  </div>
               </div>
            ))}
         </div>

         {/* CTA */}
         <div className="mt-14 border border-gray-100 rounded-2xl p-8 text-center">
            <h3 className="font-serif text-2xl text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-sm text-gray-500 mb-5">Our support team is here to help you.</p>

            <Link to={"mailto:support@store.com"}
               className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-3 rounded-xl transition-colors">
               Contact support →
            </Link>
         </div>

      </main>
   );
};

export default FAQ;