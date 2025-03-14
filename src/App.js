import { useState } from "react";
import { Route,Routes } from "react-router-dom";
//layout
import SideBar from "./Dashboard/SideBar";
import Header from "./Dashboard/Header";

import Dashboard from "./Dashboard/Dashboard";
import Group from "./Pages/Group";
import Duree from "./Pages/Durree";
import Listabsence from "./Pages/ListAbsence";
import AdminProfile from "./Admin/AdminProfile";
import Schedule from "./Schedule/Schedule";





function App() {
  const [isOpen,setIsOpen] = useState(false);
  const [theme,setTheme] = useState(localStorage.getItem('theme') || 'light');
  localStorage.setItem('theme',theme)
  
  
  return (
    <div className={`App ${theme }`} >
      <div className="h-screen bg-white dark:bg-gray-800">
      {/* Main layout container */}
      <div className="flex h-full ">
        {/* Sidebar */}
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} darkMode={theme} setDarkMode={setTheme} />
        <div className={`p-8 pl-0 py-4 w-full  overflow-x-hidden lg:mx-auto ${isOpen ? 'lg:ml-64' : 'ml-20 lg:ml-24'}`}>
        <Header theme={theme} setTheme={setTheme}/>
        
        <Routes>
        <Route path="/" element={<Dashboard />} />
            <Route path="/groups" element={<Group />} />
            <Route path="/duree/:groupId/:duree" element={<Duree />} />
            <Route path="/listabsence/:absenceId/:duree" element={<Listabsence />} />
            <Route path="/AdminProfile" element={<AdminProfile />} />
            <Route path="/schedule" element={<Schedule />}/>

        </Routes>

        </div>

      </div>
    </div>
    </div>
  );
}

export default App;
