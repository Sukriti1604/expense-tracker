import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    // pre-fill the form if user exists
    if (user) {
      setFullName(user.fullName || "");
      setProfileImage(user.profileImageUrl || "");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUserData = {
        fullName,
        profileImageUrl: profileImage,
      };

      const response = await axios.put(
        `http://localhost:5000/api/user/update/${user._id}`, // backend URL
        updatedUserData
      );

      // Update the UserContext
      updateUser(response.data.user);

      toast.success("Profile updated successfully! 🎉");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">Update Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Input */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Profile Image Input */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">Profile Image</label>

            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleImageChange}
              className="hidden"
            />

            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg text-center transition-all duration-300"
            >
              Choose File
            </label>

            {fileName && (
              <span className="text-sm text-gray-500 mt-2 text-center">{fileName}</span>
            )}
          </div>

          {/* Profile Preview */}
          {profileImage && (
            <div className="flex justify-center mt-4">
              <img
                src={profileImage}
                alt="Profile Preview"
                className="w-28 h-28 object-cover rounded-full ring-2 ring-primary"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
