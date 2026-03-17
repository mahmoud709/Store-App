import * as yup from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';

const middleEastCountries = [
   'AE',
   'SA',
   'KW',
   'QA',
   'BH',
   'OM', // GCC
   'EG',
   'JO',
   'LB',
   'SY',
   'IQ',
   'YE', // Others
   'MA',
   'DZ',
   'TN',
   'LY',
   'SD',
   'PS', // North Africa
   'TR',
   'IR',
   'IL', // Turkey, Iran, Israel
];

export const validateMiddleEastPhone = (value) => {
   if (!value) return false;
   // Try to validate against Middle East countries
   for (let country of middleEastCountries) {
      try {
         if (isValidPhoneNumber(value, country)) {
            return true;
         }
      } catch (error) {
         continue;
      }
   }
   return false;
};

export const registerValidationSchema = yup.object().shape({
   name: yup.string().min(3, 'Name is short*').max(8, 'Name is Long*').required('Name is Required*'),
   email: yup.string().required('Email is required*').email('Invalid Email*'),
   phone: yup
      .string()
      .required('Phone number is required')
      .test('is-valid-phone', 'Enter a valid Middle East phone number', validateMiddleEastPhone),
   password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[0-9]/, 'Password must contain at least one number')
      // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol')
      .required('Password is Required*'),
});
