import Lottie from "lottie-react";
import  registerAni from "../../assets/11067-registration-animation.json";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


    return (
        <>
      <Helmet>
        <title>Register | LVC</title>
      </Helmet>
      <div className="hero min-h-screen py-16 mt-16">
        <div className="hero-content flex-col items-start lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <Lottie animationData={registerAni} loop={false} />
          </div>
          <div className="card pb-4  flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body pb-1" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Your name"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo</span>
                  </label>
                  <input
                    {...register("photoUrl")}
                    type="text"
                    placeholder="Photo Url"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("email")}
                    type="text"
                    placeholder="Your email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <span className="relative">
                    <input
                      {...register("password")}
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Type password"
                      className="input input-bordered  w-full relative"
                    />{" "}
                    {passwordVisible ? (
                      <AiFillEyeInvisible
                        className="absolute top-1/2 right-4 transform -translate-y-1/2"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <AiFillEye
                        className="absolute top-1/2 right-4 transform -translate-y-1/2"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </span>
                 
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm password</span>
                  </label>
                  <span className="relative">
                    <input
                      {...register("confirmPassword")}
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Confirm password"
                      className="input input-bordered  w-full relative"
                    />{" "}
                    {passwordVisible ? (
                      <AiFillEyeInvisible
                        className="absolute top-1/2 right-4 transform -translate-y-1/2"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <AiFillEye
                        className="absolute top-1/2 right-4 transform -translate-y-1/2"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </span>
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <input
                  type="submit"
                  className="bg-sky-300 hover:bg-sky-400 hover:shadow-2xl p-2 rounded-md text-white"
                  value="Login"
                />
              </form>
            <h6 className="text-center mt-0">
              Don&apos;t have an account?{" "}
              <Link to="/login" state={location.state}>
                <span className="text-rose-500  font-semibold hover:underline">
                  Login here
                </span>
              </Link>
            </h6>
            <div className="flex justify-center items-center gap-5 mx-10">
            <div className="border-b h-1 w-full border-gray-300"></div>
            <span className="text-xl">or</span>
            <div className="border-b h-1 w-full border-gray-300"></div>
          </div>
          <div className="form-control mt-4 mx-8">
            <button className=" w-full flex gap-3 btn-sec">
              <img
                className="w-5 h-5"
                src="https://i.postimg.cc/4NhHcV5v/google.png"
                alt=""
              />
              <span className="capitalize ">Continue With Google</span>
            </button>
          </div>
          </div>
        </div>
      </div>
    </>
    );
};

export default Register;