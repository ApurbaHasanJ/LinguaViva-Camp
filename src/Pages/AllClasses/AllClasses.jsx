import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const AllClasses = () => {
  const { data: classes = [] } = useQuery(["classes/approved"], async () => {
    const res = await fetch("http://localhost:5000/classes/approved");
    console.log(classes);
    return res.json();
  });
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
      <div className="grid grid-cols-3 gap-5 my-container">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="card   bg-base-100 shadow-xl"
          >
            <figure>
              <img className="h-full" src={cls?.thumbnailUrl} alt="Cls Photo" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{cls.clsTitle}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllClasses;
