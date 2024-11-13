import axios from "axios";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { adminLogout } from "../redux/admin/adminSlice.js";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const { admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [data, setData] = useState(0);
  const [search, setSearch] = useState("");
  const Navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/api/admin/dashboard")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  const handleAddUser = () => {
    Navigate("/admin/add-user");
  };
  const handleEdit = (id) => {
    Navigate(`/admin/edit/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete this user. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#94A3B8",
      cancelButtonColor: "#475569",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/admin/delete/${id}`)
          .then(() => {
            setData(data + 1);
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted successfully.",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#3085d6",
              background: "#fef5e7",
              color: "#333",
              iconColor: "#a5dc86",
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
              timer: 3000,
              timerProgressBar: true,
            });
          })
          .catch((err) => console.error(err));
      }
    });
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );
  const signOut = () => {
    axios.get("/api/admin/signout");
    dispatch(adminLogout()); // Correct
    Navigate("/admin/login"); // Correct
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between ml-6 mb-6 mt-3 m-4">
        <input
          type="text"
          className="bg-slate-100 p-2 rounded-lg mb-2 md:mb-0"
          placeholder="Search Username..."
          value={search}
          onChange={handleSearch}
        />
        <div className="flex gap-2">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={handleAddUser}
          >
            Add User
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Index</th>
            <th className="py-3 px-6 text-left">Profile Picture</th>
            <th className="py-3 px-6 text-left">Username</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-center">Edit</th>
            <th className="py-3 px-6 text-center">Delete</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredUsers.map((user, index) => (
            <tr
              key={user._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">{index + 1}</div>
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-16 h-16 object-cover rounded-full" // Set a fixed size and cover object-fit
                  />
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center text-2xl font-semibold">
                  <span>{user.username}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center text-2xl font-semibold">
                  <span>{user.email}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </button>
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default AdminDashboard;
