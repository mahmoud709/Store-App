import RegisterForm from "../RegisterForm/RegisterForm";
import signupImg from '/images/signup.jpg'
const Register = () => {

  return (
    <div className="container mx-auto py-8">
      <div className="flex md:flex-row flex-col justify-center gap-5">
        <div className="bg-white rounded-2xl px-4 py-8">
          <div className="heading-text md:w-3/4 w-full py-8">
            <p className="uppercase text-gray-500 text-sm">create your account</p>
            <p className="capitalize font-extrabold text-2xl py-2">sign up to shop everything in one place</p>
            <p className="capitalize text-gray-400 text-sm">track orders, save favorites, and check out faster
              across electronics, fashion , home and more</p>
          </div>
          <RegisterForm />
        </div>
        <div className="registerImg">
          <img src={signupImg} alt="Signup Img" className="md:max-h-160 w-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Register;
