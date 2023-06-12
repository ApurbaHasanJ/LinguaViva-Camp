import { Helmet } from "react-helmet";

const Instructors = () => {
  return (
    <>
      <Helmet>
        <title>Instructors | LVC</title>
      </Helmet>
      <div className="flex justify-center">
        <h2 className="text-center my-5 mt-24 font-semibold text-2xl bg-sky-200 p-3 px-6 rounded-tr-full rounded-bl-full inline-block">
          Instructors
        </h2>
      </div>
    </>
  );
};

export default Instructors;
