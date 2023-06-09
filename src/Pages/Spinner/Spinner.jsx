import { HashLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="my-container flex justify-center items-center min-h-[100vh]">
      <HashLoader  size="70" color="#99ccff"/>
    </div>
  );
};

export default Spinner;
