import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import axios from 'axios';
import { toast } from 'react-toastify';
import { LoaderCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { registerValidationSchema } from '../../validator/RegisterValidation';
import { FormInput } from '../common/Forms/FormInput';

const apiUrl = import.meta.env.VITE_API_URL;


const RegisterForm = () => {
   const navigate = useNavigate();

   const { mutateAsync, isPending } = useMutation({
      mutationFn: async (values) => {
         const { data } = await axios.post(`${apiUrl}/auth/signup`, values);
         return data;
      }
   })

   async function registerUser(values) {
      try {
         const data = await mutateAsync(values)
         if (data?.success) {
            toast.success('Account Created', {
               position: 'top-left',
            })
         }
         navigate('/login');
      }
      catch (err) {
         toast.error(err.response.data.message, {
            position: "top-left",
            closeOnClick: true,
         })
      }
   }

   const registerFormik = useFormik({
      initialValues: {
         name: '',
         email: '',
         phone: '',
         password: ''
      },
      onSubmit: registerUser,
      validationSchema: registerValidationSchema
   })

   return (
      <form onSubmit={registerFormik.handleSubmit}>
         {/* Name Field */}
         <FormInput
            id="name"
            name="name"
            type="text"
            label="First Name"
            placeholder="Joe"
            value={registerFormik.values.name}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            error={registerFormik.errors.name}
            touched={registerFormik.touched.name}
         />

         {/* Email Field */}
         <FormInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="name@example.com"
            value={registerFormik.values.email}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            error={registerFormik.errors.email}
            touched={registerFormik.touched.email}
         />

         {/* Phone Field */}
         <FormInput
            id="phone"
            name="phone"
            type="tel"
            label="Phone"
            placeholder="+971 50 123 4567"
            value={registerFormik.values.phone}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            error={registerFormik.errors.phone}
            touched={registerFormik.touched.phone}
         />

         {/* Password Field */}
         <FormInput
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={registerFormik.values.password}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            error={registerFormik.errors.password}
            touched={registerFormik.touched.password}
            helperText="Use at least 8 characters, including a number."
         />
         <p className="mt-2 font-medium text-sm text-gray-500">
            Use at least 8 characters, including a number and a symbol.
         </p>

         <button disabled={isPending} className='bg-blue-600 text-white rounded-sm w-full py-2 text-lg capitalize font-medium cursor-pointer hover:bg-blue-700 mt-4 mb-2 flex justify-center  ' type='submit'>
            {isPending ? <LoaderCircle className='animate-spin w-6 h-6' /> : 'create account'}
         </button>

         <p className='capitalize text-gray-500'>already have an account ? <Link to='/login' className='text-blue-600'>Sign In</Link></p>
         <span className='block text-gray-500 text-md'>By creating an account, you agree to our Terms and Privacy policy </span>
      </form>
   )
}
export default RegisterForm;