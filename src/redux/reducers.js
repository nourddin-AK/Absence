const initialState = {
  Groups: [
    { idg: 1, N_filier: 'Development digital', name: 'Dev101', annee: '1eme', Ng: 1 },
    { idg: 2, N_filier: 'Rizo', name: 'Rizo201', annee: '2eme', Ng: 1 },
    { idg: 3, N_filier: 'Gestion', name: 'Gestion301', annee: '3eme', Ng: 1 },
    { idg: 4, N_filier: 'Genie Civil', name: 'civil101', annee: '1eme', Ng: 1 },
    { idg: 5, N_filier: 'Assistant Administratif', name: 'AA201', annee: '2eme', Ng: 1 },
    { idg: 6, N_filier: 'Assistant Administratif', name: 'AA201', annee: '2eme', Ng: 2 },
    { idg: 7, N_filier: 'Gestion Comptabilite', name: 'GCF301', annee: '3eme', Ng: 1 },
    { idg: 8, N_filier: 'Gestion Comptabilite', name: 'GCF301', annee: '3eme', Ng: 2 }
  ],
  Stageirs: [
    { Cef: 1472008, idg: 1, nom: 'Rami', prenom: 'khlid', Number_absence: 0 },
    { Cef: 647208, idg: 4, nom: 'khlili', prenom: 'Ayman', Number_absence: 0 },
    { Cef: 7472248, idg: 1, nom: 'Akfas', prenom: 'Toufik', Number_absence: 0 },
    { Cef: 2147209, idg: 4, nom: 'Lidrissi', prenom: 'Brahim', Number_absence: 0 },
    { Cef: 1779038, idg: 7, nom: 'Mouh', prenom: 'Lwali', Number_absence: 0 },
    { Cef: 1172965, idg: 2, nom: 'Mouhimi', prenom: 'Yassin', Number_absence: 0 },
    { Cef: 1272098, idg: 3, nom: 'Al bidaoui', prenom: 'Karim', Number_absence: 0 },
    { Cef: 14772488, idg: 5, nom: 'Bouhoch', prenom: 'Mrabih', Number_absence: 0 },
    { Cef: 9572068, idg: 6, nom: 'Rami', prenom: 'khlid', Number_absence: 0 },
    { Cef: 1842038, idg: 8, nom: 'Souaya', prenom: 'Badr', Number_absence: 0 }
  ],
  Absences: [
    {id: 21213,Cef: 1472008,Date: '2025-01-29',type: 'retard',isJustified: false},
    {id: 5275275,Cef: 2147209,Date: '2025-01-30',type: 'absence',isJustified: false},

  ]
};

const group = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ABSENCE':
      return {
        ...state,
        Absences: [...state.Absences, action.payload]
      };

    case 'UPDATE_ABSENCE':
      return {
        ...state,
        Absences: state.Absences.map(absence =>
          absence.id === action.payload.id ? action.payload : absence
        )
      };

    case 'DELETE_ABSENCE':
      return {
        ...state,
        Absences: state.Absences.filter(absence => absence.id !== action.payload)
      };

    default:
      return state;
  }
};

export default group;
