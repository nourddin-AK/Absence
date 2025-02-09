import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.css';

const Groups = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filier = queryParams.get('filier');
  const Ngroup = queryParams.get('group');
  const Groups = useSelector((state) => state.Groups);
  const navigate = useNavigate();

  useEffect(() => {
    if (!filier) {
      navigate('/');
    }
  }, [filier, navigate]);

  // Filter to show only the group that matches the parameters
  const filteredGroup = Groups.find(
    (group) => group.name === filier && (!Ngroup || group.Ng === parseInt(Ngroup))
  );

  return (
    <div className="container mx-auto mt-10 p-4">
      {filteredGroup ? (
        <>
          <h1 className="text-center text-3xl font-bold mb-8">
            Filier: {filteredGroup.name} {Ngroup ? `| Group: ${Ngroup}` : ''}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* 2.5 Hour Session */}
            <div
              key={filteredGroup.idg}
              className="cursor-pointer transform transition duration-300 hover:scale-102"
              onClick={() => navigate(`/duree?group=${filteredGroup.idg}&duree=false`)}
            >
              <div className="dis-seance1 shadow-lg rounded-lg p-6  dark:text-black text-center">
                <h5 className="text-xl font-semibold text-gray-700">La séance de</h5>
                <h1 className="text-4xl font-bold dark: ">2.5</h1>
                <h2 className="text-2xl font-semibold text-gray-500">Heures</h2>
              </div>
            </div>

            {/* 5 Hour Session */}
            <div
              key={filteredGroup.idg}
              className="cursor-pointer transform transition duration-300 hover:scale-102"
              onClick={() => navigate(`/duree?group=${filteredGroup.idg}&duree=true`)}
            >
              <div className="dis-seance2 shadow-lg rounded-lg p-6 dark:text-black text-center">
                <h5 className="text-xl font-semibold text-gray-700">La séance de</h5>
                <h1 className="text-4xl font-bold ">5</h1>
                <h2 className="text-2xl font-semibold text-gray-500">Heures</h2>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2 className="text-center text-gray-600 text-2xl font-semibold">Not found</h2>
      )}
    </div>
  );
};

export default Groups;
