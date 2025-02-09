import { useState } from "react"
import ResetPasswordModal from "../LittleComponents/ResetPasswordModal"
import Alert from "../LittleComponents/Alert"
import { style , errorsMsgs} from "../Users"
import ErrorMsg from "../LittleComponents/ErrorMsg"
const names = ['password','newPassword','confirmPassword']

export default function ChangePassword ({user}) {
    const [selectedItem,setSelectedItem] = useState(user)
    const [formData,setFormData] = useState({})
     const [errors,setErrors]= useState({})

     const handleChange = (e)=>{
        const {name,value}= e.target
        setFormData(prev=> ({...prev,[name]:value}))
      
        
        
     }
     const InFocus = (e)=>{
       const {name} = e.target
        const updetedErros = {...errors}
        delete updetedErros[name]
        console.log(updetedErros);
        
        setErrors(updetedErros)
        
        
     }

     const handleError=()=>{
        const failures= {}
        names.forEach(name => {
         if (!formData[name]) failures[name] = errorsMsgs[name]
         
       });
        
     
       
        return failures
        
     }
     const handleSubmit = (e)=>{
        e.preventDefault()
        const validation = handleError()
    
        
       
        
        if (Object.keys(validation).length){
            setErrors(validation)
            return false
        }
       
        
       
        
        
        
     }
    const [activeModal,setActiveModal] = useState(null)
    return (
        <>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="flex my-2 w-full">
                     <label className={`px-3 py-2  rounded-l-md border ${style.label} ${errors.password ? style.errorBorder : style.border} basis-1/2`}>Password</label>
                     <input 
                        type="text" 
                        name="password" 
                      
                        className={`rounded-r-md px-3 border bg-gray-50 text-grey-700 border-l-0 py-2  disabled:cursor-not-allowed outline-none ${style.input} ${errors.password ? style.errorBorder : style.border} ${style.focusInput}`} 
                        placeholder="Enter current password" 
                        onChange={handleChange} 
                        onFocus={InFocus}
                     />
                  </div>
                  <ErrorMsg value={errors.password}/>
                  <div className="flex my-2 w-full">
                     <label className={`px-3 py-2  rounded-l-md border ${style.label} ${errors.newPassword ? style.errorBorder : style.border} basis-1/2`}>New Password</label>
                     <input 
                        type="text" 
                        name="newPassword" 
                     
                        className={`rounded-r-md px-3 border bg-gray-50 text-grey-700 border-l-0 py-2  disabled:cursor-not-allowed outline-none ${style.input} ${errors.newPassword ? style.errorBorder : style.border} ${style.focusInput}`} 
                        placeholder="Enter new password" 
                        onChange={handleChange} 
                        onFocus={InFocus}
                     />
                  </div>
                  <ErrorMsg value={errors.newPassword}/>
                  <div className="flex my-2 w-full">
                     <label className={`px-3 py-2  rounded-l-md border ${style.label} ${errors.confirmPassword ? style.errorBorder : style.border} basis-1/2`}>Confirm Password</label>
                     <input 
                        type="text" 
                        name="confirmPassword" 
                        defaultValue={formData.matricule} 
                        className={`rounded-r-md px-3 border bg-gray-50 text-grey-700 border-l-0 py-2  disabled:cursor-not-allowed outline-none ${style.input} ${errors.confirmPassword ? style.errorBorder : style.border} ${style.focusInput}`} 
                        placeholder="confirm new password" 
                        onChange={handleChange} 
                        onFocus={InFocus}
                     />
                  </div>
                  <ErrorMsg value={errors.confirmPassword}/>
        <div className="flex items-center gap-3 justify-end mt-5">
        <button type="button" onClick={()=>setActiveModal('admin')} className="px-3 py-2 duration-300  text-gray-700 hover:underline  dark:text-gray-50" >Reset it</button>
        <button type="submit"  className="text-blue-800 bg-blue-200 hover:bg-blue-400 dark:text-gray-50 dark:bg-blue-700 dark:hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm    px-5 py-2.5 text-center  dark:disabled:bg-gray-600 dark:disabled:border-gray-700 dark:disabled:text-gray-800 disabled:cursor-not-allowed" > Change It</button>
        </div>
       
     </form>
     {
        activeModal && <ResetPasswordModal  selectedItem={selectedItem} setSelectedItem={setSelectedItem} setActiveModal={setActiveModal} topic={'admin'}>
        <Alert msg={'Be careful if you reset your password you will log out '}/>
        </ResetPasswordModal>
     }
     </>
    )
}