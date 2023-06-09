import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { FaUserShield, FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch("http://localhost:5000/users");
    return res.json();
  });

  // Add state to track the selected role
  const [selectedUserId, setSelectedUserId] = useState(null);
  const cardRef = useRef(null);

  const handleUsersRole = (userId, role) => {
    fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Role updated to ${role}!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setSelectedUserId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Manage Users | LVC</title>
      </Helmet>
      <div className="overflow-x-auto mt-3 mb-16 pb-3">
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
                <td>
                  <div
                    onClick={() => setSelectedUserId(user._id)}
                    className="btn btn-ghost  hover:bg-sky-100"
                  >
                    {/* Add onClick event handler to open role selection dialog */}
                    <button>
                      {user.role === "Admin" ? (
                        <FaUserShield className="text-2xl" />
                      ) : (
                        <>
                          {user.role === "Instructor" ? (
                            <GiTeacher className="text-2xl" />
                          ) : (
                            <FaUsers className="text-2xl" />
                          )}
                        </>
                      )}
                    </button>
                  </div>

                  {/* Add role selection card */}
                  {selectedUserId === user._id && (
                    <div
                      ref={cardRef}
                      className="absolute z-10 left-2/3 bg-white dropdown-content p-4 rounded shadow"
                    >
                      <button
                        className="mb-2 flex items-center hover:text-sky-300 text-left focus:outline-none"
                        onClick={() => handleUsersRole(user._id, "Admin")}
                      >
                        <FaUserShield className="mr-2" />
                        Admin
                      </button>
                      <button
                        className="flex items-center text-left hover:text-sky-300 focus:outline-none"
                        onClick={() => handleUsersRole(user._id, "Instructor")}
                      >
                        <GiTeacher className="mr-2" />
                        Instructor
                      </button>
                    </div>
                  )}
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
