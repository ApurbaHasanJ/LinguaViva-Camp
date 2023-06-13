import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { FaUserShield, FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import Swal from "sweetalert2";
import Spinner from "../../Spinner/Spinner";

const ManageUsers = () => {
  const { data: users = [], refetch, isLoading } = useQuery(["users"], async () => {
    const res = await fetch("https://lingua-viva-camp-server.vercel.app/users");
    return res.json();
  });

  const [selectedUserId, setSelectedUserId] = useState(null);
  const cardRef = useRef(null);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [updatedUsers, setUpdatedUsers] = useState([]);

  const handleUsersRole = (userId, role) => {
    setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, userId]);
  
    fetch(`https://lingua-viva-camp-server.vercel.app/users/${userId}`, {
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
        if (data.modifiedCount) {
          const updated = users.map((user) => {
            if (user._id === userId) {
              return {
                ...user,
                role: role,
                btn: false, // Disable the button after role update
              };
            }
            return user;
          });
          setUpdatedUsers(updated);
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>Manage Users | LVC</title>
      </Helmet>
      <div className="flex justify-center">
        <h2 className="text-center my-5 font-semibold text-2xl bg-sky-200 p-3 px-6 rounded-tr-full rounded-bl-full inline-block">
          Manage Users
        </h2>
      </div>
      <div className="overflow-x-auto border-y border-gray-100  mt-3 mb-16 pb-3">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {(updatedUsers.length > 0 ? updatedUsers : users).map((user, index) => (
              <tr key={user._id} className="border-b border-gray-100">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.img} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user?.role ? user.role : "Student"}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <div
                    disabled={disabledButtons.includes(user._id) || user.btn === false}
                    onClick={() => setSelectedUserId(user._id)}
                    className="btn btn-ghost hover:bg-sky-100"
                  >
                    <button className="focus:outline-none">
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
                  {selectedUserId === user._id && (
                    <div ref={cardRef} className="absolute z-10 left-2/3 bg-white dropdown-content p-4 rounded shadow">
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
