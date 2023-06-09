import { Helmet } from "react-helmet";
import Banners from "./Sections/Banners/Banners";
import PopularClasses from "./Sections/PopularClasses/PopularClasses";
import PopularInstructors from "./Sections/PopularInstructors/PopularInstructors";


const Home = () => {
    return (
        <div>
            <Helmet>
            <title>Home | LVC</title>
            </Helmet>
            <Banners/>
            <PopularClasses/>
            <PopularInstructors/>
        </div>
    );
};

export default Home;