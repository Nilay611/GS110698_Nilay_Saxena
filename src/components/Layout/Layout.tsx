import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

function Layout() {
  return (
    <main className="body-container text-roboto w-screen h-screen">
      <Navbar />
      <div className="main-container w-full h-full flex flex-row justify-between">
        <Sidebar />
        <div className="flex-grow p-4">
          <Outlet />
          {/* using outlet so that the four components can be rendered inside this div instead of rendering in a new page */}
        </div>
      </div>
    </main>
  );
}

export default Layout;
