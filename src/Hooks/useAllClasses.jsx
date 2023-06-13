import { useQuery } from "@tanstack/react-query";

const useAllClasses = () => {
  
  const { refetch, data: allClasses = [], isLoading } = useQuery({
    queryKey: ["classesApproved"], 
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/classes/approved");
      return res.json();
    },
  });

  console.log(allClasses);
  return [allClasses, refetch, isLoading];
};

export default useAllClasses;
