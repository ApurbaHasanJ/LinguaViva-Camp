import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userToken = await getAuthToken(user);
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/classes",
        data,
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  const getAuthToken = async (user) => {
    try {
      const response = await axios.post("http://localhost:5000/jwt", user);
      const { userToken } = response.data;
      return userToken;
    } catch (error) {
      console.error("Error in getting authentication token:", error);
      throw error;
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Class | LVC</title>
      </Helmet>
      <div className="flex justify-center">
        <h2 className="text-center my-5 font-semibold text-2xl bg-sky-200 p-3 px-6 rounded-tr-full rounded-bl-full inline-block ">
          Add Your Class
        </h2>
      </div>
      <div className="card  pb-10 m-5  flex-shrink-0  shadow-2xl bg-base-100 mb-16">
        <form
          className="card-body w-full  pb-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-3">
            {/* Class Title */}
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text font-medium">Class Title</span>
              </label>
              <input
                {...register("clsTitle", {
                  required: "Class title is required",
                })}
                type="text"
                placeholder="Enter Class Title"
                className="input input-bordered"
              />
              {errors.clsTitle && (
                <span className="text-red-600 text-xs">
                  {errors.clsTitle.message}
                </span>
              )}
            </div>
            {/* Instructor Name */}
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text font-medium">Instructor Name</span>
              </label>
              <input
                {...register("instructorName", {
                  required: "Instructor Name is required",
                })}
                type="text"
                readOnly
                value={user?.displayName}
                className="input input-bordered"
              />
              {errors.instructorName && (
                <span className="text-red-600 text-xs">
                  {errors.instructorName.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* Class Thumbnail */}
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text font-medium">Class Thumbnail</span>
              </label>
              <input
                {...register("thumbnailUrl", {
                  required: "Thumbnail is required",
                })}
                type="text"
                placeholder="Enter Thumbnail Url"
                className="input input-bordered"
              />
              {errors.thumbnailUrl && (
                <span className="text-red-600 text-xs">
                  {errors.thumbnailUrl.message}
                </span>
              )}
            </div>
            {/* Instructor Email */}
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text font-medium">Instructor Email</span>
              </label>
              <input
                {...register("instructorEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                readOnly
                value={user?.email}
                className="input input-bordered"
              />
              {errors.instructorEmail && (
                <span className="text-red-600 text-xs ">
                  {errors.instructorEmail.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* available Seats */}
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text font-medium">Available Seats</span>
              </label>
              <input
                {...register("availableSeats", {
                  required: "Seats is required",
                })}
                type="number"
                placeholder="000"
                className="input input-bordered"
              />
              {errors.availableSeats && (
                <span className="text-red-600 text-xs">
                  {errors.availableSeats.message}
                </span>
              )}
            </div>
            {/* price */}
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text font-medium">Price</span>
              </label>
              <input
                {...register("price", {
                  required: "Price is required",
                })}
                type="number"
                placeholder="$0"
                className="input input-bordered"
              />
              {errors.price && (
                <span className="text-red-600 text-xs">
                  {errors.price.message}
                </span>
              )}
            </div>
          </div>

          <input
            type="submit"
            className="bg-sky-300 w-full hover:bg-sky-400 hover:shadow-2xl p-2 rounded-md text-white"
            value="Submit"
          />
        </form>
      </div>
    </>
  );
};

export default AddClass;
