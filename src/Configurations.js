export const   AMconfig = {
    name : 'absence Manager',
    searchBy : ['matricule','name'],
    filterBy : ['gender','age'],
    resetPassword : true,
    dropDown : true,
    profile : false,
    links:{
      edit:'editUser'
    },
    moreInfo : false
   
  }

export const Tconfig = {
    name : 'teacher',
    searchBy : ['matricule','name'],
    filterBy : ['gender','age'],
    resetPassword : true,
    dropDown : true,
    profile : false,
    links:{
      edit:'editUser'
    },
    moreInfo : true
  }

 export const Sconfig = {
    name : 'student',
    searchBy : ['cef','name'],
    filterBy : ['gender','group','age','totalAbsence'],
    resetPassword : false,
    dropDown : true,
    profile : true,
    links:{
      profile : 'studentProfile',
      edit:'editStudent'
    },
    moreInfo : false
  }

 export const Gconfig = {
    name : 'group',
    searchBy : ['libel'],
    filterBy : ['filiere','year','totalAbsence'],
    resetPassword : false,
    dropDown : true,
    profile : true,
    links:{
      profile : 'groupProfile',
      edit:'editGroup'
    },
    moreInfo : true,

  }

export  const Fconfig = {
    name : 'filiere',
    searchBy : ['libel'],
    filterBy : ['niveau','totalAbsence'],
    resetPassword : false,
    dropDown : true,
    profile : true,
    links:{
      profile : 'filiereProfile',
      edit:'editFiliere'
    },
    moreInfo : false
  }
    