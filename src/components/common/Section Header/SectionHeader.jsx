import {Link} from 'react-router-dom';

const SectionHeader = ({title, path, pathContent}) => {
   return (
      <div className="section-header flex justify-between items-center md:mb-5 mb-3">
         <h2 className="md:text-3xl md:font-bold font-medium capitalize">{title}</h2>
         {path && pathContent && (
            <Link to={path} className="section-link text-sm font-medium capitalize text-[#669FE0]">
               {pathContent}
            </Link>
         )}
      </div>
   );
};

export default SectionHeader;
