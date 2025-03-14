import DropDownMenu from './DropDownMenu'
import { Link } from 'react-router-dom'
import { Trash2,SquareArrowOutUpRight,Edit,Expand,RefreshCcw } from 'lucide-react'
import { useTableContext } from '../Context'






export default function Tbody ({data,config,columns}){
    const {dropDown,resetPassword,links,profile,moreInfo,name} = config
    const {selectedItem,setActiveModal} = useTableContext()
    const keys = columns.map(col=> col.accessor);
  return  (
    <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-500 dark:bg-gray-800 ">
    {
      data.map((t,index) =>
          <tr key={`row${index}`} className={`hover:bg-gray-100 even:bg-gray-50 text-gray-700 dark:text-gray-50 dark:even:bg-gray-900 dark:hover:bg-gray-600  `} >
              {

                keys.map (
                  key => Array.isArray(t[key]) ?
                    <td key={key} className="px-3 py-2 lg:px-5   whitespace-nowrap  text-xs md:text-sm  font-medium  flex gap-1 flex-wrap items-center">
                     {
                      t[key].map((g,index)=> <span key={g+index} className="border rounded-lg px-1 py-1  text-xs dark:border-purple-300 dark:bg-purple-700">{g}</span>)
                     }
                    </td>
                    :<td className="px-3 py-2 lg:px-5   whitespace-nowrap text-xs md:text-sm ">{t[key]}</td>
                )
              }
              <td className="px-6 py-2  whitespace-nowrap text-end text-sm font-medium">
              {
                dropDown ?
                <DropDownMenu 
                  item  = {t}
                >
                    <div>
                     {profile && <Link to={`/${links.profile}/${selectedItem?.cef || selectedItem?.id}`} className="rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex gap-2 items-center text-xs p-2"><SquareArrowOutUpRight size={14}/> See More</Link>}
                      <Link to={`/${links.edit}/${selectedItem?.cef || selectedItem?.matricule || selectedItem?.id}`} className="rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex gap-2 items-center text-xs p-2"><Edit size={14}/> Edit</Link>
                      {resetPassword && <button  className="hover:bg-gray-100 dark:hover:bg-gray-700  rounded-sm flex gap-2 text-xs items-center p-2" onClick={()=>setActiveModal('reset')}><RefreshCcw size={14}  />Reset Password</button>}
                      {moreInfo && <button  className="hover:bg-gray-100 dark:hover:bg-gray-700  rounded-sm flex gap-2 text-xs items-center p-2 w-full" onClick={()=>setActiveModal('moreInfo')}><Expand size={14}  />See {name === 'teacher' ? 'Groups' : 'Teachers'}</button>}
                    </div>
                    <button onClick={()=>setActiveModal('delete')}  className="text-red-500  hover:bg-red-100 w-full flex gap-2 text-xs items-center rounded-sm p-2  mt-2"> <Trash2 size={14}/>Delete</button>
                </DropDownMenu>
                : 
                <Link to={`/${links.profile}/${t?.cef || t?.id}`} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"><SquareArrowOutUpRight size={14}/> See More</Link>


              }
                

              </td>
            </tr>
    )}
      
    </tbody>
  )
}