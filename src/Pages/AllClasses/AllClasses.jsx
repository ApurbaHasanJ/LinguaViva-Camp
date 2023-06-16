import { useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAllClasses from "../../Hooks/useAllClasses";
import Spinner from "../Spinner/Spinner";
// import Spinner from "../Spinner/Spinner";

const AllClasses = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [allClasses, refetch,isLoading] = useAllClasses();
  console.log(allClasses);

  // const { data: classes = [] } = useQuery(["classes/approved"], async () => {
  //   const res = await fetch("https://b7a12-summer-camp-server-side-apurba-hasan-j.vercel.app/classes/approved");
  //   console.log(classes);
  //   return res.json();
  // });


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
      fetch("https://b7a12-summer-camp-server-side-apurba-hasan-j.vercel.app/bookedClasses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookedCls),
      })
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
    <>
      <Helmet>
        <title>Classes | LVC</title>
      </Helmet>
      <div className="flex justify-center">
        <h2 className="text-center my-5 mt-24 font-semibold text-2xl bg-sky-200 p-3 px-6 rounded-tr-full rounded-bl-full inline-block">
          All Classes
        </h2>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 mb-10 gap-5 my-container">
        {allClasses.map((cls) => (
          <div
            key={cls._id}
            className="card border-t rounded-lg bg-base-100 shadow-xl flex flex-col"
          >
            <div className="overflow-hidden rounded-t-lg">
              <img
                className=" object-cover md:h-48 w-full"
                src={cls?.thumbnailUrl}
                alt="Cls Photo"
              />
            </div>
            <div
              className={`card-body rounded-b-lg ${
                cls.availableSeats === 0 && "bg-red-500"
              } flex flex-col justify-between`}
            >
              <div>
                <h2 className="card-title">{cls.clsTitle}</h2>
              </div>
              <div className="card-actions justify-between items-end">
                <div className="flex flex-col">
                  <h2 className="font-medium text-sm opacity-50">
                    Instructor: {cls.instructorName}
                  </h2>
                  <h2 className="text-sm opacity-50">
                    Total {cls.availableSeats} sets available
                  </h2>
                  <h2 className="text-sm opacity-50">
                    Enroll Fee: <p className="badge">${cls.price}</p>
                  </h2>
                </div>
                {cls.availableSeats === 0 ? (
                  <button
                    disabled="disabled"
                    className="btn btn-sm btn-outline border border-green-400 bg-white text-green-400 hover:bg-green-400 hover:border-none hover:text-white"
                  >
                    Add
                  </button>
                ) : (
                  <button
                    onClick={() => handleBookedClasses(cls)}
                    className="btn btn-sm btn-outline border border-green-400 bg-white text-green-400 hover:bg-green-400 hover:border-none hover:text-white"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllClasses;
