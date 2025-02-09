import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from './pages/Menu';
import Nav from './pages/nav';
import Dashboard from "./pages/Dashboard";
import Duree from "./pages/duree";
import Listabsence from "./pages/listabsence";
import AdminProfile from "./Admin/AdminProfile"
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={`h-screen ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="flex h-full">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <div className={`p-8 pl-0 py-4 w-full transition-all duration-0 overflow-x-hidden lg:mx-auto ${isOpen ? 'lg:ml-64' : 'ml-20 lg:ml-24'}`}>

          <Nav  theme={theme} setTheme={setTheme}/>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/duree" element={<Duree />} />
            <Route path="/listabsence" element={<Listabsence />} />
            <Route path="/AdminProfile" element={<AdminProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
