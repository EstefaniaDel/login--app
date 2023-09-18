import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../App";
import { toast } from "react-hot-toast";

const EditProfile = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user.id) {
      toast.error("User ID is missing.");
      return;
    }
    setNewEmail(user.email);
    setNewUsername(user.username);
  }, [user]);

  const handleUpdateUsername = () => {
    if (!user.id) {
      toast.error("User ID is missing.");
      return;
    }

    axios
      .put(`http://localhost:5000/users/${user.id}`, { username: newUsername })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Username updated successfully");
        } else {
          toast.error("Error updating username");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };

  const handleUpdateEmail = () => {
    if (!user.id) {
      toast.error("User ID is missing.");
      return;
    }

    axios
      .put(`http://localhost:5000/users/${user.id}`, { email: newEmail })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Email updated successfully");
        } else {
          toast.error("Error updating email");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };

  const handleDeleteUser = () => {
    if (!user.id) {
      console.error("User ID is missing.");
      toast.error("User ID is missing.");
      return;
    }

    const deleteConfirmation = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (deleteConfirmation) {
      axios
        .delete(`http://localhost:5000/users/${user.id}`)
        .then((response) => {
          return;
        });
    }
  };
  return (
    <div className="container h-100 d-flex justify-content-center align-items-center">
      <div>
        <div className="bg-blue-transparent  rounded-pill px-3 py-1 d-flex align-items-center justify-content-center">
          <a href="/profile" className="link-danger text-white">
            Go to Profile
          </a>
        </div>
        <div className="lead col-12 text-center m-3">
          <h1 className="text-secondary">Edit your profile!</h1>
        </div>
        <div className="lead">
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={handleUpdateUsername}
            >
              Save Username
            </button>
          </div>

          <div>
            <input
              type="email"
              className="form-control"
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={handleUpdateEmail}
            >
              Save Email
            </button>
          </div>

          <div>
            <button
              type="button"
              className="btn btn-danger btn-sm mt-3"
              onClick={handleDeleteUser}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
