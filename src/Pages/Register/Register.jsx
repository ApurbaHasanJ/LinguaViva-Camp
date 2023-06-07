import Lottie from "lottie-react";
import registerAni from "../../assets/11067-registration-animation.json";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const { createUser, userProfile, continueWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate()
  
  // get redirect path
  const path = location?.state?.from?.pathname || "/";

  // Handle Register
  const onSubmit = (data) => {
    console.log(data);
    
    createUser(data.email, data.password)
      .then((res) => {
        userProfile(data.name, data.photoUrl);
        const loggedUser = res.user;
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sign Up Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          reset()
        navigate(path, { replace: true });
        console.log(loggedUser);
      });
  };

  // Continue with Google
  const googleSignIn = () => {
    continueWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sign in Successfully',
            showConfirmButton: false,
            timer: 1500
          })
        
        console.log(loggedUser);
        navigate(path, { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [conPasswordVisible, setConPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConPasswordVisibility = () => {
    setConPasswordVisible(!conPasswordVisible);
  };

  return (
    <>
      <Helmet>
        <title>Register | LVC</title>
      </Helmet>
      <div className="hero min-h-screen mt-16 mb-10 pt-10 ">
        <div className="hero-content flex-col items-start lg:flex-row-reverse">
          <div className="text-center sticky top-1 right-1">
          <h2 className=" text-3xl font-semibold">Please Register</h2>
            <Lottie animationData={registerAni} loop={false} />
          </div>
          <div className="card pb-4  flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body pb-1" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Your name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600 text-xs">{errors.name.message}</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  {...register("photoUrl", {
                    required: "Photo URL is required",
                  })}
                  type="text"
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photoUrl && (
                  <span className="text-red-600 text-xs">
                    {errors.photoUrl.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="text"
                  placeholder="Your email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600 text-xs ">{errors.email.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <span className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number. It should be at least 6 characters long.",
                      },
                    })}
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Type password"
                    className="input input-bordered  w-full relative"
                  />
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
                {errors.password && (
                  <span className="text-red-600 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm password</span>
                </label>
                <span className="relative">
                  <input
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      minLength: {
                        value: 6,
                        message:
                          "Confirm password must be at least 6 characters long",
                      },
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number. It should be at least 6 characters long.",
                      },
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    type={conPasswordVisible ? "text" : "password"}
                    placeholder="Confirm password"
                    className="input input-bordered  w-full relative"
                  />
                  {conPasswordVisible ? (
                    <AiFillEyeInvisible
                      className="absolute top-1/2 right-4 transform -translate-y-1/2"
                      onClick={toggleConPasswordVisibility}
                    />
                  ) : (
                    <AiFillEye
                      className="absolute top-1/2 right-4 transform -translate-y-1/2"
                      onClick={toggleConPasswordVisibility}
                    />
                  )}
                </span>
                {errors.confirmPassword && (
                  <span className="text-red-600 text-xs">
                    {errors.confirmPassword.message}
                  </span>
                )}
                <label className="label">
                  <Link to="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
              <input
                type="submit"
                className="bg-sky-300 hover:bg-sky-400 hover:shadow-2xl p-2 rounded-md text-white"
                value="Register"
              />
            </form>
            <h6 className="text-center mt-0">
              Already have an account?{" "}
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
              <button onClick={googleSignIn} className=" w-full flex gap-3 btn-sec">
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
