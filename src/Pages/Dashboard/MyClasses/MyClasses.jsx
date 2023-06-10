import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const MyClasses = () => {
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('access-token');

      // Set the authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await axios.get('http://localhost:5000/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <>
      <Helmet>
        <title>My Classes | LVC</title>
      </Helmet>
      <div className="flex justify-center">
        <h2 className="text-center my-5 font-semibold text-2xl bg-sky-200 p-3 px-6 rounded-tr-full rounded-bl-full inline-block">
          My Classes
        </h2>
      </div>
      <div className="card pb-10 m-5 flex-shrink-0 shadow-2xl bg-base-100 mb-16">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Total Enrolled Students</th>
              <th>Feedback</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls._id}>
                <td>{cls.title}</td>
                <td>{cls.status}</td>
                <td>{cls.totalStudents}</td>
                <td>{cls.feedback}</td>
                <td>
                  {cls.status === 'denied' && (
                    <button className="btn btn-sm btn-primary">Update</button>
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

export default MyClasses;
