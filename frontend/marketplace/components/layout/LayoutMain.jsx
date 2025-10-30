import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";

export default function LayoutMain() {

  const {logout, isAuthenticated} = useAuth()

  return (
    <div className="layout">
      <Header logout={logout} isAuthenticated={isAuthenticated}/>
      <main className="layout_main">
        <Outlet />
      </main>
    </div>
  );
}
