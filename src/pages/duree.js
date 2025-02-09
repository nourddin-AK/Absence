import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addAbsence } from '../redux/action';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './index.css';

const Duree = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const groupId = queryParams.get('group');
  const duree = queryParams.get('duree'); // Get the duree value
  const Stageirs = useSelector((state) => state.Stageirs);
  const Groups = useSelector((state) => state.Groups);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tynav,settynav]=useState('');
  useEffect(() => {
    if (duree === 'false') {
      settynav('go');
    } else {
      settynav('dont');
    }
  }, [duree]);
  // Filter stagiaires by group
  const filteredStagiaires = Stageirs.filter(
    (stagiaire) => stagiaire.idg.toString() === groupId
  );

  // Initialize absenceData with "Present" as the default for each stagiaire
  const [absenceData, setAbsenceData] = useState(
    () =>
      filteredStagiaires.reduce((acc, stagiaire) => {
        acc[stagiaire.Cef] = {
          firstSeance: {
            Cef: stagiaire.Cef,
            Date: new Date().toISOString(),
            type: 'Present',
            isJustified: false,
          },
          secondSeance: {
            Cef: stagiaire.Cef,
            Date: new Date().toISOString(),
            type: 'Present',
            isJustified: false,
          },
        };
        return acc;
      }, {})
  );

  const [firstSeanceEnabled, setFirstSeanceEnabled] = useState(true);
  const [secondSeanceEnabled, setSecondSeanceEnabled] = useState(false);

 

  const group = Groups.find((group) => group.idg.toString() === groupId);

  // Handle radio button change
  const handleRadioChange = (cef, type, seance) => {
    setAbsenceData((prev) => ({
      ...prev,
      [cef]: {
        ...prev[cef],
        [seance]: {
          ...prev[cef][seance],
          type: type,
        },
      },
    }));
  };

  // Handle form submission for the first seance
  const handleSubmitFirstSeance = (e) => {
    e.preventDefault();
    filteredStagiaires.forEach((stagiaire) => {
      const absence = absenceData[stagiaire.Cef]?.firstSeance;
      if (absence && absence.type) {
        dispatch(addAbsence(absence));
        
      }
      
    });
    setFirstSeanceEnabled(false);
    setSecondSeanceEnabled(true);
    alert('All absences valid !');
    console.log(duree);
    tynav ==="go" && navigate('/')
    
  };

  // Handle form submission for the second seance
  const handleSubmitSecondSeance = (e) => {
    e.preventDefault();
    filteredStagiaires.forEach((stagiaire) => {
      const absence = absenceData[stagiaire.Cef]?.secondSeance;
      if (absence && absence.type) {
        dispatch(addAbsence(absence));
      }
    });
    setSecondSeanceEnabled(false);
    alert(' absences valid !');
    tynav ==="dont" && navigate('/')
  };

  // Reset absence data
  const handleReset = () => {
    setAbsenceData(
      filteredStagiaires.reduce((acc, stagiaire) => {
        acc[stagiaire.Cef] = {
          firstSeance: {
            Cef: stagiaire.Cef,
            Date: new Date().toISOString(),
            type: 'Present',
            isJustified: false,
          },
          secondSeance: {
            Cef: stagiaire.Cef,
            Date: new Date().toISOString(),
            type: 'Present',
            isJustified: false,
          },
        };
        return acc;
      }, {})
    );
    setFirstSeanceEnabled(true);
    setSecondSeanceEnabled(false);
  };

  const actionTemplate = (rowData, seance) => {
    const isDisabled = seance === 'firstSeance' ? !firstSeanceEnabled : !secondSeanceEnabled;
    return (
<div className="radio-group d-flex gap-3 align-items-center flex justify-between">
  <div className="form-check">
    <input
      type="radio"
      className={`form-check-input custom-radio ${absenceData[rowData.Cef]?.[seance]?.type === 'retard' ? 'radio-orange' : ''}`}
      id={`retard-${rowData.Cef}-${seance}`}
      value="retard"
      onChange={() => handleRadioChange(rowData.Cef, 'retard', seance)}
      checked={absenceData[rowData.Cef]?.[seance]?.type === 'retard'}
      disabled={isDisabled}
    />
    <label
      className={`form-check-label ${absenceData[rowData.Cef]?.[seance]?.type === 'retard' ? 'label-orange' : ''}`}
      htmlFor={`retard-${rowData.Cef}-${seance}`}
    >
      Retard
    </label>
  </div>
  <div className="form-check">
    <input
      type="radio"
      className={`form-check-input custom-radio ${absenceData[rowData.Cef]?.[seance]?.type === 'absence' ? 'radio-red' : ''}`}
      id={`absence-${rowData.Cef}-${seance}`}
      value="absence"
      onChange={() => handleRadioChange(rowData.Cef, 'absence', seance)}
      checked={absenceData[rowData.Cef]?.[seance]?.type === 'absence'}
      disabled={isDisabled}
    />
    <label
      className={`form-check-label ${absenceData[rowData.Cef]?.[seance]?.type === 'absence' ? 'label-red' : ''}`}
      htmlFor={`absence-${rowData.Cef}-${seance}`}
    >
      Absence
    </label>
  </div>
  <div className="form-check">
    <input
      type="radio"
      className={`form-check-input custom-radio ${absenceData[rowData.Cef]?.[seance]?.type === 'Present' ? 'radio-green' : ''}`}
      id={`Present-${rowData.Cef}-${seance}`}
      value="Present"
      onChange={() => handleRadioChange(rowData.Cef, 'Present', seance)}
      checked={absenceData[rowData.Cef]?.[seance]?.type === 'Present'}
      disabled={isDisabled}
    />
    <label
      className={`form-check-label ${absenceData[rowData.Cef]?.[seance]?.type === 'Present' ? 'label-green' : ''}`}
      htmlFor={`Present-${rowData.Cef}-${seance}`}
    >
      Present
    </label>
  </div>
</div>



    );
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-xl font-bold mb-4">
        Stagiaires List for Group: {group ? `${group.name} (GP ${group.Ng})` : 'Unknown Group'}
      </h2>
      {filteredStagiaires && filteredStagiaires.length > 0 ? (
        <div className="table-responsive " style={{ borderRadius:'red'}}>
          {/* First Seance or Second Seance based on duree */}
          {duree !== 'false' ? (
            <>
              {/* First Seance */}
              <form
                onSubmit={firstSeanceEnabled ? handleSubmitFirstSeance : handleSubmitSecondSeance}
                className="p-4 rounded-2xl shadow-lg bg-gray-50 dark:bg-gray-800"
                style={{
                    width: '100%',
                }}
              >
            <h4 className="text-center mb-4">
              Manage Absences: {firstSeanceEnabled ? 'First Seance' : 'Second Seance'}
            </h4>

            <div className=" ">
            <DataTable
              value={filteredStagiaires}
              showGridlines
              tableStyle={{
                minWidth: '50rem',
                border: '1px solid',
                borderRadius:"20px"
              }}
              paginator
              rows={40}
              className="table border-black dark:text-white table-hover "
            >
                <Column
                className=' border-b-2 border-collapse '
                  header="#"
                  body={(rowData, { rowIndex }) => rowIndex + 1}
                  style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px',borderRight:"2px solid"}}
                  
                />
                <Column
                className='border-b-2 border-collapse '
                  field="nom"
                  header="Nom"
                  style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px',borderRight:"2px solid" }}
                />
                <Column
                className=' border-b-2 border-collapse '
                  field="prenom"
                  header="Prénom"
                  style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px',borderRight:"2px solid" }}
                />

                <Column
                className='border-b-2  border-collapse '
                  body={(rowData) => actionTemplate(rowData, 'firstSeance')}
                  header="First Seance"
                  style={{
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    padding: '10px',
                    borderRight:"2px solid"
                  }}
                />
                <Column
                  className='border-b-2 border-collapse '
                  body={(rowData) => actionTemplate(rowData, 'secondSeance')}
                  header="Second Seance"
                  style={{
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    padding: '10px', 
                   borderRight:"2px solid"
                  }}
                />
              </DataTable>
            </div>

            <div className="mt-4 d-flex justify-content-between">
            <button
              type="submit"
              className={`px-6 py-2 text-white rounded-lg focus:outline-none ${firstSeanceEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!firstSeanceEnabled}
            >
              Submit First Seance
            </button>
            <button
              type="submit"
              className={`px-6 py-2 text-white rounded-lg focus:outline-none ${secondSeanceEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!secondSeanceEnabled}
            >
              Submit Second Seance
            </button>

            </div>
          </form>


              
            </>
          ) : (
            //one seance 
            <form
                onSubmit={handleSubmitFirstSeance }
                className="p-4  mx-auto rounded-xl shadow-lg bg-gray-100 dark:bg-gray-800 text-black "
                style={{ width: '100%' }}
            >
            <h4 className="text-center text-black dark:text-white mb-4">
              Manage Absences: {firstSeanceEnabled ? 'First Seance' : 'Second Seance'}
            </h4>

            <div className="">
            <DataTable
              value={filteredStagiaires}
              showGridlines
              tableStyle={{
                minWidth: '25rem',
                borderCollapse: "",
                border: '1px solid', 
                borderRadius:"20px"
              }}
              paginator
              rows={40}
              className="table border-black dark:border dark:text-white table-hover"
            >
                <Column
                className=' border-b-2 border-collapse  '
                  header="#"
                  body={(rowData, { rowIndex }) => rowIndex + 1}
                  style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px',borderRight:"2px solid"}}
                />
                <Column
                  className='border-b-2 border-collapse '
                  field="nom"
                  header="Nom"
                  style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px',borderRight:"2px solid"}}
                />
                <Column
                  className='border-b-2 border-collapse '
                  field="prenom"
                  header="Prénom"
                  style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px',borderRight:"2px solid"}}
                />

                <Column
                  className='border-b-2 border-collapse '
                  body={(rowData) => actionTemplate(rowData, 'firstSeance')}
                  header="First Seance"
                  style={{
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    padding: '10px',
                    borderRight:"2px solid",
                    justifyContent:"space-between"
                  }}
                />
              </DataTable>
            </div>

            <div className="mt-4 d-flex justify-content-between">
            <button
              type="submit"
              className={`px-6 py-2 text-white rounded-lg focus:outline-none ${firstSeanceEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!firstSeanceEnabled}
            >
              Submit First Seance
            </button>
              
            </div>
          </form>
          )}

 {/* Reset Button */}
      <button
        className="m-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        type="button"
        onClick={handleReset}
      >
        Reset
      </button>

        </div>
      ) : (
        <p className="text-center">No stagiaires found for this group.</p>
      )}
    </div>
  );
};

export default Duree;

