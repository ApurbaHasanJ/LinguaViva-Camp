import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaUserShield, FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";

const ManageUsers = () => {
  const { data: users = [] } = useQuery(["users"], async () => {
    const res = await fetch("http://localhost:5000/users");
    return res.json();
  });

  return (
    <>
      <Helmet>
        <title>Manage Users | LVC</title>
      </Helmet>
      <div className="overflow-x-auto mt-3 mb-16">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className=" ">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.img}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">
                        {user?.role ? user.role : "Student"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td className="">
                  <div className="btn btn-ghost hover:bg-sky-100">
                  {user == "Admin" ? (
                    <button><FaUserShield className="text-2xl" /></button>
                  ) : (
                    <>
                      {user?.role == "Instructor" ? (
                       <button><GiTeacher className="text-2xl" /></button>
                      ) : (
                        <button><FaUsers/></button>
                      )}
                    </>
                  )}
                  </div>
                  {/* */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
