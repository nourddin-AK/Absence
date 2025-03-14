import { useState } from "react";
import {  Filter} from "lucide-react";
import {useTableContext} from '../Context'
import {sortList} from '../HelperFunctions'

import {useMemo} from 'react';
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import DeleteModal from "./DeleteModal";
import ResetPasswordModal from "./ResetPasswordModal";
import MoreInfoModal from "./MoreInfoModal";
import FilterSection from "./Filter";
import Theader from './Theader'
import Tbody from './Tbody'




export default function Table ({columns,dataset,config}){
  const {name,searchBy,filterBy} = config
  //modals
  const modals = {
    'delete' : <DeleteModal config={{target:name,alerted : (name=== 'group' || name === 'filiere')}} />,
    'reset' :  <ResetPasswordModal  topic={name}/>,
    'moreInfo' : <MoreInfoModal config={config}/>
  }

   
  const [searchTerm,setSearchTerm] = useState('')
  const [filterTerms,setFilterTerms] = useState({})
   const onSearch = (value)=> setSearchTerm(value)


 const displayedData = useMemo(()=>{
  
      
      return  dataset.filter(item => {
        //search function
        const searchedList =  searchBy.some(col => String(item[col]).toLowerCase().includes(searchTerm) ) 
        // filter function
        const filtredList =  Object.keys(filterTerms).every(key => {
   
           if (key === 'minAge') {
               return item.age >= filterTerms.minAge;
           }
           if (key === 'maxAge') {
               return item.age <= filterTerms.maxAge;
           }
           if (key === 'minTotalAbsence') {
               return item.totalAbsence >= filterTerms.minTotalAbsence;
           }
           if (key === 'maxTotalAbsence') {
               return item.totalAbsence <= filterTerms.maxTotalAbsence;
           }
          
           // Otherwise, do a simple equality check
           return item[key] === filterTerms[key];
       });
       return searchedList && filtredList
   });
   
 },[filterTerms,searchTerm,dataset,searchBy])


 

  
 
  const {activeModal} = useTableContext();
 

  const [focus,setFocus]=  useState ({
    filterFocus : false,
    searchFocus : false,
  })
  



  //sorting functions
  const [sortedBy,setSortedBy] = useState({col:'',mode:'ASC'})
    const changeCol = (col)=>{
      setSortedBy (prev => prev.col === col ? {...prev,mode: prev.mode === 'ASC' ? 'DESC' : 'ASC'}: {col:col,mode :'ASC'})
    }
    const sortedData = displayedData.sort((a,b)=> sortList(a,b,sortedBy))
    
    return (
   
      <div className=" min-w-full max-w-5xl inline-block align-middle rounded-lg border divide-y divide-gray-100 relative dark:divide-gray-500 dark:border-gray-500">
       <div className="p-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
          <SearchBar  columnNames={searchBy} searchTerm={searchTerm} handleChange={onSearch} isFocus={focus.searchFocus} setIsFocus={setFocus} />
          <button className={`relative flex items-center gap-2 rounded-md px-3 py-1.5 border  ${focus.filterFocus ? 'border-gray-700 dark:border-gray-50 text-gray-700 dark:text-gray-50' : 'dark:border-gray-500 text-gray-300  dark:text-gray-500'}`} onClick={()=>setFocus({...focus,filterFocus: !focus.filterFocus})}>
            <Filter size={16}/>
            <span>Filters</span>
            <span className={`${Object.keys(filterTerms).length ? 'dark:text-gray-200 bg-purple-200 text-purple-700  dark:bg-purple-500 ' : 'text-gray-300 dark:text-gray-400 bg-gray-50  dark:bg-gray-700 '} ${focus.filterFocus && 'border-gray-700 dark:border-gray-50' }  text-sm font-medium absolute -top-1 -right-2 size-5 rounded-lg flex items-center justify-center`}>{Object.keys(filterTerms).length }</span>
          </button>
          </div>
          <Pagination />
       </div>
       {
        focus.filterFocus && <FilterSection  filterBy={filterBy} setFilterTerms={setFilterTerms} filterTerms={filterTerms}/>
        
       }
       {
        sortedData.length ? 
        <table className="min-w-full max-w-4xl  divide-y divide-gray-100  dark:divide-gray-500 rounded-lg table-auto">
          {/* Table header */}
          <Theader columns={columns} change={changeCol} />
          <Tbody data={sortedData} config={config} columns={columns}/>
        </table>
        :
        <p className="p-3 text-center text-sm font-medium text-gray-300 dark:text-gray-400">`No results found. Try adjusting your search or filter criteria.`</p>

       }
       
    
      {

        activeModal  && modals[activeModal]

      }
    </div>
   
       
    )
}