import { Link } from "react-router-dom";
import { ShieldCheck, Clock, Heart } from "lucide-react";

const team = [
   { initials: "AK", name: "Ahmed K.", role: "Founder & CEO", bg: "bg-blue-50", text: "text-blue-700" },
   { initials: "SM", name: "Sara M.", role: "Head of Products", bg: "bg-teal-50", text: "text-teal-700" },
   { initials: "OT", name: "Omar T.", role: "Lead Developer", bg: "bg-pink-50", text: "text-pink-700" },
   { initials: "LH", name: "Layla H.", role: "Customer Support", bg: "bg-amber-50", text: "text-amber-700" },
];

const values = [
   {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50",
      title: "Quality first",
      desc: "Every product is vetted before it hits our shelves.",
   },
   {
      icon: <Clock className="w-5 h-5 text-teal-600" />,
      bg: "bg-teal-50",
      title: "Fast delivery",
      desc: "Orders shipped within 24 hours, tracked door to door.",
   },
   {
      icon: <Heart className="w-5 h-5 text-pink-600" />,
      bg: "bg-pink-50",
      title: "Customer love",
      desc: "Real support from real people who care about you.",
   },
];

const stats = [
   { value: "12k+", label: "Happy customers" },
   { value: "300+", label: "Products" },
   { value: "4.9★", label: "Average rating" },
];

const About = () => {
   return (
      <main className="max-w-3xl mx-auto px-4 py-16 mt-10">

         {/* Hero */}
         <section className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
               About us
            </p>
            <h1 className="font-serif text-5xl leading-tight text-gray-900 mb-5">
               We believe shopping <br />
               <em>should feel good</em>
            </h1>
            <p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
               Founded in 2020, Store was built with one idea — make quality
               products accessible to everyone, with zero compromise on experience.
            </p>
         </section>

         {/* Stats */}
         <section className="bg-gray-50 rounded-2xl p-8 grid grid-cols-3 divide-x divide-gray-200 text-center mb-16">
            {stats.map(({ value, label }) => (
               <div key={label}>
                  <p className="font-serif text-4xl text-gray-900">{value}</p>
                  <p className="text-sm text-gray-500 mt-1">{label}</p>
               </div>
            ))}
         </section>

         {/* Quote */}
         <section className="bg-gray-50 border border-gray-100 rounded-2xl px-10 py-8 mb-16">
            <p className="font-serif text-2xl text-gray-800 leading-relaxed">
               "Our mission is simple — curate products people actually love,
               ship them fast, and stand behind every single order."
            </p>
            <p className="text-sm text-gray-400 mt-4">— The Store Team</p>
         </section>

         {/* Values */}
         <section className="mb-16">
            <h2 className="font-serif text-3xl text-gray-900 mb-6">
               What we stand for
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
               {values.map(({ icon, bg, title, desc }) => (
                  <div
                     key={title}
                     className="border border-gray-100 rounded-2xl p-6 hover:bg-gray-50 transition-colors"
                  >
                     <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                        {icon}
                     </div>
                     <p className="font-medium text-gray-800 mb-2">{title}</p>
                     <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
               ))}
            </div>
         </section>

         {/* Team */}
         <section className="mb-16">
            <h2 className="font-serif text-3xl text-gray-900 mb-6">
               The team behind Store
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               {team.map(({ initials, name, role, bg, text }) => (
                  <div
                     key={name}
                     className="border border-gray-100 rounded-2xl overflow-hidden"
                  >
                     <div className={`${bg} ${text} h-32 flex items-center justify-center font-serif text-3xl`}>
                        {initials}
                     </div>
                     <div className="p-4">
                        <p className="font-medium text-sm text-gray-800">{name}</p>
                        <p className="text-xs text-gray-400 mt-1">{role}</p>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* CTA */}
         <section className="border border-gray-100 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
               <h3 className="font-serif text-2xl text-gray-900 mb-1">
                  Ready to start shopping?
               </h3>
               <p className="text-sm text-gray-500">
                  Thousands of products, one great experience.
               </p>
            </div>
            <Link
               to="/"
               className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors whitespace-nowrap"
            >
               Shop now →
            </Link>
         </section>

      </main>
   );
};

export default About;