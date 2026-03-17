
const FeatureCard = ({ icon: Icon, title, delay }) => {
   return (
      <div
         className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
         style={{ animationDelay: `${delay}ms` }}
      >
         <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
               <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
               <div className="relative bg-linear-to-br from-blue-50 to-purple-50 p-6 rounded-full group-hover:from-blue-100 group-hover:to-purple-100 transition-colors">
                  {Icon && <Icon className="w-12 h-12 text-blue-600 group-hover:text-purple-600 transition-colors" />}
               </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
               {title}
            </h3>

            <div className="w-12 h-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
         </div>
      </div>
   );
};

export default FeatureCard