import { Helmet } from "react-helmet";
import Banners from "./Sections/Banners/Banners";


const Home = () => {
    return (
        <div>
            <Helmet>
            <title>Home | LVC</title>
            </Helmet>
            <Banners/>
        </div>
    );
};

export default Home;