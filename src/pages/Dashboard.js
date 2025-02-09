import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AutoComplete } from 'primereact/autocomplete';
import { Search, XOctagon } from 'lucide-react';
import { Groups } from '../Users';
import './index.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const uniqueGroups = Groups.filter(
    (group, index, self) => index === self.findIndex((g) => g.annee === group.annee)
  );

  const Numbyannee = Groups.reduce((acc, group) => {
    acc[group.annee] = (acc[group.annee] || 0) + 1;
    return acc;
  }, {});

  const searchItems = (e) => {
    const query = e.query.toLowerCase();
    const filteredSuggestions = Groups.filter((group) =>
      group.name.toLowerCase().includes(query)
    ).map((group) => group.name);
    setItems(filteredSuggestions);
  };

  const handleInputChange = (e) => {
    setValue(e.value);
    if (e.value.trim() === '') {
      setFilteredGroups([]);
      setHasSearched(false);
    }
  };

  const handleSearchButtonClick = () => {
    const searchValueLower = value.toLowerCase().trim();
    if (searchValueLower === '') {
      setFilteredGroups([]);
      setHasSearched(false);
      return;
    }
    setFilteredGroups(Groups.filter((group) => group.name.toLowerCase().includes(searchValueLower)));
    setHasSearched(true);
  };

  const scrollToGroup = (annee) => {
    const groupSection = document.getElementById(annee);
    if (groupSection) {
      groupSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4 h-screen bg-gray-50 dark:bg-gray-800 text-black dark:text-white duration-0">
      <div className="flex gap-4 mb-10 items-center justify-center">
        <div className="relative w-full max-w-md">
          <AutoComplete
            value={value}
            suggestions={items}
            completeMethod={searchItems}
            onChange={handleInputChange}
            placeholder="Search by Group Name"
            className="w-full border border-gray-400 dark:border-gray-600 rounded-lg shadow-sm p-2 text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 focus:outline-none"
            inputClassName="w-full"
            dropdownClassName="bg-white dark:bg-gray-700"
            itemTemplate={(item) => (
              <li className="p-2 border-2 bg-gray-100 text-black hover:bg-gray-200 cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
                {item}
              </li>
            )}
          />
        </div>
        <button
          onClick={handleSearchButtonClick}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 flex items-center gap-2"
        >
          <Search size={18} /> Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueGroups.map((filiere) => (
          <div
            key={filiere.annee}
            className={`card dd-${filiere.annee} shadow-lg h-full rounded-lg cursor-pointer`}
            onClick={() => scrollToGroup(filiere.annee)}
          >
            <div className="card-body text-center p-4">
              <h4 className="text-xl font-semibold">{filiere.annee} Année</h4>
              <h6>Number of Groups</h6>
              <h3 className="text-2xl font-bold">{Numbyannee[filiere.annee]}</h3>
            </div>
          </div>
        ))}
      </div>

      {hasSearched ? (
        <div className="mt-12 mb-12">
          <h2 className="text-center text-3xl font-bold mb-8">
            {filteredGroups.length > 0 ? 'Search Results' : 'No Groups Found'}
          </h2>
          {filteredGroups.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <div
                  key={group.idg}
                  className={`card dd-${group.annee} shadow-lg h-full rounded-lg cursor-pointer dark:bg-gray-800`}
                  onClick={() => setSelectedGroup(group)}
                >
                  <div className="card-body text-center p-4">
                    <h5 className="text-xl font-semibold text-gray-700">{group.N_filier}</h5>
                    <h1 className="text-3xl font-bold">{group.name}</h1>
                    <h2 className="text-2xl font-semibold text-gray-500">G{group.Ng}</h2>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        uniqueGroups.map((filiere) => (
          <div id={filiere.annee} key={filiere.annee} className="mt-12 mb-12">
            <h2 className="text-center text-3xl font-bold mb-8">{filiere.annee} Année Groups</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Groups.filter((group) => group.annee === filiere.annee).map((group) => (
                <div
                  key={group.idg}
                  className={`card dd-${group.annee} shadow-lg h-full rounded-lg cursor-pointer dark:bg-gray-800`}
                  onClick={() => setSelectedGroup(group)}
                >
                  <div className="card-body text-center p-4">
                    <h5 className="text-xl font-semibold text-gray-700">{group.N_filier}</h5>
                    <h1 className="text-3xl font-bold">{group.name}</h1>
                    <h2 className="text-2xl font-semibold text-gray-500">G{group.Ng}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {selectedGroup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 min-h-screen min-w-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-500 rounded-lg shadow-lg p-4 max-w-md w-full">
            <div className="flex justify-between items-center mb-2 gap-4">
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-50">{selectedGroup.name}</h2>
              <button 
                onClick={() => setSelectedGroup(null)} 
                className="text-gray-500 hover:text-red-700 dark:text-gray-400 dark:hover:text-red-500"
              >
                <XOctagon size={20} />
              </button>
            </div>
            
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 text-center mb-3">
              Choose the time
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                className="cursor-pointer transform transition duration-300 hover:scale-102"
                onClick={() => navigate(`/duree?group=${selectedGroup.idg}&duree=false`)}
              >
                <div className="bg-violet-200 dark:bg-violet-400 hover:bg-violet-300 dark:hover:bg-violet-500 rounded-md p-3 text-center shadow-sm h-32 flex flex-col justify-center">
                  <h5 className="text-base font-medium text-gray-700 dark:text-gray-50">La séance de</h5>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">2.5</h1>
                  <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300">Heures</h2>
                </div>
              </div>

              <div
                className="cursor-pointer transform transition duration-300 hover:scale-102"
                onClick={() => navigate(`/duree?group=${selectedGroup.idg}&duree=true`)}
              >
                <div className="bg-violet-200 dark:bg-violet-400 hover:bg-violet-300 dark:hover:bg-violet-500 rounded-md p-3 text-center shadow-sm h-32 flex flex-col justify-center">
                  <h5 className="text-base font-medium text-gray-700 dark:text-gray-50">La séance de</h5>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">5</h1>
                  <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300">Heures</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;