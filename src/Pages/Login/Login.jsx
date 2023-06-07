import Lottie from "lottie-react";
import loginAni from "../../assets/11067-registration-animation.json";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <Helmet>
        <title>Login | LVC</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="hero min-h-screen bg-base-200"
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <Lottie animationData={loginAni} loop={true} />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("name")}
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
                    placeholder="Your password"
                    className="input input-bordered  w-full relative"
                  />{" "}
                  {passwordVisible ? (
                    <AiFillEyeInvisible
                      className="absolute top-1/2 right-2 transform -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <AiFillEye
                      className="absolute top-1/2 right-2 transform -translate-y-1/2"
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
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
