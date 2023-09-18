import React, { useContext } from "react";

import image from "../png.jpg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="container h-100 d-flex justify-content-center pt-5">
      <div className="row h-100 justify-content-center">
        <div className="bg-blue-transparent rounded-pill px-3 py-1 d-flex justify-content-between">
          <button
            type="button"
            className=" bg-blue rounded-pill px-3 py-1 d-flex align-items-center justify-content-center"
            onClick={() => navigate("/")}
          >
            Log out
          </button>
          <button
            type="button"
            className=" bg-blue rounded-pill px-3 py-1 d-flex align-items-center justify-content-center"
            onClick={() => navigate("/edit")}
          >
            Edit your profile
          </button>
        </div>
        <div className="m-5">
          <div className="col-12 text-center m-5">
            <h1 className="text-secondary">Welcome back!</h1>
            <div className="profile-picture">
              <img
                src={image}
                alt="Profile"
                className="img-fluid rounded-circle"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
