import { Helmet } from "react-helmet";
import useEnrolled from "../../../Hooks/useEnrolled";
import useAllClasses from "../../../Hooks/useAllClasses";


const EnrolledClasses = () => {
  const [enrolledClasses] = useEnrolled();
  const [allClasses] = useAllClasses();
  const classes = enrolledClasses.reduce((matched, cls) => {
    const matchedClass = allClasses.find((c) => c._id === cls?.clsId);
    if (matchedClass) {
      matched.push(matchedClass);
    }
    return matched;
  }, []);

  console.log(classes);

  return (
    <>
      <Helmet>
        <title>Enrolled Classes | LVC</title>
      </Helmet>
      <div className="flex justify-center">
        <h2 className="text-center my-5 font-semibold text-2xl bg-sky-200 p-3 px-6 rounded-tr-full rounded-bl-full inline-block">
          Enrolled Classes
        </h2>
      </div>
      <div className="overflow-x-auto border-y border-gray-100  mt-3 mb-16 pb-3">
        <table className="table ">
          <thead>
            <tr>
              <th>#</th>
              <th>Class</th>
              <th>Instructor</th>
              <th>Available Seats</th>
              
            </tr>
          </thead>
          <tbody>
            {classes.length > 0 ? (
              classes.map((cls, index) => (
                <tr key={cls._id} className="border-b border-gray-100">
                  <td>{index + 1}</td>
                  <td>
                    <div className="avatar w-28">
                      <img src={cls?.thumbnailUrl} alt="Thumbnail" />
                    </div>

                    <br />
                    <div className="font-medium ">{cls?.clsTitle}</div>
                  </td>
                  <td className="font-medium  opacity-70">
                    <div>{cls?.instructorName}</div>
                    <div>{cls?.instructorEmail}</div>
                  </td>
                  <td className="capitalize font-medium text-xs">
                    {cls?.availableSeats}
                  </td>

                  
                </tr>
              ))
            ) : (
              <tr className="border-b text-center border-gray-100">
                <td colSpan="5">
                  Please enroll at least one class to view here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EnrolledClasses;
