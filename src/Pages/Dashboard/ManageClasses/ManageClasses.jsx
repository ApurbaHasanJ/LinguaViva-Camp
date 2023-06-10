import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const ManageClasses = () => {
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [feedback, setFeedback] = useState("");

  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await fetch("http://localhost:5000/classes");
    return res.json();
  });

  const handleClassStatus = async (classId, status) => {
    setSelectedClassId(classId);
    if (status === "denied") {
      const { value: feedback } = await Swal.fire({
        title: "Provide Feedback",
        input: "textarea",
        inputPlaceholder: "Enter your feedback...",
        inputAttributes: {
          maxlength: 80,
        },
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "Feedback is required!";
          }
        },
      });

      if (feedback) {
        await updateClassStatus.mutateAsync({ classId, status, feedback });
      }
    } else {
      await updateClassStatus.mutateAsync({ classId, status });
    }
    setSelectedClassId(null);
  };

  const updateClassStatus = useMutation(
    async ({ classId, status, feedback }) => {
      const res = await fetch(`http://localhost:5000/classes/${classId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, feedback }),
      });
      const data = await res.json();
      return data.modifiedCount;
    },

    {
      onSuccess: () => {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Status updated to ${status}!`,
          showConfirmButton: false,
          timer: 1500,
        });
      },
    }
  );

  return (
    <>
      <Helmet>
        <title>Manage Classes | LVC</title>
      </Helmet>
      <div className="flex justify-center">
        <h2 className="text-center my-5 font-semibold text-2xl bg-sky-200 p-3 px-6 rounded-tr-full rounded-bl-full inline-block">
          Manage Classes
        </h2>
      </div>
      <div className="overflow-x-auto border-y border-gray-100 mt-3 mb-16 pb-3">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Class</th>
              <th>Instructor</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls, index) => (
              <tr key={cls?._id} className="border-b border-gray-100 ">
                <th>{index + 1}</th>
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
                <td>
                  <div className="font-semibold">{cls?.instructorName}</div>
                  <div className="text-sm opacity-50">
                    {cls?.instructorEmail}
                  </div>
                </td>
                <td>
                  <div className="font-bold  opacity-50">${cls?.price}</div>
                </td>
                <td>
                  <div className="badge capitalize">{cls?.status}</div>
                </td>
                <td>
                  <div className="grid gap-2">
                    {cls?.status === "approved" || cls?.status === "denied" ? (
                      <>
                        <button
                          className="btn btn-xs btn-success hover:bg-green-500"
                          disabled="disabled"
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-xs btn-error hover:bg-red-500"
                          disabled="disabled"
                        >
                          Deny
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-xs btn-success hover:bg-green-500"
                          disabled={selectedClassId === cls._id}
                          onClick={() => handleClassStatus(cls._id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-xs btn-error hover:bg-red-500"
                          disabled={selectedClassId === cls._id}
                          onClick={() => handleClassStatus(cls._id, "denied")}
                        >
                          Deny
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <div className="py-2">
            <label htmlFor="reason" className="font-semibold">
              What&apos;s the reason you want to deny the class?
            </label>
            <textarea
              id="reason"
              className="w-full border rounded p-2"
              rows="4"
              maxLength="80"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ManageClasses;
