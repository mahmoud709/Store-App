import { Link } from "react-router-dom";
import { Clock, ShieldCheck, CreditCard } from "lucide-react";

const highlights = [
   { icon: <Clock className="w-5 h-5 text-teal-600" />, bg: "bg-teal-50", title: "14-day window", desc: "Return any item within 14 days of delivery." },
   { icon: <ShieldCheck className="w-5 h-5 text-blue-600" />, bg: "bg-blue-50", title: "Original condition", desc: "Items must be unused and in original packaging." },
   { icon: <CreditCard className="w-5 h-5 text-pink-600" />, bg: "bg-pink-50", title: "Full refund", desc: "Refunds are issued to your original payment method." },
];

const steps = [
   { n: "1", bg: "bg-blue-50", text: "text-blue-700", title: "Contact support", desc: "Email us at support@store.com or use the contact form. Include your order number and reason for return." },
   { n: "2", bg: "bg-teal-50", text: "text-teal-700", title: "Get return approval", desc: "Our team will review your request and send you a return confirmation within 24 hours." },
   { n: "3", bg: "bg-pink-50", text: "text-pink-700", title: "Ship the item back", desc: "Pack the item securely in its original packaging and ship to the address in the confirmation email." },
   { n: "4", bg: "bg-amber-50", text: "text-amber-700", title: "Receive your refund", desc: "Once we receive and inspect the item, your refund will be processed within 3–5 business days." },
];

const notReturnable = [
   "Items returned after 14 days of delivery",
   "Used, damaged, or altered products",
   "Items without original packaging or tags",
   "Downloadable or digital products",
   "Personal care or hygiene items",
];

const Returns = () => {
   return (
      <main className="max-w-3xl mx-auto px-4 py-16 mt-10">

         {/* Header */}
         <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">Policy</p>
            <h1 className="font-serif text-4xl text-gray-900 mb-4">Returns & refunds</h1>
            <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
               We want you to love every purchase. If something isn't right, we make returns simple and hassle-free.
            </p>
         </div>

         {/* Highlight cards */}
         <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {highlights.map(({ icon, bg, title, desc }) => (
               <div key={title} className="border border-gray-100 rounded-2xl p-5">
                  <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                     {icon}
                  </div>
                  <p className="font-medium text-lg text-gray-800 mb-1">{title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
               </div>
            ))}
         </div>

         {/* Steps */}
         <h2 className="font-serif text-2xl text-gray-900 mb-6">How to return an item</h2>
         <div className="mb-12">
            {steps.map(({ n, bg, text, title, desc }, i) => (
               <div key={n} className="flex gap-4 relative pb-6 last:pb-0">
                  {/* connector line */}
                  {i < steps.length - 1 && (
                     <div className="absolute left-4 top-9 bottom-0 w-px bg-gray-100" />
                  )}
                  {/* number circle */}
                  <div className={`w-8 h-8 rounded-full ${bg} ${text} text-sm font-semibold flex items-center justify-center shrink-0 font-serif`}>
                     {n}
                  </div>
                  <div className="pt-1">
                     <p className="font-medium text-lg text-gray-800 mb-1">{title}</p>
                     <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
               </div>
            ))}
         </div>

         {/* Not returnable */}
         <h2 className="font-serif text-2xl text-gray-900 mb-4">What can't be returned</h2>
         <div className="bg-gray-50 rounded-2xl p-5 mb-12">
            {notReturnable.map((item) => (
               <div key={item} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  <span className="text-sm text-gray-500">{item}</span>
               </div>
            ))}
         </div>

         {/* CTA */}
         <div className="border border-gray-100 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
               <h3 className="font-serif text-xl text-gray-900 mb-1">Need to start a return?</h3>
               <p className="text-sm text-gray-500">Our team responds within 24 hours.</p>
            </div>
            <Link
               to={"mailto:support@store.com"}
               className="bg-blue-600 text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap">
               Contact support →
            </Link>
         </div>

      </main>
   );
};

export default Returns;