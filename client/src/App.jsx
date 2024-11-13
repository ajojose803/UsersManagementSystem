import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/AdminLogin";
import Header from "./components/Header";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddUser from "./pages/AdminAddUser";
import AdminUserEdit from "./pages/AdminUserEdit";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<PrivateAdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-user" element={<AdminAddUser />} />
          <Route path="/admin/edit/:id" element={<AdminUserEdit />} />
        </Route>
      </Routes>
        
      
    </BrowserRouter>
  );
}
