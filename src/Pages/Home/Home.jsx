import { Helmet } from "react-helmet";
import Banners from "./Sections/Banners/Banners";
import PopularClasses from "./Sections/PopularClasses/PopularClasses";
// import PopularInstructors from "./Sections/PopularInstructors/PopularInstructors";
import SummerLife from "./Sections/SummerLife/SummerLife";
import AmazingExperiences from "./Sections/AmazingExperience/AmazingExperiences";
import Questions from "./Sections/Questions/Questions";
import Programs from "./Sections/Programs/Programs";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | LVC</title>
      </Helmet>
      <Banners />
      <SummerLife />
      <Programs />
      <PopularClasses />
      {/* <PopularInstructors /> */}
      <AmazingExperiences />
      <Questions />
    </div>
  );
};

export default Home;
