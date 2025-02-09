import {   School,LayoutGrid, ClipboardList, ChevronRight,ClipboardCopy} from 'lucide-react';

import { NavLink } from 'react-router-dom';

const links = [
  { pageName: 'Dashboard', pageLink: '/', icon: <LayoutGrid size={16} /> },
  { pageName: 'Past Absence', pageLink: '/listabsence', icon: <ClipboardCopy size={16} /> },
  { pageName: 'Groups', pageLink: '/groups', icon: <School size={16} /> },
];

export default function SideBar({ isOpen, setIsOpen, darkMode, setDarkMode }) {
  return (
    <div className={`bg-gray-50 shadow-lg p-4 fixed z-50 h-svh ${isOpen ? 'w-56' : 'w-fit'} dark:bg-gray-900`}>
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6 pt-1 pb-4 border-b text-gray-700 dark:text-gray-50">
        <ClipboardList size={24} />
        {isOpen && <h2 className="text-xl font-bold">AttendWise</h2>}
      </div>

      {/* Sidebar Toggle Button */}
      <button 
        className="absolute top-4 -right-4 bg-purple-100 px-1 rounded-xl border-2 border-purple-300 text-purple-700" 
        onClick={() => setIsOpen(!isOpen)}
      > 
        <ChevronRight size={20} className={` ${isOpen && 'rotate-180'}`} />
      </button>

      {/* Navigation Menu */}
      <nav className="flex flex-col justify-between gap-2">
        <div className='flex flex-col gap-2'>
          {links.map(link => (
            <NavLink 
              to={link.pageLink} 
              key={link.pageName} 
              className={`flex text-sm items-center gap-3 px-2 py-2 rounded hover:bg-purple-50 text-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 font-semibold`}
            >
              {link.icon}
              {isOpen && <span>{link.pageName}</span>}
            </NavLink>
          ))}
        </div>


      </nav>
    </div>
  );
}
