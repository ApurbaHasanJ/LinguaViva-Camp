import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const ManageClasses = () => {
  const queryClient = useQueryClient();

  const { data: classes = [] } = useQuery(["classes"], async () => {
    const res = await fetch("http://localhost:5000/classes");
    return res.json();
  });

  const [feedback, setFeedback] = useState("");

  const approveMutation = useMutation(async (id) => {
    const res = await fetch(`http://localhost:5000/classes/${id}/approve`, {
      method: "PATCH",
    });
    return res.json();
  });

  const denyMutation = useMutation(async (id) => {
    const res = await fetch(`http://localhost:5000/classes/${id}/deny`, {
      method: "PATCH",
    });
    return res.json();
  });

  const onSubmit = async (id) => {
    const res = await fetch(`http://localhost:5000/classes/${id}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback }),
    });
    if (res.ok) {
      // Feedback submitted successfully
      setFeedback("");
      queryClient.invalidateQueries("classes");
    } else {
      // Error occurred while submitting feedback
      console.error("Error submitting feedback:", res.statusText);
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Classes | LVC</title>
      </Helmet>
      <div>
        {classes.map((cls) => (
          <div key={cls.id} className="class-card">
            <img src={cls.thumbnailUrl} alt="Class Thumbnail" />
            <h3>{cls.clsTitle}</h3>
            <p>Instructor: {cls.instructorName}</p>
            <p>Email: {cls.instructorEmail}</p>
            <p>Available Seats: {cls.availableSeats}</p>
            <p>Price: {cls.price}</p>
            <p>Status: {cls.status}</p>
            {cls.status === "pending" && (
              <>
                <button
                  onClick={() => approveMutation.mutate(cls.id)}
                  disabled={approveMutation.isLoading}
                >
                  Approve
                </button>
                <button
                  onClick={() => denyMutation.mutate(cls.id)}
                  disabled={denyMutation.isLoading}
                >
                  Deny
                </button>
              </>
            )}
            {cls.status !== "pending" && (
              <div>
                <p>Feedback:</p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                <button onClick={() => onSubmit(cls.id)}>Submit Feedback</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageClasses;
