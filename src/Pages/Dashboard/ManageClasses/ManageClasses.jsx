import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";


const ManageClasses = () => {
    const {data: classes= [], } = useQuery(['classes'], async()=>{
        const res = await fetch('http://localhost:5000/users')
        return res.json()
    })
    return (
        <>
      <Helmet>
        <title>Manage Classes | LVC</title>
      </Helmet>
        <div>
            {classes.length}
        </div>
        </>
    );
};

export default ManageClasses;