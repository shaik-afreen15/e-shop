import React, { useEffect, useState } from "react";
import axios from "axios";


const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "" ,});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await axios.get("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser({
        name: data?.name || "",
        email: data?.email || "",
      });
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put("/api/profile", user, {  
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    alert("Profile updated successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">My Profile</h2>

        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 mb-3"
        />

        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 mb-3"
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
