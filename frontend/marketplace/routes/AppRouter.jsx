//import { showSuccess, showError } from "../../util/toast";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/Home";
import LayoutMain from "../components/layout/LayoutMain";
import Register from "../pages/Register";
import MiPerfil from "../pages/MiPerfil";
import MisPublicaciones from "../pages/MisPublicaciones";
import ProductoForm from "../pages/ProductoForm";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<LayoutMain />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/miperfil" element={<MiPerfil />} />
        <Route path="/mispublicaciones" element={<MisPublicaciones />} />
        <Route path="/nuevo" element={<ProductoForm />} />
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
