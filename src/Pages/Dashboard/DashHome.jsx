import Lottie from "lottie-react";
import home from "../../assets/home icon.json"

const DashHome = () => {
    return (
        <div className="text-center mx-auto w-2/3">
          <h2 className=" text-3xl font-semibold"></h2>
            <Lottie animationData={home} loop={true} />
          </div>
    );
};

export default DashHome;