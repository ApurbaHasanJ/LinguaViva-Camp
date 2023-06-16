import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useBooked = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: bookedClasses = [] } = useQuery({
    queryKey: ["bookedClasses", user?.email],
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure(`/bookedClasses?email=${user?.email}`);

      return res.data;
    },
  });
  console.log(bookedClasses);
  return [bookedClasses, refetch];
};

export default useBooked;
