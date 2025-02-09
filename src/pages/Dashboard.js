import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AutoComplete } from 'primereact/autocomplete';
import { Search } from 'lucide-react';
import { Groups } from '../Users'; // Import Groups from Users
import './index.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

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
    const newValue = e.value;
    setValue(newValue);

    if (newValue.trim() === '') {
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
  
    const foundGroups = Groups.filter((group) =>
      group.name.toLowerCase().includes(searchValueLower)
    );
  
    setFilteredGroups(foundGroups);
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
        <div className="relative">
          <AutoComplete
            value={value}
            suggestions={items}
            completeMethod={searchItems}
            field="name"
            onChange={handleInputChange}
            placeholder="Search by Group Name"
            className="border border-gray-400 dark:border-gray-600 rounded-lg shadow-sm p-2 text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 focus:outline-none"
            itemTemplate={(item) => (
              <li className="p-2 border-2 bg-gray-100 hover:bg-gray-200 cursor-pointer">{item}</li>
            )}
          />
        </div>

        <button
          onClick={handleSearchButtonClick}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition flex items-center gap-3"
        >
          Search <Search size={18} className="w-5 h-5" />
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

      {value.trim() !== '' && filteredGroups.length > 0 && (
        <div className="mt-12">
          <h2 className="text-center text-3xl font-bold mb-8">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <div
                key={group.idg}
                className={`card dd-${group.annee} shadow-lg h-full rounded-lg cursor-pointer dark:bg-gray-800`}
                onClick={() => navigate(`/groups?filier=${group.name}&group=${group.Ng}`)}
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
      )}

      {value.trim() === '' && !hasSearched && (
        <div>
          {uniqueGroups.map((filiere) => (
            <div id={filiere.annee} key={filiere.annee} className="mt-12 mb-12">
              <h2 className="text-center text-3xl font-bold mb-8">{filiere.annee} Année Groups</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Groups.filter((group) => group.annee === filiere.annee).map((group) => (
                  <div
                    key={group.idg}
                    className={`card dd-${group.annee} shadow-lg h-full rounded-lg cursor-pointer dark:bg-gray-800`}
                    onClick={() => navigate(`/groups?filier=${group.name}&group=${group.Ng}`)}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
