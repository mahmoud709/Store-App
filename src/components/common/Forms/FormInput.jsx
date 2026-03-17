
export const FormInput = ({ id,
   name,
   type = 'text',
   label,
   placeholder,
   value,
   onChange,
   onBlur,
   error,
   touched,
   helperText,
   ...props }) => {
   return (
      <div>
         <label htmlFor={id} className="font-medium block text-lg text-gray-900 mb-2">
            {label}
         </label>
         <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className="px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-blue-700 focus:border-transparent w-full"
            {...props}
         />
         {touched && error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
         )}
         {helperText && (
            <p className="mt-2 text-sm text-gray-500">{helperText}</p>
         )}
      </div>
   );
}