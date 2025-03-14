import { OctagonAlert } from "lucide-react"
import Alert from "./Alert"
import { useTableContext } from "../Context"
export default function DeleteModal({config}){
    const {selectedItem,setSelectedItem,setActiveModal} = useTableContext()
    const {target,alerted} = config
    const handleCancel = ()=>{
        setActiveModal(null)
        setSelectedItem(null)
    }
    return (
<div id="popup-modal" tabindex="-1" className="mx-auto overflow-y-auto overflow-x-hidden bg-red-50 dark:bg-red-900 dark:bg-opacity-50 bg-opacity-80 fixed min-h-96  right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  max-h-svh h-svh">
    <div className="relative p-4 w-full max-w-xl mx-auto">
        <div className="relative rounded-lg shadow border text-red-700 dark:text-red-100 border-red-500 bg-red-200 dark:bg-red-700 dark:border-red-500 ">
            
            <div className="p-4 md:p-5 ">
                <OctagonAlert size={40} className="mx-auto mb-4   " />
                <h3 className="mb-5 text-lg font-normal  ">Are you sure you want to delete the {target} {selectedItem?.name || selectedItem?.libel} ?</h3>
                {
                   alerted && <Alert  msg={`if you delete any ${target} ,all values associated with this group will be lost`} />
                }
            </div>
            <div className="flex items-center   px-4 md:px-5 pb-4 md:pb-5">
                <button data-modal-hide="popup-modal" type="button"  className={`dark:bg-red-50 dark:hover:bg-red-100 dark:text-red-700  bg-red-600 hover:bg-red-700 text-red-50 focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}>
                    Yes,delete {target}
                </button>
                <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 text-sm font-medium  focus:outline-none  rounded-lg dark:hover:text-red-200  hover:text-red-600 focus:z-10 focus:ring-4 focus:ring-gray-100 " onClick={handleCancel}>No, Keep it</button>
            </div>
        </div>
    </div>
</div>
    )
}