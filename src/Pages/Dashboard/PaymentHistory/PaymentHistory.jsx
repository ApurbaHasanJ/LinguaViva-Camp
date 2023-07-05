import { Helmet } from "react-helmet";
import useEnrolled from "../../../Hooks/useEnrolled";

const PaymentHistory = () => {
  const [enrolledClasses] = useEnrolled();

  return (
    <>
      <Helmet>
        <title>Payment History | LVC</title>
      </Helmet>
      <div className="flex justify-center">
        <h2 className="text-center my-5 font-semibold text-2xl bg-sky-200 p-3 px-6 rounded-tr-full rounded-bl-full inline-block">
          Payment History
        </h2>
      </div>
      <div className="overflow-x-auto border-y border-gray-100  mt-3 mb-16 pb-3">
        <table className="table ">
          <thead>
            <tr>
              <th>#</th>
              <th>Class</th>
              <th>Date</th>
              <th>Price</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {enrolledClasses.length > 0 ? (
              enrolledClasses.map((cls, index) => (
                <tr key={cls._id} className="border-b border-gray-100">
                  <td>{index + 1}</td>
                  <td className="font-medium ">{cls?.clsNames}</td>
                  <td className="text-xs opacity-70 ">{cls?.date}</td>
                  <td className=" flex justify-center items-center">
                    <div className=" badge">${cls?.price}</div>
                  </td>

                  <td className="capitalize font-medium text-xs">
                    ${cls?.transactionId}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b text-center border-gray-100">
                <td colSpan="5">You have made no payment for any classes.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaymentHistory;
