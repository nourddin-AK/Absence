import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAbsence, deleteAbsence } from '../redux/action';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Trash2, FilePen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Alert from "../LittleComponents/Alert";
import DeleteModal from "../LittleComponents/DeleteModal";
import './index.css';

const Listabsence = () => {
  const dispatch = useDispatch();
  const Absence = useSelector((state) => state.Absences);
  const Stageirs = useSelector((state) => state.Stageirs);
  const Groups = useSelector((state) => state.Groups);

  const [selectedAbsenceId, setSelectedAbsenceId] = useState(null);
  const [activeModal, setActiveModal] = useState(false);
  const [LoadingDelete, setLoadingDelete] = useState(false);

  const navigate = useNavigate();

  const getGroupName = (Cef) => {
    const stageir = Stageirs.find(s => s.Cef === Cef);
    if (stageir) {
      const group = Groups.find(group => group.idg === stageir.idg);
      return group ? group.name : 'Unknown Group';
    }
    return 'Unknown Stageir';
  };

  const handleRadioChange = (Cef, newType) => {
    const updatedAbsence = Absence.find(a => a.Cef === Cef);
    if (!updatedAbsence) return;

    const newAbsence = { ...updatedAbsence, type: newType };
      dispatch(updateAbsence(newAbsence));
  };

  const getNomPrenomByCef = (Cef) => {
    const stageir = Stageirs.find(s => s.Cef === Cef);
    if (stageir) {
      const { nom, prenom } = stageir;
      return {
        nom: nom || 'Unknown Nom',
        prenom: prenom || 'Unknown Prénom'
      };
    }
    return { nom: 'Unknown Nom', prenom: 'Unknown Prénom' };
  };

  const handleDelete = async (id) => {
    setLoadingDelete(true);
    try {
      await dispatch(deleteAbsence(id));
      setLoadingDelete(false);
      setActiveModal(false);
      navigate('/');
    } catch (err) {
      setLoadingDelete(false);
    }
  };

  const actionTemplate = (rowData) => {
    const absence = Absence.find(a => a.Cef === rowData.Cef && a.Date === rowData.Date);
    if (!absence) return null;

    return (
      <div className="radio-group d-flex gap-3 align-items-center flex justify-between">
        <div className="form-check">
          <input
            type="radio"
            className={`form-check-input custom-radio ${absence.type === 'retard' ? 'radio-orange' : ''}`}
            id={`retard-${rowData.Cef}-${absence.Date}`}
            value="retard"
            onChange={() => handleRadioChange(rowData.Cef, 'retard')}
            checked={absence.type === 'retard'}
          />
          <label
            className={`form-check-label ${absence.type === 'retard' ? 'label-orange' : ''}`}
            htmlFor={`retard-${rowData.Cef}-${absence.Date}`}
          >
            Retard
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className={`form-check-input custom-radio ${absence.type === 'absence' ? 'radio-red' : ''}`}
            id={`absence-${rowData.Cef}-${absence.Date}`}
            value="absence"
            onChange={() => handleRadioChange(rowData.Cef, 'absence')}
            checked={absence.type === 'absence'}
          />
          <label
            className={`form-check-label ${absence.type === 'absence' ? 'label-red' : ''}`}
            htmlFor={`absence-${rowData.Cef}-${absence.Date}`}
          >
            Absence
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className={`form-check-input custom-radio ${absence.type === 'Present' ? 'radio-green' : ''}`}
            id={`Present-${rowData.Cef}-${absence.Date}`}
            value="Present"
            onChange={() => handleRadioChange(rowData.Cef, 'Present')}
            checked={absence.type === 'Present'}
          />
          <label
            className={`form-check-label ${absence.type === 'Present' ? 'label-green' : ''}`}
            htmlFor={`Present-${rowData.Cef}-${absence.Date}`}
          >
            Present
          </label>
        </div>
      </div>
    );
  };

  const uniqueAbsences = [...new Set(Absence.map(a => a.id))].map(id => Absence.find(a => a.id === id));

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("done!");
    navigate('/');
  };

  if (selectedAbsenceId) {
    const filteredAbsences = Absence.filter(absence => absence.id === selectedAbsenceId);

    return (
      <form className="p-4 mx-auto rounded-xl shadow-lg bg-gray-100 dark:bg-gray-800 text-black" style={{ width: '100%' }} onSubmit={handleSubmit}>
        <h4 className="text-center text-black dark:text-white mb-4">Manage Absences for Group ID: {selectedAbsenceId}</h4>

        <DataTable
          value={filteredAbsences}
          showGridlines
          tableStyle={{
            minWidth: '25rem',
            borderCollapse: "",
            border: '1px solid',
            borderRadius: "20px"
          }}
          paginator
          rows={40}
          className="table border-black dark:border text-white table-hover rounded-lg"
        >
          <Column
            header="#"
            body={(rowData, { rowIndex }) => rowIndex + 1}
            className='dark:border-b-2 dark:border'
            style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px', borderRight: "2px solid" }}
          />
          <Column
            body={(rowData) => getNomPrenomByCef(rowData.Cef).nom}
            header="Nom"
            className='dark:border-b-2 dark:border'
            style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px', borderRight: "2px solid" }}
          />
          <Column
            body={(rowData) => getNomPrenomByCef(rowData.Cef).prenom}
            header="Prénom"
            className='dark:border-b-2 dark:border'
            style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px', borderRight: "2px solid" }}
          />
          <Column
            body={(rowData) => actionTemplate(rowData)}
            header="First Seance"
            className='dark:border-b-2 dark:border'
            style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px', borderRight: "2px solid" }}
          />
        </DataTable>

        <div className="mt-4 d-flex justify-content-between">
          <button
            type="submit"
            className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-900 focus:ring-2 focus:ring-blue-400 focus:outline-none transition flex items-center gap-3"
            
          >
            Update <FilePen />
          </button>

          <button
            type="button"
            className="px-6 py-2 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-900 focus:ring-2 focus:ring-blue-400 focus:outline-none transition flex items-center gap-3"
            onClick={() => setActiveModal(true)}
            
          >
            <Trash2 size={18} className="me-2" />
            Delete
          </button>
        </div>

        {activeModal && (
          <DeleteModal
            topic="absence"
            selectedItem={Absence.find(absence => absence.id === selectedAbsenceId)}
            setSelectedItem={setSelectedAbsenceId}
            setActiveModal={setActiveModal}
            handleDelete={handleDelete}
          >
            <Alert msg={'Are you sure you want to delete this absence? This action cannot be undone.'} />
          </DeleteModal>
        )}
      </form>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center text-xl font-bold mb-4">Absence List</h1>
      <Alert msg={'Thos seances absences will be visible for 24 hours make sure to make action befor that'} />

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 lg:grid-cols-3 gap-6">
        {uniqueAbsences.map((absence) => (
          <div
            className="card shadow-lg h-full rounded-lg cursor-pointer"
            key={absence.id}
            onClick={() => setSelectedAbsenceId(absence.id)}
          >
            <div className="card-body text-center p-4">
              <h5 className="text-xl font-semibold text-gray-700">Absence ID: {absence.id}</h5>
              <p className="text-gray-600">
                <strong>Date:</strong> {absence.Date}<br />
                <strong>Group:</strong> {getGroupName(absence.Cef)}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Listabsence;