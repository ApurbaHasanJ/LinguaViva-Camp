import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
const Programs = () => {
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://b7a12-summer-camp-server-side-apurba-hasan-j.vercel.app/programs"
      )
      .then((res) => {
        console.log(res);
        setPrograms(res.data);
      });
  }, []);
  console.log(programs);
  return (
    <div className=" bg-gray-100 grid mb-16 py-20">
        <div className="flex justify-center">
        <h2 className="text-center  font-semibold text-2xl bg-sky-200 p-3 px-6 rounded-tr-full rounded-bl-full inline-block">
          Programs
        </h2>
      </div>
      <div className="my-container">
        {programs.map((program) => (
          <div key={program._id} className="  p-5  ">
            <div className="bg-white shadow-md border-r-[10px] grid border-yellow-400 hover:shadow-xl md:flex items-start w-full py-10 pl-10 pr-16  rounded gap-8">
              <figure className="md:w-1/3">
                <img src={program?.img} alt="" />
              </figure>
              <div className="md:w-2/3">
                <h3 className="font-bold tracking-wider text-xl">
                  {program?.title}
                </h3>
                <div className="flex items-center gap-5 mt-3">
                  <div className="flex items-center gap-2 font-bold">
                    <BsFillPersonFill />
                    <p>{program?.ages}</p>
                  </div>
                  <div className="flex items-center gap-2 font-bold">
                    <MdDateRange />
                    <p>{program?.duration}</p>
                  </div>
                </div>
                <p className="text-slate-950 font-medium text-base mt-3">
                  {program?.description}
                </p>
                <p className="text-gray-600   mt-3">
                  <span className="font-semibold text-base">Destination: </span>
                  {program?.destinations}
                  <div className="mt-2 sm:flex grid gap-4 text-sm font-semibold justify-items-center  sm:justify-end text-black">
                    <button className="border border-yellow-400 rounded-full hover:shadow-2xl w-60 py-2">Order Free Boucher</button>
                    <button className="bg-yellow-400 rounded-full hover:shadow-2xl w-44 py-2">Learn More</button>
                  </div>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
