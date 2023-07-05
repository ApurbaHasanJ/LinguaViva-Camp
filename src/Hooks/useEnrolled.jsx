import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useEnrolled = () => {
  
        const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: enrolledClasses = [] } = useQuery({
    queryKey: ["payment", user?.email],
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure(`/payment?email=${user?.email}`);

      return res.data;
    },
  });
  console.log(enrolledClasses);
  return [enrolledClasses, refetch];
    
};

export default useEnrolled;