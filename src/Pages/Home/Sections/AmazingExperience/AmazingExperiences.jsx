import { FaInstagram, FaPlay } from "react-icons/fa";

const AmazingExperiences = () => {
  return (
    <div className="bg-black py-20 text-white">
      <h2 className="flex justify-center items-center md:text-4xl text-2xl gap-4 font-semibold">
        <FaInstagram />
        <p>Amazing experiences</p>
      </h2>
      <div className="my-container gap-6 grid md:grid-cols-4 sm:grid-cols-2">
        <div className="rounded relative">
          <img
            className="rounded"
            src="https://i.ibb.co/LQp9wjX/adventure.jpg"
            alt=""
          />
          <div className="absolute bottom-0 left-0 right-0 opacity-60 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
          <div className="flex items-center gap-3 text-sm font-semibold absolute bottom-4 left-4">
            <FaPlay className="text-xs" />
            <p>Activities</p>
          </div>
        </div>

        <div className="rounded relative">
          <img
            className="rounded"
            src="https://i.ibb.co/GcsDnV6/teenager.jpg"
            alt=""
          />
          <div className="absolute bottom-0 left-0 right-0 opacity-60 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
          <div className="flex items-center gap-3 text-sm font-semibold absolute bottom-4 left-4">
            <FaPlay className="text-xs" />
            <p>Courses</p>
          </div>
        </div>
        <div className="rounded relative">
          <img
            className="rounded"
            src="https://i.ibb.co/nRW4J6M/beautiful.jpg"
            alt=""
          />
          <div className="absolute bottom-0 left-0 right-0 opacity-60 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
          <div className="flex items-center gap-3 text-sm font-semibold absolute bottom-4 left-4">
            <FaPlay className="text-xs" />
            <p>Schools</p>
          </div>
        </div>
        <div className="rounded relative">
          <img
            className="rounded"
            src="https://i.ibb.co/mbP3Xp3/friends.jpg"
            alt=""
          />
          <div className="absolute bottom-0 left-0 right-0 opacity-60 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
          <div className="flex items-center gap-3 text-sm font-semibold absolute bottom-4 left-4">
            <FaPlay className="text-xs" />
            <p>Accommodation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmazingExperiences;
