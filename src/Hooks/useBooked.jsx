import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useBooked = () => {
    const { user } = useContext(AuthContext);

    const {
      refetch,
      data: bookedClasses=[] ,
    } = useQuery({
      queryKey: ["bookedClasses", user?.email],
      queryFn: async () => {
        const res = await fetch(
          `https://lingua-viva-camp-server.vercel.app/bookedClasses?email=${user?.email}`
        );
        
        return res.json(); 
      },
      
    });
    console.log(bookedClasses);
    return [  bookedClasses, refetch];
  
};

export default useBooked;
