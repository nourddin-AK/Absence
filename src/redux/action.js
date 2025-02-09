
export const addAbsence = (absence) => ({
  type: 'ADD_ABSENCE',
  payload: absence
});

export const updateAbsence = (absence) => ({
  type: 'UPDATE_ABSENCE',
  payload: absence
});

export const deleteAbsence = (id) => ({
  type: 'DELETE_ABSENCE',
  payload: id
});
