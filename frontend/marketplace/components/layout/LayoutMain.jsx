import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function LayoutMain() {
  return (
    <div className="layout">
      <Header />
      <main className="layout_main">
        <Outlet />
      </main>
    </div>
  );
}
