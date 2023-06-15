import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Spinner from "../Spinner/Spinner";

const Instructors = () => {
  const { data: instructors = [], isLoading } = useQuery(
    ["instructors"], // Query key
    async () => {
      const res = await fetch("http://localhost:5000/instructors");
      return res.json();
    },
    { enabled: true }
  );

  if(isLoading){
    return <Spinner/>
  }

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
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5 my-container">
        {instructors.map((instructor) => (
          <div
            key={instructor._id}
            className="card border-t rounded-lg bg-base-100 shadow-xl flex flex-col"
          >
            <div className="overflow-hidden rounded-t-lg">
              <img
                className="object-cover md:h-48 w-full"
                src={instructor.img}
                alt={instructor.name}
              />
            </div>
            <div className="card-body rounded-b-lg">
              <h2 className="card-title">{instructor.name}</h2>
              <p className="text-sm opacity-50">{instructor.email}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Instructors;
