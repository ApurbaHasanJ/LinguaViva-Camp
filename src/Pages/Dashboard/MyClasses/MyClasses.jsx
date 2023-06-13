import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import Spinner from "../../Spinner/Spinner";

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClasses = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("access-token");

      // Set the authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get("https://lingua-viva-camp-server.vercel.app/classes");
      setClasses(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    // Set the default form data based on the selected class
    if (selectedClass) {
      setFormData({
        title: selectedClass.clsTitle || "",
        thumbnailUrl: selectedClass.thumbnailUrl || "",
        availableSeats: selectedClass.availableSeats || 0,
        price: selectedClass.price || 0,
      });
    }
  }, [selectedClass]);


  if(isLoading){
    return <Spinner/>
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("access-token");

      // Set the authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Make the API request to update the class
      await axios.patch(
        `https://lingua-viva-camp-server.vercel.app/classes/${selectedClass._id}`,
        formData
      );

      // Show success message using SweetAlert or any other library
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "The class has been successfully updated.",
        showConfirmButton: false,
        timer: 1500,
      });

      // If the status was "denied", update it to "pending"
      if (selectedClass.status === "denied") {
        setSelectedClass((prevClass) => ({
          ...prevClass,
          status: "pending",
        }));
      }

      // Fetch the updated list of classes
      fetchClasses();
    } catch (error) {
      console.error("Error updating class:", error);
    }

    // Close the modal
    window.my_modal_3.close();
  };


  return (
    <>
      <Helmet>
        <title>My Classes | LVC</title>
      </Helmet>
      <div className="flex justify-center">
        <h2 className="text-center my-5 font-semibold text-2xl bg-sky-200 p-3 px-6 rounded-tr-full rounded-bl-full inline-block">
          My Classes
        </h2>
      </div>
      <div className="overflow-x-auto border-y border-gray-100  mt-3 mb-16 pb-3">
        <table className="table ">
          <thead>
            <tr>
              <th>#</th>
              <th>Class</th>
              <th>Status</th>
              <th>Enrolled </th>
              <th>Feedback</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls, index) => (
              <tr key={cls._id} className="border-b border-gray-100">
                <td>{index + 1}</td>
                <td>
                  <div className="avatar w-20">
                    <img src={cls?.thumbnailUrl} alt="Thumbnail" />
                  </div>

                  <br />
                  <div className="font-medium ">{cls?.clsTitle}</div>
                  <p className="text-sm opacity-50">
                    {cls?.availableSeats} seats available
                  </p>
                </td>
                <td className="capitalize font-medium text-xs">{cls.status}</td>
                <td className="text-xs">
                  Total 00 <br /> Students
                </td>
                <td className="text-xs">
                  {cls?.feedback ? cls?.feedback : "No feedback to display"}
                </td>

                <td>
                  <button
                    className="btn btn-xs bg-white border border-sky-300 text-sky-300 hover:text-white hover:bg-sky-300"
                    onClick={() => {
                      setSelectedClass(cls);
                      window.my_modal_3.showModal();
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <form onSubmit={handleFormSubmit} className="modal-box">
          <button
            type="button"
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => window.my_modal_3.close()}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-2">Update Class</h3>
          <div className="form-control mb-2">
            <label className="label-text" htmlFor="title">Title:</label>
            <input
              className="input input-bordered"
              placeholder="Type your class name..."
              type="text"
              id="title"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="form-control mb-2">
            <label className="label-text" htmlFor="thumbnailUrl">Thumbnail URL:</label>
            <input
              className="input input-bordered"
              placeholder="Enter photo URL..."
              type="text"
              id="thumbnailUrl"
              value={formData.thumbnailUrl || ""}
              onChange={(e) =>
                setFormData({ ...formData, thumbnailUrl: e.target.value })
              }
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            <div className="form-control">
              <label className="label-text" htmlFor="availableSeats">Available Seats:</label>
              <input
                className="input input-bordered"
                placeholder="0000 seats..."
                type="number"
                id="availableSeats"
                value={formData.availableSeats}
                onChange={(e) =>
                  setFormData({ ...formData, availableSeats: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label-text" htmlFor="price">Price:</label>
              <input
                className="input input-bordered"
                placeholder="$00"
                type="number"
                id="price"
                value={formData.price }
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <input
              type="submit"
              value="Update"
              className="bg-sky-300 hover:bg-sky-400 hover:shadow-2xl btn btn-xs rounded-md text-white"
            />
          </div>
        </form>
      </dialog>
    </>
  );
};

export default MyClasses;
