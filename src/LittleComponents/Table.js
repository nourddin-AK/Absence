import { ChevronsUpDown } from "lucide-react";
import DropDownMenu from "./DropDownMenu"
import { useState } from "react";
export default function Table ({columns,data,setItem,item,children,dropDown}){
    const [sortedBy,setSortedBy] = useState({col:'',mode:'ASC'})
    const keys = columns.map(col=> col.accessor);


    const changeCol = (col)=>{
      setSortedBy (prev => prev.col === col ? {...prev,mode: prev.mode === 'ASC' ? 'DESC' : 'ASC'}: {col:col,mode :'ASC'})
    }
    function number (a,b) {
      return sortedBy.mode === 'ASC' ? a - b : b - a
    }
    function  strings (a,b){
      const nameA = String(a).toLowerCase(); // ignore upper and lowercase
      const nameB = String(b).toLowerCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return sortedBy.mode === 'ASC' ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortedBy.mode === 'ASC' ? 1 : -1;
      }
    
      // names must be equal
      return 0;
    }
    const sortedData = data.sort((a,b)=> isNaN(a[sortedBy.col]) ? strings(a[sortedBy.col],b[sortedBy.col]) : number(a[sortedBy.col],b[sortedBy.col]))
    
    return (
        <table className="min-w-full max-w-4xl  divide-y divide-gray-100  dark:divide-gray-500 rounded-lg table-auto">
          <thead>
            <tr className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-50">
            {
                columns.map(
                    (col,index)=> 
                    <th key={index} scope="col" className={`lg:px-3 lg:py-3  px-2 py-2 text-start text-xs xl:text-nowrap text-wrap   uppercase font-medium lg:font-semibold  gap-1`}>
                    <span className="flex items-center gap-1">
                      {col.colName}
                      <button onClick={()=>changeCol(col.accessor)}><ChevronsUpDown size={16} className="hover:text-gray-600 dark:hover:text-gray-200"/></button>
                    </span>
                    </th>
                )
                
            }
            <th className="lg:px-3 lg:pl-0 lg:py-3 px-2 py-2 text-end text-xs  uppercase font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-500 dark:bg-gray-800 ">
          {
            sortedData.map((t,index) =>
                <tr className={`hover:bg-gray-100 even:bg-gray-50 text-gray-700 dark:text-gray-50 dark:even:bg-gray-900 dark:hover:bg-gray-600  ${index === sortedData.length - 1  && ' rounded-b-lg'}`} key={index}>
                    {
                      keys.map (
                        key => Array.isArray(t[key]) ?
                          <td className="px-3 py-1 lg:px-5   whitespace-nowrap  text-xs md:text-sm  font-medium  flex gap-1 flex-wrap items-center">
                           {
                            t[key].map((g,index)=> <span key={g+index} className="border rounded-lg px-1 py-1  text-xs dark:border-purple-300 dark:bg-purple-700">{g}</span>)
                           }
                          </td>
                            :<td className="px-3 py-1 lg:px-5   whitespace-nowrap text-xs md:text-sm ">{t[key]}</td>
                      )
                    }
                    <td className="px-6 py-1  whitespace-nowrap text-end text-sm font-medium">
                    {
                      dropDown ?
                      <DropDownMenu 
                        item  = {t}
                        setSelectedItem={setItem}
                        selectedItem={item}
                        
                      >
                      {children}
                      </DropDownMenu>
                      : children 

                    }
                      

                    </td>
                  </tr>
          )}
            
          </tbody>
        </table>
    )
}