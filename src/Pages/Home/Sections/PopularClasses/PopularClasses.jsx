import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../Spinner/Spinner";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAdmin from "../../../../Hooks/useAdmin";
import useInstructor from "../../../../Hooks/useInstructor";

const PopularClasses = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  const {
    refetch,
    data: popularClasses = [],
    isLoading,
  } = useQuery(
    {
      queryKey: ["classesApproved"],
      queryFn: async () => {
        const res = await fetch(
          "https://b7a12-summer-camp-server-side-apurba-hasan-j.vercel.app/popular-classes"
        );
        return res.json();
      },
    },
    { enabled: true }
  );

  if (isLoading) {
    return <Spinner />;
  }

  const handleBookedClasses = (cls) => {
    console.log(cls);
    const bookedCls = {
      clsId: cls?._id,
      title: cls?.clsTitle,
      image: cls?.thumbnailUrl,
      seats: cls?.availableSeats,
      price: cls?.price,
      studentName: user?.displayName,
      email: user?.email,
    };

    if (user && user.email) {
      fetch(
        "https://b7a12-summer-camp-server-side-apurba-hasan-j.vercel.app/bookedClasses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookedCls),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Class Bookmarked Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You Have To Login First!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#99DBF5",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <h2 className="text-center my-3 font-semibold text-2xl bg-sky-200 p-3 px-6 rounded-tr-full rounded-bl-full inline-block">
          Popular Classes
        </h2>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 mb-10 gap-5 my-container">
        {popularClasses.map((cls) => (
          <div
            key={cls._id}
            className="card border-t rounded-lg bg-base-100 shadow-xl flex flex-col">
            <div className="overflow-hidden rounded-t-lg">
              <img
                className="object-cover md:h-48 w-full"
                src={cls?.thumbnailUrl}
                alt="Class Photo"
              />
            </div>
            <div
              className={`card-body rounded-b-lg ${
                cls.availableSeats === 0 && "bg-red-500"
              } flex flex-col justify-between`}>
              <div>
                <h2 className="card-title">{cls.clsTitle}</h2>
              </div>
              <div className="card-actions justify-between items-end">
                <div className="flex flex-col">
                  <h2 className="font-medium text-sm opacity-50">
                    Instructor: {cls.instructorName}
                  </h2>
                  <h2 className="text-sm opacity-50">
                    Total {cls.availableSeats} seats available
                  </h2>
                  <h2 className="text-sm opacity-50">
                    Enroll Fee: <span className="badge">${cls.price}</span>
                  </h2>
                </div>
                {cls.availableSeats === 0 ? (
                  isAdmin || isInstructor ? (
                    <button
                      disabled="disabled"
                      className="btn btn-sm btn-outline border border-green-400 bg-white text-green-400 hover:bg-green-400 hover:border-none hover:text-white">
                      Add
                    </button>
                  ) : null
                ) : (
                  <button
                    onClick={() => handleBookedClasses(cls)}
                    className="btn btn-sm btn-outline border border-green-400 bg-white text-green-400 hover:bg-green-400 hover:border-none hover:text-white">
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
