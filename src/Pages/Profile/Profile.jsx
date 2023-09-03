import { useState } from "react";
import { Helmet } from "react-helmet";
import useAuth from "../../Hooks/useAuth";

const Profile = () => {
  const data = useAuth();
  const user = data.user;
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    displayName: user?.displayName || "",
    birthday: "",
    age: "",
    residence: "",
    address: "",
    phone: "",
    email: "",
    facebook: "",
    linkedin: "",
    photo: null,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const updateUser = async (userData) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    };

    try {
      const response = await fetch(
        "https://b7a12-summer-camp-server-side-apurba-hasan-j.vercel.app/users/info",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Error updating user data");
      }
      return response.json();
    } catch (error) {
      throw new Error("Error updating user data");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser({
      displayName: editData.displayName,
      birthday: editData.birthday,
      age: editData.age,
      residence: editData.residence,
      address: editData.address,
      phone: editData.phone,
      email: editData.email,
      facebook: editData.facebook,
      linkedin: editData.linkedin,
    })
      .then(() => {
        console.log("Data saved successfully");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error saving data: ", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <Helmet>
        <title>Profile | LVC</title>
      </Helmet>
      <div className="flex justify-center">
        <h2 className="text-center mt-24 font-semibold text-2xl bg-sky-100 p-3 px-6 rounded-tr-full rounded-bl-full inline-block">
          Profile
        </h2>
      </div>
      <div className="my-container mb-10">
        <div className="grid grid-cols-2 mt-3">
          <div data-aos="fade-right" className="w-full">
            {/* {isEditing ? (
              <div className="flex justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            ) : ( */}
            <img className="md:w-2/3" src={user?.photoURL} alt="" />
            {/* )} */}
          </div>
          <div data-aos="fade-up">
            <div>
              <div className="flex justify-between">
                <h2 className="text-4xl font-bold">About Me</h2>
                {!isEditing ? (
                  <button className="btn btn-sm" onClick={handleEdit}>
                    Edit
                  </button>
                ) : (
                  <button className="btn btn-sm" onClick={handleSubmit}>
                    Save
                  </button>
                )}
              </div>
              <div className="mt-5">
                <h4 className="text-2xl font-semibold">
                  {isEditing ? (
                    <input
                      type="text"
                      className="border-b"
                      name="displayName"
                      value={editData.displayName}
                      onChange={handleChange}
                    />
                  ) : (
                    user?.displayName
                  )}
                </h4>
                <p className="text-green-600 text-lg">Student</p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Excepturi, eveniet, placeat nihil laboriosam, ducimus ipsam
                soluta recusandae adipisci corporis atque vero aliquid dolorum
                exercitationem numquam dolores dolorem natus impedit aut!
              </p>
            </div>
            {/* Other info */}
            <div className="mt-10 grid grid-cols-2 ">
              <div>
                <div className="flex items-center gap-10">
                  <p>Birthday </p>
                  <p className="text-gray-400">
                    {isEditing ? (
                      <input
                        type="date"
                        className="border-b focus:border-sky-700"
                        name="birthday"
                        value={editData.birthday}
                        onChange={handleChange}
                      />
                    ) : (
                      "/" // Set initial value based on user data
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p>Age </p>
                  <p className="text-gray-400">
                    {isEditing ? (
                      <input
                        type="text"
                        className="border-b focus:border-sky-700"
                        name="age"
                        defaultValue={editData.age}
                      />
                    ) : (
                      "/" // Set initial value based on user data
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p>Residence </p>
                  <p className="text-gray-400">
                    {isEditing ? (
                      <input
                        type="text"
                        className="border-b focus:border-sky-700"
                        name="residence"
                        value={editData.residence}
                        onChange={handleChange}
                      />
                    ) : (
                      "/" // Set initial value based on user data
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p>Address </p>
                  <p className="text-gray-400">
                    {isEditing ? (
                      <input
                        type="text"
                        className="border-b focus:border-sky-700"
                        name="address"
                        value={editData.address}
                        onChange={handleChange}
                      />
                    ) : (
                      "/" // Set initial value based on user data
                    )}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <p>Phone </p>
                  <p className="text-gray-400">
                    {isEditing ? (
                      <input
                        type="text"
                        className="border-b focus:border-sky-700"
                        name="phone"
                        value={editData.phone}
                        onChange={handleChange}
                      />
                    ) : (
                      "/" // Set initial value based on user data
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p>Email </p>
                  <p className="text-gray-400">
                    {isEditing ? (
                      <input
                        type="text"
                        className="border-b focus:border-sky-700"
                        name="email"
                        value={editData.email}
                        onChange={handleChange}
                      />
                    ) : (
                      "/" // Set initial value based on user data
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p>Facebook </p>
                  <p className="text-gray-400">
                    {isEditing ? (
                      <input
                        type="text"
                        className="border-b focus:border-sky-700"
                        name="facebook"
                        value={editData.facebook}
                        onChange={handleChange}
                      />
                    ) : (
                      "/" // Set initial value based on user data
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p>LinkedIn </p>
                  <p className="text-gray-400">
                    {isEditing ? (
                      <input
                        type="text"
                        className="border-b focus:border-sky-700"
                        name="linkedin"
                        value={editData.linkedin}
                        onChange={handleChange}
                      />
                    ) : (
                      "/" // Set initial value based on user data
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
