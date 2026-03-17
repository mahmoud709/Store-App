import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useFormik } from 'formik';
import { LoaderCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import * as yup from 'yup';
import {FormInput} from './../common/Forms/FormInput';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL;
const LoginForm = () => {

   const { setToken } = useContext(AuthContext);
   const navigate = useNavigate();
   const { mutateAsync, isPending } = useMutation({
      mutationFn: async (values) => {
         const { data } = await axios.post(`${apiUrl}/auth/signin`, values);
         return data;
      }
   })

   async function handleLogin(values) {
      try {
         const data = await mutateAsync(values);
         if (data?.success) {
            toast.success('Login Succees', {
               position: 'top-left',
               closeOnClick:true,
            })
            setToken(data?.token);
            localStorage.setItem('token', data?.token);
            navigate('/')
         }
      }
      catch (err) {
         console.log(err)
         toast.error(err.response.data.message, {
            position: "top-left",
            closeOnClick: true,
         });
      }
   }

   const loginFormik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      onSubmit: handleLogin,
      validationSchema: yup.object().shape({
         email: yup.string().required('Email is required*').email('Invalid Email*'),
         password: yup.string()
            .min(6, 'Password must be at least 6 characters')
            .matches(/[0-9]/, 'Password must contain at least one number')
            // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol')
            .required('Password is Required*')
      })
   })

   return (
      <form onSubmit={loginFormik.handleSubmit}>
         {/* Email Field */}
         <FormInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="name@example.com"
            value={loginFormik.values.email}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            error={loginFormik.errors.email}
            touched={loginFormik.touched.email}
         />
         {/* Password Field */}
         <FormInput
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={loginFormik.values.password}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            error={loginFormik.errors.password}
            touched={loginFormik.touched.password}
            helperText="Use at least 6 characters, including a number."
         />
         <button disabled={isPending} className='bg-blue-600 text-white rounded-sm w-full py-2 text-lg capitalize font-medium cursor-pointer hover:bg-blue-700 mt-4 mb-2 flex justify-center  ' type='submit'>
            {isPending ? <LoaderCircle className='animate-spin w-6 h-6' /> : 'Login'}
         </button>

         <p className='capitalize text-gray-500'>Don't have an account ? <Link to='/signup' className='text-blue-600'>Create Account</Link></p>
      </form>
   )
}

export default LoginForm;