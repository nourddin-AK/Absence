import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { SearchIcon,XOctagon} from 'lucide-react';
import {  Groups } from '../Users'; // Import Groups from Users


export default function Dashboard (){
 

  const [value, setValue] = useState('');
 
  const [focus,setFocus] = useState(false)
 

  const [section,setSection]= useState('All')
  const [filter,setFilter]= useState('All')
  const [selectedGroup,setSelectedGroup] = useState(null)


  




  

  
  const filterdData = filter === 'All' ? Groups.filter(group => group.name.toLowerCase().startsWith(value.toLowerCase())) : Groups.filter(group=> group.annee === filter && group.name.toLowerCase().startsWith(value.toLowerCase()))
  const handleClick = (fi)=>{
     setSection(fi)
     setFilter(fi)
  }
const duration =[
  {
    duree : 2.5,
   

  },
  {
    duree : 5,
  

  }
]
  //tabs style
const activeStyle = 'border-b-purple-600 text-purple-600 ';
   const desactiveStyle = 'border-b-gray-300 text-gray-300 dark:border-b-gray-500 dark:text-gray-500'

  return (
    <div className="container mx-auto mt-5 p-4 h-screen   text-gray-700 dark:text-gray-50 duration-0">
    <div className='mb-4 '>
      <div className={`flex px-2 py-1 rounded-md border ${focus ? 'border-gray-700 dark:border-gray-50' : 'dark:border-gray-600'}  text-gray-700 dark:text-gray-50 items-center gap-2 w-1/3 mx-auto `} onClick={()=>setFocus(true)}>
        <SearchIcon size={18} className={` ${focus ? 'text-gray-700 dark:text-gray-50' : 'text-gray-400  dark:text-gray-600'}`}/>
        <input 
          type='text' 
          className=' outline-none  bg-transparent px-3 py-2' 
          placeholder='search by group libel'
          onFocus={()=>setFocus(true)}
          onBlur={()=>setFocus(false)}
          onChange={({target})=>setValue(target.value)}
          />
      </div>
    </div>
      {/* <div className="flex gap-4 mb-10 items-center justify-center">
        <div className="relative">
          <AutoComplete
            value={value}
            suggestions={items}
            completeMethod={searchItems}
            field="name"
            onChange={handleInputChange}
            placeholder="Search by Group Name"
            className="border border-gray-400 dark:border-gray-600 rounded-lg shadow-sm p-2 text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 outline-none"
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
      </div> */}
      {/* tabs */}
      <div className="flex items-center justify-start gap-1 mb-8 ">
           <button onClick={()=>handleClick('All')} className={`  border-b-2   px-3 py-1   text-lg font-medium ${section === 'All' ? activeStyle : desactiveStyle}`}>All 10</button>
           <button onClick={()=>handleClick('first year')}  className={`   border-b-2 px-3 py-1 text-lg font-medium  ${section === 'first year' ? activeStyle : desactiveStyle}`}>First Year 2</button>
           <button onClick={()=>handleClick('second year')}  className={`   border-b-2 px-3 py-1 text-lg font-medium   ${section === 'second year' ? activeStyle : desactiveStyle}`}>Second Year 5</button>
           <button onClick={()=>handleClick('third year')}  className={`   border-b-2 px-3 py-1 text-lg font-medium ${section === 'third year' ? activeStyle : desactiveStyle}`}>Third Year 3</button>
           </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueGroups.map((filiere) => (
          <div
            key={filiere.annee}
            className={` shadow-lg h-full rounded-lg cursor-pointer`}
            onClick={() => scrollToGroup(filiere.annee)}
          >
            <div className=" text-center p-4">
              <h4 className="text-xl font-semibold">{filiere.annee} Année</h4>
              <h6>Number of Groups</h6>
              <h3 className="text-2xl font-bold">{Numbyannee[filiere.annee]}</h3>
            </div>
          </div>
        ))}
      </div> */}
      {
        filterdData.length ? 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {
       
        filterdData.map(d=>
         
            
                  <div
                    key={d.idg}
                    className={`border border-gray-300 dark:border-gray-500 bg-gray-100 h-full rounded-lg cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-purple-50 `}
                    onClick={() => setSelectedGroup(d)}
                  >
                    <div className=" px-3 py-2 text-purple-700 dark:text-purple-500 ">
                      <div className='flex items-center justify-between mb-3'>
                      <h5 className="text-sm font-semibold ">{d.N_filier}</h5>
                      <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-300">{d.annee}</h2>
                      </div>
                     
                      <h1 className="text-3xl font-bold">{d.name}</h1>
                     
                      
                    </div>
                  </div>
        )
      }
      </div>
      :
      <p>No group found with this name in {filter} groups. Please check your spelling or try a different name</p>

      }
     
      {selectedGroup && 
        <div className="fixed top-0 left-0 right-0 bottom-0 min-h-screen min-w-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="dark:bg-gray-600 text-gray-700 bg-gray-50 dark:text-gray-50 border-gray-300 dark:border-gray-500 rounded-lg  shadow-lg p-4 max-w-md w-full">
          <div className="flex justify-between items-center mb-2 gap-4">
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-50">{selectedGroup.name}</h2>
            <button 
              onClick={() => setSelectedGroup(null)} 
              className="text-gray-500 hover:text-red-700 dark:text-gray-400 dark:hover:text-red-500"
            >
              <XOctagon size={20} />
            </button>
          </div>
          
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-50 text-center mb-3">
            Choose the time
          </h4>
      
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 2.5 Hour Session */}
            {
              duration.map (
                d =>
                  <Link
                  to={`/duree/${selectedGroup.idg}/${d.duree}`}
              className="cursor-pointer transform transition duration-300 hover:scale-102"
             
            >
              <div className="bg-purple-100 text-purple-700 dark:text-purple-200 dark:bg-purple-700 hover:bg-purple-200 dark:hover:bg-purple-600 rounded-md p-3 text-center shadow-sm h-32 flex flex-col justify-center">
                <h5 className="text-base font-medium">La séance de</h5>
                <h1 className="text-3xl font-bold ">{d.duree}</h1>
                <h2 className="text-lg font-medium">Heures</h2>
              </div>
            </Link>
              )
            }

          </div>
        </div>
      </div>
      }
     

      {/* {value.trim() !== '' && filteredGroups.length > 0 && (
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
      )} */}
    </div>
  );
};