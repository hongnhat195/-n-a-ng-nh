import React, { useEffect,useState } from "react";
import { Footer, Header,Sidebar,Home } from "../components";
import store from "../redux/store";
import { loadUser } from "../redux/auth/authSlice";
function ControlDevice(props) {
  useEffect(() => store.dispatch(loadUser()), []);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main style={{paddingLeft:"20px"}}>
          <Home/>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default ControlDevice;