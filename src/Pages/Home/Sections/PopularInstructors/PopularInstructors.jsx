// import { useQuery } from "@tanstack/react-query";
// import Spinner from "../../../Spinner/Spinner";

// const PopularInstructors = () => {
//   const { data: popularInstructors = [], isLoading } = useQuery({
//     queryKey: ["popularInstructors"],
//     queryFn: async () => {
//       const res = await fetch("https://b7a12-summer-camp-server-side-apurba-hasan-j.vercel.app/popular-instructors");
//       return res.json();
//     },
//   },{ enabled: true });

//   if (isLoading) {
//     return <Spinner />;
//   }

//   return (
//     <div>
//       <div className="flex justify-center">
//         <h2 className="text-center my-3 font-semibold text-2xl bg-sky-200 p-3 px-6 rounded-tr-full rounded-bl-full inline-block">
//           Popular Instructors
//         </h2>
//       </div>

//       <div className="grid md:grid-cols-3 sm:grid-cols-2 mb-10 gap-5 my-container">
//         {popularInstructors.map((instructor) => (
//           <div
//             data-aos="zoom-in-up"
//             key={instructor._id}
//             className="card border-t rounded-lg bg-base-100 shadow-xl flex flex-col">
//             <div className="overflow-hidden rounded-t-lg">
//               <img
//                 className="object-cover md:h-48 w-full"
//                 src={instructor.img}
//                 alt={instructor.name}
//               />
//             </div>
//             <div className="card-body rounded-b-lg">
//               <h2 className="card-title">{instructor.name}</h2>
//               <p className="text-sm opacity-50">{instructor.email}</p>
//               <button className="btn btn-sm ml-auto btn-outline border border-green-400 bg-white text-green-400 hover:bg-green-400 hover:border-none hover:text-white">
//               See All Classes
//             </button>
//             </div>
            
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularInstructors;
