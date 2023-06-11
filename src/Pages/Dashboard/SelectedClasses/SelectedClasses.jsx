import { Helmet } from "react-helmet";
import useBooked from "../../../Hooks/useBooked";

const SelectedClasses = () => {
  const [bookedClasses] = useBooked();



console.log(bookedClasses);
  return (
    <>
      <Helmet>
        <title>Booked Classes | LVC</title>
      </Helmet>
      <div className="flex justify-center">
        <h2 className="text-center my-5 font-semibold text-2xl bg-sky-200 p-3 px-6 rounded-tr-full rounded-bl-full inline-block">
          Booked Classes
        </h2>
      </div>
      <div className="overflow-x-auto border-y border-gray-100  mt-3 mb-16 pb-3">
        <table className="table ">
          <thead>
            <tr>
              <th>#</th>
              <th>Class</th>
              <th>Seats</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookedClasses.map((cls, index) => (
              <tr key={cls._id} className="border-b border-gray-100">
                <td>{index + 1}</td>
                <td>
                  <div className="avatar w-28">
                    <img src={cls?.image

} alt="Thumbnail" />
                  </div>

                  <br />
                  <div className="font-medium ">{cls?.title}</div>
                </td>
                <td>{cls?.seats} seats <br /> available</td>
                <td className="capitalize font-medium text-xs">
                  ${cls?.price}
                </td>

                <td>
                  <div className="grid gap-2">
                    <button
                      className="btn btn-xs bg-white border border-red-400 text-red-400 hover:text-white hover:bg-red-400"
                      onClick={() => {
                        // setSelectedClass(cls);
                      }}
                    >
                      delete
                    </button>
                    <button
                      className="btn btn-xs bg-white border border-green-400 text-green-400 hover:text-white hover:bg-green-400"
                      onClick={() => {
                        // setSelectedClass(cls);
                      }}
                    >
                      Pay
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SelectedClasses;
