//import { showSuccess, showError } from "../../util/toast";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/Home";
import LayoutMain from "../components/layout/LayoutMain";
import Register from "../pages/Register";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<LayoutMain />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
