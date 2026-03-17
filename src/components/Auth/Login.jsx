import LoginForm from '../LoginForm/LoginForm'
import loginImg from '/images/signin.jpg'

const Login = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex md:flex-row flex-col justify-center  gap-5">
        <div className="bg-white rounded-2xl px-4 py-8">
          <div className="heading-text md:w-3/4 w-full py-8">
            <p className="uppercase text-gray-500 text-sm">Welcome back</p>
            <p className="capitalize font-extrabold text-2xl py-2">sign in to your account</p>
            <p className="capitalize text-gray-400 text-sm">access your saved items , track your orders and manage your subscripitions</p>
          </div>
          <LoginForm />
        </div>
        <div className="loginImg">
          <img src={loginImg} alt="Login Img" className="max-h-160 w-full object-contain" />
        </div>
      </div>
    </div>
  )
}

export default Login