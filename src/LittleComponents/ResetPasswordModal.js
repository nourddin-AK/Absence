import { OctagonAlert,} from "lucide-react"

export default function ResetPasswordModal ({selectedItem,setActiveModal,setSelectedItem,topic}){
    const handleCancel = ()=>{
        setActiveModal(null)
        setSelectedItem(null)
    }
 
    return (

<div id="popup-modal" tabindex="-1" className="mx-auto overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-gray-900 dark:bg-opacity-60  bg-opacity-80 fixed min-h-96  right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  max-h-svh h-svh">
    <div className="relative p-4 w-full max-w-xl mx-auto">
        <div className="relative bg-gray-800 rounded-lg shadow border dark:border-gray-500">
            
            <div className="p-4 md:p-5 ">
                <OctagonAlert size={40} className="mx-auto mb-4 text-gray-50  " />
                <h3 className="mb-5 text-lg font-normal text-gray-50 ">Are you sure you want to reset the password of {topic} {selectedItem?.name} ?</h3>
            </div>
            <div className="flex items-center   px-4 md:px-5 pb-4 md:pb-5">
                <button data-modal-hide="popup-modal" type="button"  className={`text-gray-50 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}>
                    Yes,reset it
                </button>
                <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium  focus:outline-none  rounded-lg text-gray-50 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 " onClick={handleCancel}>No, Keep it</button>
            </div>
        </div>
    </div>
</div>
    )
};